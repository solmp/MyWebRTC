import store from "../store/store";
import Peer from "simple-peer";
import {
    deleteParticipant,
    deleteStreamIdMetaData,
    setMessages,
    setShowOverlay,
    setStreamIdMetaData,
    setUserDeviceState
} from "../store/actions";
import * as wss from './wss';
import {peers} from "./hooks/useMeeting";

// ********** 对等连接 **********
export var localStream = {videoStream: null, screenStream: null}
export var streams = [];
export var screenStreams = [];
const getConfiguration = () => {
    return {
        iceServers: [
            {
                urls: "stun:stun2.l.google.com:19302",
            },
        ],
    };
}

export const prepareNewPeerConnection = (connPeerSocketId, isInitiator) => {
    console.log(`创建${connPeerSocketId}的音视频连接！`)
    const sendStreams = [];
    if (localStream.videoStream) sendStreams[0] = localStream.videoStream
    if (localStream.screenStream) sendStreams[1] = localStream.screenStream
    peers[connPeerSocketId] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        streams: sendStreams,
        channelName: "messageChannel",
    });
    peers[connPeerSocketId].on("signal", (data) => {
        wss.signalPeerData({signalData: data, receiver: connPeerSocketId});
    });
    peers[connPeerSocketId].on("stream", (stream) => {
        console.log(`接收到${connPeerSocketId}的音视频流！`)
        const streamIDMetaData = store.getState().streamIDMetaData;
        if (!streamIDMetaData[connPeerSocketId] ||
            !streamIDMetaData[connPeerSocketId].videoStreamId ||
            stream.id === streamIDMetaData[connPeerSocketId].videoStreamId) {
            streams[connPeerSocketId] = stream;
            store.dispatch(setStreamIdMetaData('videoStreamId', stream.id, connPeerSocketId));
        } else {
            screenStreams[connPeerSocketId] = stream;
            store.dispatch(setStreamIdMetaData('screenStreamId', stream.id, connPeerSocketId));
            screenStreams[connPeerSocketId].onremovetrack = () => {
                console.log(`删除${connPeerSocketId}的屏幕共享流！`)
                delete screenStreams[connPeerSocketId]
                store.dispatch(setStreamIdMetaData('screenStreamId', null, connPeerSocketId));
            }
        }
    });
    peers[connPeerSocketId].on("data", (data) => {
        const messageData = JSON.parse(data);
        appendNewMessage(messageData);
    });
}
export const handleSinglingData = (connPeerSocketId, signalData) => {
    peers[connPeerSocketId].signal(signalData);
}

export const removePeerConnection = (connPeerSocketId) => {
    if (peers[connPeerSocketId]) {
        peers[connPeerSocketId].destroy();
        delete peers[connPeerSocketId];
    }
    delete streams[connPeerSocketId];
    delete screenStreams[connPeerSocketId];
    store.dispatch(deleteStreamIdMetaData(connPeerSocketId));
    store.dispatch(deleteParticipant(connPeerSocketId));
}
// ********** 音视频数据 **********
const defaultConstraints = {
    audio: true,
    video: {width: '480', height: '360'},
};

export const applyDeviceStatus = ({stream, video, audio}) => {
    stream?.getVideoTracks().forEach((track) => {
        track.enabled = video;
    });
    stream?.getAudioTracks().forEach((track) => {
        track.enabled = audio;
    });
};
export const getLocalPreviewAndInitRoomConnection = (
    isRoomHost,
    identity,
    roomId = null,
    onlyWithAudio
) => {
    //初始化房间连接
    store.dispatch(setUserDeviceState({mic: false, camera: !onlyWithAudio, speaker: true}));
    // 采集本地音视频流，获得媒体输入访问权限
    navigator.mediaDevices.getUserMedia(defaultConstraints).then((stream) => {
        localStream.videoStream = stream
        console.log("获取本地媒体流成功！")
        applyDeviceStatus({stream: stream, video: !onlyWithAudio, audio: true});
        isRoomHost ? wss.createRoom(identity, onlyWithAudio) : wss.joinRoom(identity, roomId, onlyWithAudio);
        // 派发action，隐藏遮罩层
        store.dispatch(setShowOverlay(false));
    }).catch((err) => {
        console.log("无法获取本地媒体流！");
        console.log(err);
    })
}

// ********** 消息处理 **********
const appendNewMessage = (messageData) => {
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, messageData]));
}
export const sendMessageUsingDataChannel = (messageContent) => {
    const identity = store.getState().identity;
    const localMessageData = {
        content: messageContent,
        identity: identity,
        messageCreatedByMe: true,
        createdTime: new Date().toLocaleTimeString('zh-CN'),
    }
    appendNewMessage(localMessageData);
    const messageData = {
        content: messageContent,
        identity: identity,
        createdTime: new Date().toLocaleTimeString('zh-CN'),
    };
    const stringifyMessageData = JSON.stringify(messageData);
    for (let socket_id in peers) {
        peers[socket_id].send(stringifyMessageData);
    }
}

