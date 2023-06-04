import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SendMessageIcon} from "../../../../resources/icons";
import {sendDirectMessage} from "../../../../utils/wss";

const NewMessage = ({activeConversation, identity}) => {
    const [message, setMessage] = useState('');
    const handleTextChange = (event) => {
        setMessage(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };
    const sendMessage = () => {
        if (!message) {
            return;
        }
        sendDirectMessage({
            receiver: activeConversation.socketId,
            identity: identity,
            messageContent: message,
            createdTime: new Date().toLocaleTimeString('zh-CN'),
        })
        setMessage('');
    };
    return (
        <div className='new_message_container new_message_direct_border'>
            <input
                type='text'
                className='new_message_input'
                value={message}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder='请输入消息...'
            />
            <button className='new_message_button'>
                <img src={SendMessageIcon} onClick={sendMessage} alt="sendMessage"/>
            </button>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        ...state,
    };
};
export default connect(mapStateToProps)(NewMessage);
