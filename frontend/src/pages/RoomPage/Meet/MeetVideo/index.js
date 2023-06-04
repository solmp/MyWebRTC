import React, {useEffect, useRef, useState} from 'react';

import OtherVideo from './OtherVideo';
import MyVideo from './MyVideo';
import {Videos, VideoSection} from './style';
import MeetButton from "./MeetButton";
import FocusedVideo from "./FocusedVideo";
import {connect} from "react-redux";
import {useMeeting} from "../../../../utils/hooks/useMeeting";
import {applyDeviceStatus, localStream} from "../../../../utils/webRTCHandler";
import {useUserDevice} from "../../../../utils/hooks/useUserDevice";

function MeetVideo({participants, identity, socketId, streamIDMetaData}) {
    const {
        myVideoRef,
        myScreenRef,
        selectVideo,
        deselectVideo,
        selectedVideo,
        setSelectedVideo,
        screenShare,
        onScreenShareClick,
    } = useMeeting();
    const {mic, camera, speaker} = useUserDevice();
    const videoWrapperRef = useRef();
    const [videoCount, setVideoCount] = useState(0)
    useEffect(() => {
        setVideoCount(videoWrapperRef.current && videoWrapperRef.current.childElementCount)
    }, [screenShare, streamIDMetaData]);

    useEffect(() => {
        if (myVideoRef.current && localStream.videoStream) {
            myVideoRef.current.srcObject = localStream.videoStream;
        }
        if (!localStream.videoStream) return;
        applyDeviceStatus({stream: localStream.videoStream, video: camera, audio: mic});
    }, [localStream.videoStream]);
    useEffect(() => {
        if (!selectedVideo) return;
        const streamIds = streamIDMetaData[selectedVideo.socketId]
        streamIds && Object.values(streamIds).includes(selectedVideo?.stream.id) ?
            setSelectedVideo(selectedVideo) : deselectVideo();
    }, [streamIDMetaData]);
    return (
        <VideoSection>
            {selectedVideo && <FocusedVideo selectedVideo={selectedVideo} onClick={deselectVideo}/>}
            <Videos ref={videoWrapperRef} videoCount={videoCount || 0} isFocused={selectedVideo !== null}>
                <MyVideo
                    myVideoRef={myVideoRef}
                    myScreenRef={myScreenRef}
                    camera={camera}
                    mic={mic}
                    speaker={speaker}
                    screenShare={screenShare}
                    identity={identity}
                />
                {participants.filter((p) => p.socketId !== socketId).map((participant) => (
                    <OtherVideo
                        key={participant.socketId}
                        participant={participant}
                        muted={!speaker}
                        selectVideo={selectVideo}
                        selectedVideo={selectedVideo}
                    />
                ))}
            </Videos>
            <MeetButton screenShare={screenShare} onScreenShareClick={onScreenShareClick}/>
        </VideoSection>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
};
export default connect(mapStateToProps)(MeetVideo);
