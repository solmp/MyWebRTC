import React, {useEffect, useState} from 'react';
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import {connect} from 'react-redux';
import NewMessage from "./NewMessage";
import ConversationNotChosen from "./ConversationNotChosen";

const DirectChat = ({activeConversation, directChatHistory}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages(getDirectChatHistory(directChatHistory, activeConversation ? activeConversation.socketId : null));
    }, [activeConversation, directChatHistory]);
    return (
        <div className='direct_chat_container'>
            <DirectChatHeader activeConversation={activeConversation}/>
            <MessagesContainer messages={messages}/>
            <NewMessage/>
            {!activeConversation && <ConversationNotChosen/>}
        </div>
    );
};
const getDirectChatHistory = (directChatHistory, socketId = null) => {
    if (!socketId || !directChatHistory) {
        return [];
    }
    const history = directChatHistory.find((history) => history.socketId === socketId);
    return history ? history.chatHistory : [];
};

const mapStateToProps = (state) => {
    return {
        ...state,
    };
};

export default connect(mapStateToProps)(DirectChat);
