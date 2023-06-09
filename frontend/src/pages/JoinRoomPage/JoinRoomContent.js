// 初始化信息
import React, {useState} from "react";
import JoinRoomInputs from "./JoinRoomInputs";
import {connect} from "react-redux";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import {setConnectOnlyWithAudio, setIdentity, setRoomId} from "../../store/actions";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import {getRoomExists} from "../../utils/apis";
import {useNavigate} from "react-router-dom";

const JoinRoomContent = (props) => {
    const {
        isRoomHost,
        connectOnlyWithAudio, setConnectOnlyWithAudio,
        setRoomIdAction, setIdentityAction,
    } = props;
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // 加入房间
    const handleJoinRoom = async () => {
        setIdentityAction(nameValue);
        if (isRoomHost) {
            createRoom();
        } else {
            await joinRoom();
        }
    }
    const joinRoom = async () => {
        const responseMessage = await getRoomExists(roomIdValue, setErrorMessage);
        const {roomExists, full} = responseMessage;
        if (roomExists) {
            if (full) {
                setErrorMessage('会议房间人数已满，请稍后再试！');
            } else {
                setRoomIdAction(roomIdValue);
                navigate('/room');
            }
        } else {
            setErrorMessage('会议房间不存在，请验证你的ID是否正确！');
        }
    }
    const createRoom = () => {
        navigate('/room');
    }

    return (
        <>
            <JoinRoomInputs
                roomIdValue={roomIdValue}
                setRoomIdValue={setRoomIdValue}
                nameValue={nameValue}
                setNameValue={setNameValue}
                isRoomHost={isRoomHost}
            />
            <OnlyWithAudioCheckbox
                connectOnlyWithAudio={connectOnlyWithAudio}
                setConnectOnlyWithAudio={setConnectOnlyWithAudio}
            />
            <ErrorMessage errorMessage={errorMessage}/>
            <JoinRoomButtons
                isRoomHost={isRoomHost}
                handleJoinRoom={handleJoinRoom}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (connectOnlyWithAudio) => dispatch(setConnectOnlyWithAudio(connectOnlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
    }
}

export default connect(mapStateToProps, mapActionsToProps)(JoinRoomContent);