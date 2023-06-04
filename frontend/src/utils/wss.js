// websockets
import io from "socket.io-client";
import store from "../store/store";
import {
    addNewParticipant,
    setParticipants,
    setRoomId,
    setSocketId,
    updateParticipantDeviceState
} from "../store/actions";
import {handleSinglingData, prepareNewPeerConnection, removePeerConnection,} from "./webRTCHandler"
import {appendNewMessageToDirectChatHistory} from "./directMessages";

let socket = null;
const connectWithSocketIOServer = () => {
    // socket = io("https://api.xxx");
    socket = io("http://localhost:3333");
    socket.on("connect", () => {
        console.log(`成功连接到服务器: ${socket.id}`);
        store.dispatch(setSocketId(socket.id));
    });
    socket.on("RoomCreated", (data) => {
        store.dispatch(setRoomId(data.roomId));
    });
    socket.on("NewUserJoined", (data) => {
        const {newUser, username, connectedUsers} = data;
        store.dispatch(newUser ? addNewParticipant(newUser) : setParticipants(connectedUsers));
        console.log(`新用户加入: ${username}`);
    });
    socket.on("ConnectPrepare", (data) => {
        // console.log(`${socket.id} ConnectPrepared: ${JSON.stringify(data)}`);
        prepareNewPeerConnection(data.sender, false);
        socket.emit("ConnectInit", {receiver: data.sender});
    });
    socket.on("ConnectInit", (data) => {
        // console.log(`${socket.id} ConnectInited: ${JSON.stringify(data)}`);
        prepareNewPeerConnection(data.sender, true);
    });
    socket.on("ConnectSignal", (data) => {
        const {sender, signalData} = data;
        // console.log(`${socket.id} Receive ConnectSignal from ${sender}, type: ${signalData.type}`);
        handleSinglingData(sender, signalData);
    });
    socket.on("UserLeft", (data) => {
        const {username, connPeerSocketId} = data;
        removePeerConnection(connPeerSocketId);
        console.log(`【${username}】离开房间`);
    });
    socket.on("DirectMessage", (data) => {
        // A->Server->B, A->Server->A
        appendNewMessageToDirectChatHistory(data);
    });
    socket.on("DeviceStateChanged", (data) => {
        const {sender, deviceState} = data;
        store.dispatch(updateParticipantDeviceState(sender, deviceState));
        console.log(`${sender} DeviceStateChanged`);
    });
    return socket;
}

const createRoom = (identity, onlyWithAudio) => {
    const data = {
        identity,
        onlyWithAudio
    }
    socket.emit("CreateRoom", data);
}

const joinRoom = (identity, roomId, onlyWithAudio) => {
    const data = {
        identity,
        roomId,
        onlyWithAudio
    }
    socket.emit("JoinRoom", data);
}

const signalPeerData = (data) => {
    socket.emit("ConnectSignal", data);
}
const sendDirectMessage = (data) => {
    socket.emit("DirectMessage", data);
}
const sendDeviceStateChanged = (data) => {
    socket.emit("ToggleDevice", data);
}

export {
    connectWithSocketIOServer,
    createRoom,
    joinRoom,
    signalPeerData,
    sendDirectMessage,
    sendDeviceStateChanged
}