import React from 'react';

import {MicOffIconGray, SpeakerOffIconGray} from '../../../../../resources/icons';
import {DeviceStatus, Video, VideoWrapper} from '../style';

function MyVideo({myVideoRef, myScreenRef, camera, mic, speaker, screenShare, identity}) {
    return (
        <>
            <VideoWrapper>
                <Video autoPlay playsInline muted ref={myVideoRef} className={camera ? 'user-video' : ''}/>
                <p>{`${identity}`}</p>
                <DeviceStatus>
                    {mic || <img src={MicOffIconGray} alt="mic" style={{marginRight: '5px'}}/>}
                    {speaker || <img src={SpeakerOffIconGray} alt="speaker" style={{marginRight: '5px'}}/>}
                </DeviceStatus>
            </VideoWrapper>
            {screenShare && (
                <VideoWrapper>
                    <Video autoPlay playsInline muted ref={myScreenRef}/>
                    <p>{`${identity} 您的屏幕`}</p>
                </VideoWrapper>
            )}
        </>
    );
}

export default MyVideo;
