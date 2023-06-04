// 聊天室
import React from 'react';
import ChatLabel from '../ChatSection/ChatLabel';
import Messages from '../ChatSection/Messages';
import NewMessage from '../ChatSection/NewMessage';

const ChatSection = () => {
    return (
        <div className='chat_section_container'>
            <ChatLabel/>
            <Messages/>
            <NewMessage/>
        </div>
    );
};

export default ChatSection;
