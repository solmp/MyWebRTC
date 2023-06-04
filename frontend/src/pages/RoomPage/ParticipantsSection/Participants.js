// 会议参与者
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setActiveConversation} from "../../../store/actions";

export var newMessageSenders = {}
const SingleParticipant = (props) => {
    const {identity, lastItem, participant, setActiveConversationAction, socketId} = props;
    const [hasNewMessage, setHasNewMessage] = useState(false)
    const handleOpenActiveConversation = () => {
        if (participant.socketId !== socketId) {
            setActiveConversationAction(participant);
            setHasNewMessage(false);
            newMessageSenders[participant.socketId] = false
        } else {
            setActiveConversationAction(null);
        }
    };

    useEffect(() => {
        if (participant.socketId === socketId) return;
        const interval = setInterval(() => {
            if (newMessageSenders[participant.socketId]) setHasNewMessage(true);
            // console.log(newMessageSenders)
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            <div className="participants_paragraph" onClick={handleOpenActiveConversation}>
                <span>{participant.socketId === socketId ? identity + " (我)" : identity}</span>
                <div style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '100%',
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    display: hasNewMessage ? 'block' : 'none'
                }}/>
            </div>
        </>
    );
}
const Participants = ({participants, setActiveConversationAction, socketId}) => {
    return (
        <div className="participants_container">
            {participants.map((participant, index) => {
                return (
                    <SingleParticipant
                        identity={participant.identity}
                        lastItem={index === participants.length - 1}
                        participant={participant}
                        key={participant.id}
                        setActiveConversationAction={setActiveConversationAction}
                        socketId={socketId}
                    />
                );
            })}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        ...state
    };
}

const mapActionToProps = (dispatch) => {
    return {
        setActiveConversationAction: (activeConversation) => dispatch(setActiveConversation(activeConversation)),
    };
}

export default connect(mapStateToProps, mapActionToProps)(Participants);