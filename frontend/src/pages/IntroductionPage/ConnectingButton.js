// 按钮组件，用于加入或创建房间
import React from 'react';

const ConnectingButton = ({createRoomButton = false, buttonText, onClickHandler,}) => {
    const buttonClass = createRoomButton ? 'create_room_button' : 'join_room_button';
    return (
        <button className={buttonClass} onClick={onClickHandler}>
            {buttonText}
        </button>
    );
};

export default ConnectingButton;
