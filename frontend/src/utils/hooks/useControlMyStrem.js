import {useEffect} from 'react';
import {applyDeviceStatus} from "../webRTCHandler";
import {useUserDevice} from "./useUserDevice";


export const useControlMyStream = (videoStream) => {
    const {mic, camera} = useUserDevice();
    useEffect(() => {
        if (videoStream)
            applyDeviceStatus({stream: videoStream, video: camera, audio: mic});
    }, [mic, camera]);
};
