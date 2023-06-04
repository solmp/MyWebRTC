import React from 'react';

import {
    CameraOffIcon,
    CameraOnIcon,
    LeaveRoomIcon,
    MicOffIcon,
    MicOnIcon,
    ShareWindowOffIcon,
    ShareWindowOnIcon,
    SpeakerOffIcon,
    SpeakerOnIcon,
} from "../../../../../resources/icons";

import {DarkRedButton, GrayButton, MeetButtonWrapper} from './style';
import {useUserDevice} from "../../../../../utils/hooks/useUserDevice";
import store from "../../../../../store/store";
import {setUserDeviceState} from "../../../../../store/actions";
import {sendDeviceStateChanged} from "../../../../../utils/wss";

function MeetButton({onScreenShareClick, screenShare}) {
    const device = useUserDevice();
    const {mic, speaker, camera} = device;
    const onMeetingStopClick = () => {
        window.location.href = window.location.origin;
    };
    const onToggleDevice = (target: 'mic' | 'speaker' | 'camera') => {
        const newDeviceState = {...device, [target]: !device[target]};
        store.dispatch(setUserDeviceState(newDeviceState));
        sendDeviceStateChanged(newDeviceState);
    };
    return (
        <MeetButtonWrapper>
            <GrayButton onClick={() => onToggleDevice('mic')}>
                <img src={mic ? MicOnIcon : MicOffIcon} alt="Mic"/>
            </GrayButton>
            <GrayButton onClick={() => onToggleDevice('speaker')}>
                <img src={speaker ? SpeakerOnIcon : SpeakerOffIcon} alt="Speaker"/>
            </GrayButton>
            <GrayButton onClick={() => onToggleDevice('camera')}>
                <img src={camera ? CameraOnIcon : CameraOffIcon} alt="Camera"/>
            </GrayButton>
            <GrayButton onClick={onScreenShareClick}>
                <img src={screenShare ? ShareWindowOnIcon : ShareWindowOffIcon} alt="ScreenShare"/>
            </GrayButton>
            <DarkRedButton onClick={onMeetingStopClick}>
                <img src={LeaveRoomIcon} alt="MeetingStop"/>
            </DarkRedButton>
        </MeetButtonWrapper>
    );
}

export default MeetButton;
