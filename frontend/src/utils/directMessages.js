import store from '../store/store';
import {setDirectChatHistory} from '../store/actions';
import {newMessageSenders} from "../pages/RoomPage/ParticipantsSection/Participants";

export const appendNewMessageToDirectChatHistory = (data) => {
    const {sender, receiver, messageContent, identity, isAuthor, createdTime} = data;
    const chatHistory = [...store.getState().directChatHistory];
    const userSocketId = isAuthor ? receiver : sender;
    const userChatHistory = chatHistory.find((history) => history.socketId === userSocketId);
    const newDirectMessage = {
        isAuthor: isAuthor,
        messageContent: messageContent,
        identity: identity,
        createdTime: createdTime,
    };
    if (userChatHistory) {
        const newUserChatHistory = {
            socketId: userChatHistory.socketId,
            chatHistory: [...userChatHistory.chatHistory, newDirectMessage],
        };
        const newChatHistory = [
            ...chatHistory.filter((history) => history.socketId !== userSocketId),
            newUserChatHistory,
        ];
        store.dispatch(setDirectChatHistory(newChatHistory));
    } else {
        const newUserChatHistory = {
            socketId: userSocketId,
            chatHistory: [newDirectMessage]
        };
        const newChatHistory = [...chatHistory, newUserChatHistory];
        store.dispatch(setDirectChatHistory(newChatHistory));
    }

    if (sender && store.getState().activeConversation?.socketId !== sender) {
        newMessageSenders[sender] = true
    }
};
