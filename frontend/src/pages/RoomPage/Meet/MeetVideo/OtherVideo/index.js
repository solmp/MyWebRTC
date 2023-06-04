import React, {useEffect, useRef} from 'react';

import {CameraOnIcon, MicOffIconGray, SpeakerOffIconGray} from '../../../../../resources/icons';
import {DeviceStatus, SelectVideoIndicator, Video, VideoWrapper,} from '../style';
import {screenStreams, streams} from "../../../../../utils/webRTCHandler";

const OtherVideo = ({participant, muted, selectVideo, selectedVideo}) => {
    const {id, identity, socketId, deviceState} = participant;
    const {camera, speaker, mic} = deviceState;
    const camRef = useRef();
    const screenRef = useRef();
    const stream = streams[socketId];
    const screen = screenStreams[socketId];
    const videoInfo = {
        id,
        socketId,
        identity,
        stream,
        mic,
        camera,
        speaker,
    };
    useEffect(() => {
        if (!camRef.current || !stream) return;
        camRef.current.srcObject = stream;
    }, [stream]);

    useEffect(() => {
        if (!screenRef.current || !screen) return;
        screenRef.current.srcObject = screen;
    }, [screen]);

    return (
        <>
            <VideoWrapper
                onClick={selectVideo({
                    ...videoInfo,
                    stream: stream,
                    isScreen: false,
                })}
            >
                <Video
                    muted={muted}
                    autoPlay
                    playsInline
                    ref={camRef}
                    className={videoInfo.camera ? 'user-video' : ''}
                />
                <p>{`${identity}`}</p>
                <DeviceStatus>
                    {mic || <img src={MicOffIconGray} alt="mic" style={{marginRight: '5px'}}/>}
                    {speaker || <img src={SpeakerOffIconGray} alt="speaker" style={{marginRight: '5px'}}/>}
                </DeviceStatus>
                {stream && selectedVideo?.stream?.id === stream?.id && (
                    <SelectVideoIndicator>
                        <img src={CameraOnIcon} style={{width: '50px'}} alt="camera"/>
                    </SelectVideoIndicator>
                )}
            </VideoWrapper>
            {screen && (
                <VideoWrapper
                    onClick={selectVideo({
                        ...videoInfo,
                        stream: screen,
                        isScreen: true,
                    })}
                >
                    <Video key={socketId} muted={muted} autoPlay playsInline ref={screenRef}/>
                    <p>{`${identity} 共享屏幕`}</p>
                    {screen && selectedVideo?.stream?.id === screen?.id && (
                        <SelectVideoIndicator>
                            <img src={CameraOnIcon} style={{width: '50px'}} alt="camera"/>
                        </SelectVideoIndicator>
                    )}
                </VideoWrapper>
            )}
        </>
    );
}

export default OtherVideo;
