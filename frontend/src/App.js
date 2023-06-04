import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import IntroductionPage from "./pages/IntroductionPage/IntroductionPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";
import {connectWithSocketIOServer} from "./utils/wss";

function App() {
    useEffect(() => {
        connectWithSocketIOServer()
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IntroductionPage/>}/>
                <Route path="/room" element={<RoomPage/>}/>
                <Route path="/join-room" element={<JoinRoomPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
