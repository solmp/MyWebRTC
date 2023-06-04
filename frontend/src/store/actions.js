const Actions = {
    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_CONNECT_ONLY_WITH_AUDIO: 'SET_CONNECT_ONLY_WITH_AUDIO',
    SET_ROOM_ID: 'SET_ROOM_ID',
    SET_IDENTITY: 'SET_IDENTITY',
    SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
    SET_PARTICIPANTS: 'SET_PARTICIPANTS',
    SET_MESSAGES: 'SET_MESSAGES',
    SET_ACTIVE_CONVERSATION: 'SET_ACTIVE_CONVERSATION',
    SET_DIRECT_CHAT_HISTORY: 'SET_DIRECT_CHAT_HISTORY',
    SET_SOCKET_ID: 'SET_SOCKET_ID',
    SET_USER_DEVICE_STATE: 'SET_USER_DEVICE_STATE',
    UPDATE_PARTICIPANT_DEVICE_STATE: 'UPDATE_PARTICIPANT_DEVICE_STATE',
    ADD_NEW_PARTICIPANT: 'ADD_NEW_PARTICIPANT',
    DELETE_PARTICIPANT: 'DELETE_PARTICIPANT',
    SET_STREAM_ID_META_DATA: 'SET_STREAM_ID_META_DATA',
    DELETE_STREAM_ID_META_DATA: 'DELETE_STREAM_ID_META_DATA',
}

export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost,
    };
}
export const setConnectOnlyWithAudio = (connectOnlyWithAudio) => {
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
        connectOnlyWithAudio,
    };
}
export const setRoomId = (roomId) => {
    return {
        type: Actions.SET_ROOM_ID,
        roomId,
    };
}
export const setIdentity = (identity) => {
    return {
        type: Actions.SET_IDENTITY,
        identity,
    };
}
export const setShowOverlay = (showOverlay) => {
    return {
        type: Actions.SET_SHOW_OVERLAY,
        showOverlay,
    };
}
export const setParticipants = (participants) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        participants,
    };
}
export const setMessages = (messages) => {
    return {
        type: Actions.SET_MESSAGES,
        messages,
    };
}
export const setActiveConversation = (activeConversation) => {
    return {
        type: Actions.SET_ACTIVE_CONVERSATION,
        activeConversation,
    };
}
export const setDirectChatHistory = (directChatHistory) => {
    return {
        type: Actions.SET_DIRECT_CHAT_HISTORY,
        directChatHistory,
    };
}
export const setSocketId = (socketId) => {
    return {
        type: Actions.SET_SOCKET_ID,
        socketId,
    };
}
export const setUserDeviceState = (userDeviceState) => {
    return {
        type: Actions.SET_USER_DEVICE_STATE,
        userDeviceState,
    };
}

export const updateParticipantDeviceState = (socketId, deviceState) => ({
    type: Actions.UPDATE_PARTICIPANT_DEVICE_STATE,
    payload: {socketId, deviceState},
});
export const addNewParticipant = (participant) => ({
    type: Actions.ADD_NEW_PARTICIPANT,
    participant: participant,
});

export const deleteParticipant = (socketId) => ({
    type: Actions.DELETE_PARTICIPANT,
    socketId: socketId,
});
export const setStreamIdMetaData = (streamType, streamId, socketId) => ({
    type: Actions.SET_STREAM_ID_META_DATA,
    streamType,
    streamId,
    socketId,
});
export const deleteStreamIdMetaData = (socketId) => ({
    type: Actions.DELETE_STREAM_ID_META_DATA,
    socketId,
});
export default Actions;