// 房间ID标签
import React from 'react';
import {CopyRoomIdIcon} from "../../resources/icons";

const RoomLabel = ({roomId}) => {
    return (
        <div className="room_label">
            <div className="room_label_paragraph">
                <span>房间ID：</span>
                <span id="room_id">{roomId}</span>
                <button className="room_id_copy_button" onClick={copyFn}>
                    <img src={CopyRoomIdIcon} alt="点击复制"/>
                </button>
                <div id="copy-success" style={{display: 'none'}}>复制成功！</div>
            </div>
        </div>
    );
}

function copyFn() {
    const roomId = document.getElementById('room_id').innerText;
    const copySuccess = document.querySelector('#copy-success');
    navigator.clipboard.writeText(roomId).then(() => {
        copySuccess.style.display = 'block';
        setTimeout(function () {
            copySuccess.style.display = 'none';
        }, 1000);
    })
}

export default RoomLabel;