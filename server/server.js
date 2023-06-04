const {createServer} = require("http");
const {Server} = require("socket.io");
const express = require('express')
const cors = require('cors')
const crypto = require('crypto');

const PORT = process.env.PORT || 3333;
const app = express().use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let connectedUsers = [];
let rooms = [];

app.get("/api/room-exists/:roomId", (req, res) => {
    const {roomId} = req.params;
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
        return res.send({roomExists: true, full: room.connectedUsers.length >= 4});
    } else {
        return res.send({roomExists: false});
    }
});
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("CreateRoom", (data) => {
        createRoomHandler(data.identity, data.onlyWithAudio, socket);
    });
    socket.on("JoinRoom", (data) => {
        // ConnectPrepare: ClientB -> Server -> ClientA
        console.log(`ConnectPrepare from ${socket.id} to other: ${JSON.stringify(data)}`);
        joinRoomHandler(data.identity, data.roomId, data.onlyWithAudio, socket);
    });
    socket.on("ConnectInit", (data) => {
        // ConnectInit: ClientA -> Server -> ClientB
        console.log(`ConnectInit from ${socket.id} to ${data.receiver}: ${JSON.stringify(data)}`);
        connectInitHandler(data.receiver, socket);
    });
    socket.on("ConnectSignal", (data) => {
        // ConnectSignal: ClientA <-> Server <-> ClientB
        console.log(`ConnectSignal from ${socket.id} to ${data.receiver}, type: ${data.signalData.type}`);
        signalingHandler(data.receiver, data.signalData, socket);
    });
    socket.on("DirectMessage", (data) => {
        // DirectMessage: // ClientA->Server->ClientB + ClientA->Server->ClientA
        directMessageHandler(data.receiver, data.identity, data.messageContent, data.createdTime, socket);
    });
    socket.on("ToggleDevice", (data) => {
        toggleDeviceHandler(data, socket);
    })
    socket.on("disconnect", () => {
        disconnectHandler(socket);
    });
});

const createRoomHandler = (identity, onlyWithAudio, socket) => {
    console.log("正在创建房间...")
    const roomId = crypto.randomUUID();
    const newUser = {
        id: crypto.randomUUID(),
        identity,
        roomId,
        socketId: socket.id,
        deviceState: {camera: !onlyWithAudio, speaker: true, mic: false},
        onlyWithAudio
    }
    connectedUsers.push(newUser);
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser],
    };
    rooms.push(newRoom);
    socket.join(roomId);
    socket.emit("RoomCreated", {roomId});
    socket.emit("NewUserJoined", {connectedUsers: newRoom.connectedUsers, username: identity})
    console.log(`房间【${roomId}】创建成功，创建者: ${identity}`);
}
const joinRoomHandler = (identity, roomId, onlyWithAudio, socket) => {
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
        const newUser = {
            id: crypto.randomUUID(),
            identity,
            roomId,
            socketId: socket.id,
            deviceState: {camera: !onlyWithAudio, speaker: true, mic: false},
            onlyWithAudio
        }
        connectedUsers.push(newUser);
        socket.join(roomId);
        room.connectedUsers.push(newUser);
        // 开始建立WebRTC对等连接
        socket.broadcast.to(roomId).emit("ConnectPrepare", {sender: socket.id});
        socket.broadcast.to(roomId).emit("NewUserJoined", {newUser: newUser, username: identity})
        socket.emit("NewUserJoined", {connectedUsers: room.connectedUsers, username: identity})
        console.log(`用户【${identity}】加入房间 ${roomId}`);
    } else {
        console.log(`此房间不存在: ${roomId}`);
    }
}
const connectInitHandler = (receiver, socket) => {
    const data = {
        sender: socket.id
    }
    io.to(receiver).emit("ConnectInit", data);
}
const signalingHandler = (receiver, signalData, socket) => {
    const data = {
        sender: socket.id,
        signalData
    }
    io.to(receiver).emit("ConnectSignal", data);
}
const directMessageHandler = (receiver, identity, messageContent, createdTime, socket) => {
    if (connectedUsers.find((user) => user.socketId === receiver)) {
        // 发送消息到指定用户
        const receiverData = {
            sender: socket.id,
            identity,
            messageContent,
            isAuthor: false,
            createdTime: createdTime
        }
        io.to(receiver).emit("DirectMessage", receiverData);
        // 发送消息到自己
        const authorData = {
            receiver: receiver,
            identity,
            messageContent,
            isAuthor: true,
            createdTime: createdTime
        }
        socket.emit("DirectMessage", authorData);
    }
}
const toggleDeviceHandler = (newDeviceState, socket) => {
    let room = null;
    connectedUsers.forEach((user) => {
        if (user.socketId === socket.id) {
            user.deviceState = newDeviceState;
            room = rooms.find((room) => room.id === user.roomId);
            console.log(`${room.id}: 用户【${user.identity}】切换设备状态: ${JSON.stringify(newDeviceState)}`);
        }
    })
    if (room) {
        room.connectedUsers?.forEach((user) => {
            if (user.socketId === socket.id) {
                user.deviceState = newDeviceState;
            }
        })
        io.to(room.id).emit("DeviceStateChanged", {
            sender: socket.id,
            deviceState: newDeviceState
        })
    }
}
const disconnectHandler = (socket) => {
    const user = connectedUsers.find((user) => user.socketId === socket.id);
    if (user) {
        const room = rooms.find((room) => room.id === user.roomId);
        socket.leave(user.roomId);
        if (room) {
            room.connectedUsers = room.connectedUsers.filter((user) => user.socketId !== socket.id);
            console.log(`用户【${user.identity}】已断开连接`);
            if (room.connectedUsers.length <= 0) {
                rooms = rooms.filter((room) => room.id !== user.roomId);
                console.log(`房间【${room.id}】已关闭`);
            } else {
                io.to(room.id).emit("UserLeft", {
                    username: user.identity,
                    connPeerSocketId: socket.id
                })
            }
        }
        connectedUsers = connectedUsers.filter((user) => user.socketId !== socket.id);
    }
}
httpServer.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
