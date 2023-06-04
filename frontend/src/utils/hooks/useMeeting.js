import {useRef} from 'react';
import {useControlMyStream} from "./useControlMyStrem";
import {useSelectVideo} from "./useSelectVideo";
import {useScreenShare} from "./useScreenShare";
import {localStream} from "../webRTCHandler";

export let peers = {};
export const useMeeting = () => {
    const myVideoRef = useRef();
    useControlMyStream(localStream.videoStream)
    const {selectVideo, deselectVideo, selectedVideo, setSelectedVideo} = useSelectVideo()
    const {screenShare, myScreenRef, myScreenStreamRef, onScreenShareClick} = useScreenShare(peers);
    return {
        myVideoRef,
        myScreenRef,
        selectVideo,
        deselectVideo,
        selectedVideo,
        setSelectedVideo,
        screenShare,
        onScreenShareClick,
    }
}