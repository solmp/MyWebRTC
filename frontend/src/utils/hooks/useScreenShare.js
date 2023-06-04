import {useCallback, useEffect, useRef, useState} from 'react';
import {localStream} from "../webRTCHandler";

export const useScreenShare = (peerConnections) => {
    const [screenShare, setScreenShare] = useState(false);
    const myScreenRef = useRef(null);
    const myScreenStreamRef = useRef();
    const getMyScreen = useCallback(async () => {
        try {
            const myScreen = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
                video: true,
            });
            if (myScreenRef.current && myScreen) {
                myScreenRef.current.srcObject = myScreen;
                myScreen.getTracks().forEach((track) => {
                    track.onended = () => {
                        setScreenShare(false);
                    };
                });
                Object.values(peerConnections).forEach((pc) => pc.addStream(myScreen));
                localStream.screenStream = myScreen
                myScreenStreamRef.current = myScreen;
            }
        } catch (e) {
            console.error(e);
            setScreenShare(false);
        }
    }, []);

    const onScreenShareClick = useCallback(() =>
        setScreenShare((screenShare) => {
            if (screenShare) {
                const tracks = myScreenStreamRef.current?.getTracks();
                tracks?.forEach((track) => track.stop());
                return false;
            } else {
                return true;
            }
        }), []);

    useEffect(() => {
        if (screenShare) getMyScreen();
        else {
            try {
                if (myScreenStreamRef.current) {
                    Object.values(peerConnections).forEach((peerConnection) => {
                        peerConnection.removeStream(myScreenStreamRef.current)
                    });
                }
                localStream.screenStream = null
                myScreenStreamRef.current = undefined;
            } catch (e) {
                console.error(e);
            }
        }
    }, [screenShare, getMyScreen]);
    return {screenShare, setScreenShare, myScreenRef, myScreenStreamRef, onScreenShareClick};
};
