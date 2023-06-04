import React, {useEffect, useRef} from 'react';

import {MicOffIconGray, SpeakerOffIconGray} from '../../../../../resources/icons';
import {DeviceStatus, UserInfo, Video, VideoWrapper} from './style';

function FocusedVideo({selectedVideo: {identity, stream, mic, speaker, isScreen}, onClick,}) {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

    return (
        <VideoWrapper onClick={onClick}>
            <Video autoPlay playsInline ref={videoRef}/>
            <UserInfo>{`${identity}${isScreen ? ' 聚焦屏幕' : ''}`}</UserInfo>
            {isScreen || (
                <>
                    <DeviceStatus>
                        {mic || <img src={MicOffIconGray} alt="mic" style={{marginRight: '5px'}}/>}
                        {speaker || <img src={SpeakerOffIconGray} alt="speaker" style={{marginRight: '5px'}}/>}
                    </DeviceStatus>
                </>
            )}
        </VideoWrapper>
    );
}

export default FocusedVideo;
