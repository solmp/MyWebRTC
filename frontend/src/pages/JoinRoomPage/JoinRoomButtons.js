// 加入/创建房间、返回按钮
import React from "react";
import {useNavigate} from "react-router-dom";

const Button = ({buttonText, cancelButton = false, onClickHandler}) => {
    const buttonClass = cancelButton ? "join_room_cancel_button" : "join_room_success_button";
    return (
        <button className={buttonClass} onClick={onClickHandler}>{buttonText}</button>
    );
}
const JoinRoomButtons = ({handleJoinRoom, isRoomHost}) => {
    const successButtonText = isRoomHost ? "创建房间" : "加入房间";
    const navigate = useNavigate();
    const pushToIntroductionPage = () => {
        navigate("/");
    }
    return (
        <div className="join_room_buttons_container">
            <Button buttonText={successButtonText} onClickHandler={handleJoinRoom}/>
            <Button buttonText="返回" onClickHandler={pushToIntroductionPage} cancelButton/>
        </div>
    );
}

export default JoinRoomButtons;