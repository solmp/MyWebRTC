// 会议房间
import React, {useEffect} from "react";
import "./Roompage.css";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import ChatSection from "./ChatSection/ChatSection";
import RoomLabel from "./RoomLabel";
import {connect} from "react-redux";
import * as webRTCHandler from "../../utils/webRTCHandler";
import Overlay from "./Overlay";
import Meet from "./Meet";

const RoomPage = ({isRoomHost, identity, roomId, showOverlay, connectOnlyWithAudio}) => {
    useEffect(() => {
        if (!isRoomHost && !roomId) {
            window.location.href = '/';
            return;
        }
        webRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId, connectOnlyWithAudio);
    }, []);
    return (
        <div className="room_container">
            <ParticipantsSection/>
            <Meet/>
            <ChatSection/>
            <RoomLabel roomId={roomId}/>
            {showOverlay && <Overlay/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(RoomPage);