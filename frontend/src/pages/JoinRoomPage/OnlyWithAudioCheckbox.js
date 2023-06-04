// 仅开启音频选择框
import React from "react";
import CheckImg from "../../resources/images/check.png";

const OnlyWithAudioCheckbox = ({setConnectOnlyWithAudio, connectOnlyWithAudio}) => {
    const handleConnectionTypeChange = () => {
        // 将链接状态存储到store中
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    }
    return (
        <div className="checkbox_container">
            <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
                {connectOnlyWithAudio && <img className="checkbox_img" src={CheckImg} alt={CheckImg}/>}
            </div>
            <p className="checkbox_container_paragraph">仅开启音频</p>
        </div>
    );
}

export default OnlyWithAudioCheckbox;
