import Actions from "./actions";

const initState = {
    isRoomHost: false,
    connectOnlyWithAudio: false,
    roomId: null,
    identity: '',
    showOverlay: true,
    participants: [],
    messages: [],
    activeConversation: null,
    directChatHistory: [],
    socketId: null,
    userDeviceState: {
        mic: false,
        speaker: true,
        camera: true,
    },
    streamIDMetaData: {},
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case Actions.SET_IS_ROOM_HOST:
            return {
                ...state,
                isRoomHost: action.isRoomHost,
            }
        case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.connectOnlyWithAudio,
            }
        case Actions.SET_ROOM_ID:
            return {
                ...state,
                roomId: action.roomId,
            }
        case Actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity,
            }
        case Actions.SET_SHOW_OVERLAY:
            return {
                ...state,
                showOverlay: action.showOverlay,
            }
        case Actions.SET_PARTICIPANTS:
            return {
                ...state,
                participants: action.participants,
            }
        case Actions.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            }
        case Actions.SET_ACTIVE_CONVERSATION:
            return {
                ...state,
                activeConversation: action.activeConversation,
            }
        case Actions.SET_DIRECT_CHAT_HISTORY:
            return {
                ...state,
                directChatHistory: action.directChatHistory,
            }
        case Actions.SET_SOCKET_ID:
            return {
                ...state,
                socketId: action.socketId,
            }
        case Actions.SET_USER_DEVICE_STATE:
            return {
                ...state,
                userDeviceState: action.userDeviceState,
            }
        case Actions.UPDATE_PARTICIPANT_DEVICE_STATE:
            return {
                ...state,
                participants: state.participants.map((participant) => participant.socketId === action.payload.socketId ?
                    {...participant, deviceState: action.payload.deviceState} : participant)
            };
        case Actions.ADD_NEW_PARTICIPANT:
            return {
                ...state,
                participants: [...state.participants, action.participant],
            }
        case Actions.DELETE_PARTICIPANT:
            return {
                ...state,
                participants: state.participants.filter((participant) => participant.socketId !== action.socketId),
            }
        case Actions.SET_STREAM_ID_META_DATA:
            let item;
            if (!state.streamIDMetaData[action.socketId]) {
                item = {videoStreamId: action.streamId, screenStreamId: null}
            } else {
                item = {...state.streamIDMetaData[action.socketId], [action.streamType]: action.streamId}
            }
            return {
                ...state,
                streamIDMetaData: {...state.streamIDMetaData, [action.socketId]: item},
            }
        case Actions.DELETE_STREAM_ID_META_DATA:
            return {
                ...state,
                streamIDMetaData: {...state.streamIDMetaData, [action.socketId]: undefined},
            }
        default:
            return state;
    }
}

export default reducer;
