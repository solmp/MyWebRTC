// client.js
const io = require('socket.io-client');
const socket = io('http://localhost:3000');
var Peer = require('simple-peer')
const wrtc = require('wrtc');

const getConfiguration = () => {
    return {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302",
            },
        ],
    };
}

const peers = []

socket.on('connect', () => {
    console.log('connected to signaling server');
});
socket.on("ConnectPrepare", (data) => {
    // console.log(`${Date()}, ${socket.id} ConnectPrepared: ${JSON.stringify(data)}`);
    const {sender} = data;
    prepareNewPeerConnection(sender, false);
    socket.emit("ConnectInit", {receiver: sender});
});
socket.on("ConnectInit", (data) => {
    // console.log(`${Date()}, ${socket.id} ConnectInited: ${JSON.stringify(data)}`);
    const {sender} = data;
    prepareNewPeerConnection(sender, true);
});
socket.on("ConnectSignal", (data) => {
    // console.log(`${Date()}, ${socket.id} Receive ConnectSignal from ${data.sender}, type: ${data.signalData.type}`);
    peers[data.sender].signal(data.signalData);
});
socket.on("disconnect", () => {
    console.log('disconnected from signaling server');
});

const prepareNewPeerConnection = (sender, isInitiator) => {
    peers[sender] = new Peer({
        initiator: isInitiator,
        config: getConfiguration(),
        channelName: "my-peer-channel",
        wrtc: wrtc, // 指定 wrtc 包来提供 WebRTC 实现
    });
    peers[sender].on("signal", (data) => {
        socket.emit("ConnectSignal", {signalData: data, receiver: sender});
    });
    peers[sender].on("data", (data) => {
        console.log(`${Date()}, ${socket.id} Receive data from ${sender}: ${data}`);
    });
}

// ********************** Test **********************
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
    console.log(`Received: ${input}`);
    if(input === 'n'){
        rl.close();
        console.log("r1 closed")
    }else if(input === 'y'){
        socket.emit("ConnectPrepare", {roomId: "room1"});
    }else {
        for (let key in peers) {
            peers[key].send(input);
        }
    }
});