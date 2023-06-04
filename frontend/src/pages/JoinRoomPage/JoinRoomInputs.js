// 输入框
import React from "react";

const Input = ({placeholder, value, changeHandler}) => {
    return (
        <input
            className="join_room_input"
            placeholder={placeholder}
            value={value}
            onChange={changeHandler}
        />
    );
}
const JoinRoomInputs = (props) => {
    const {roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost} = props;

    const handleRoomIdValueChange = (event) => {
        setRoomIdValue(event.target.value);
    }
    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }
    return (
        <div className="join_room_inputs_container">
            {!isRoomHost && <Input
                placeholder={'请输入会议ID号...'}
                value={roomIdValue}
                changeHandler={handleRoomIdValueChange}
            />}
            <Input
                placeholder={'请输入你的姓名...'}
                value={nameValue}
                changeHandler={handleNameValueChange}
            />
        </div>
    );
}

export default JoinRoomInputs;