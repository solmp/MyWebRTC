import React, {useState} from 'react';
import {SendMessageIcon} from '../../../resources/icons';
import {sendMessageUsingDataChannel} from '../../../utils/webRTCHandler';

const NewMessage = () => {
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
        sendMessageUsingDataChannel(message);
        setMessage('');
    };
    return (
        <div className='new_message_container'>
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

export default NewMessage;
