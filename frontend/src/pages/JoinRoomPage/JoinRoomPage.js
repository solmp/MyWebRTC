// 加入房间
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {setIsRoomHost} from "../../store/actions";
import {connect} from "react-redux";
import JoinRoomTitle from "./JoinRoomTitle";
import "./JoinRoomPage.css";
import JoinRoomContent from "./JoinRoomContent";

const JoinRoomPage = (props) => {
    const {setIsRoomHostAction, isRoomHost} = props;

    const search = useLocation().search;
    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host");
        if (isRoomHost) {
            setIsRoomHostAction(isRoomHost);
        }
    }, []);
    return (
        <div className={"join_room_page_container"}>
            <div className={"join_room_page_panel"}>
                <JoinRoomTitle isRoomHost={isRoomHost}/>
                <JoinRoomContent/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}
export default connect(mapStateToProps, mapActionsToProps)(JoinRoomPage);