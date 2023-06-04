// signal_server.js
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const roomId = "room1";
const users = []
io.on("connection", (socket) => {
    console.log("a user connected: " + socket.id);
    users.push(socket.id);
    socket.join(roomId);
    socket.on("ConnectPrepare", (data) => {
        console.log(`${Date()}, ConnectPrepare from ${socket.id} to other: ${JSON.stringify(data)}`);
        socket.broadcast.to(data.roomId).emit("ConnectPrepare", {sender: socket.id});
    });
    socket.on("ConnectInit", (data) => {
        console.log(`${Date()}, ConnectInit from ${socket.id} to ${data.receiver}: ${JSON.stringify(data)}`);
        io.to(data.receiver).emit("ConnectInit", {sender: socket.id});
    });
    socket.on("ConnectSignal", (data) => {
        console.log(`${Date()}, ConnectSignal from ${socket.id} to ${data.receiver}, type: ${data.signalData.type}`);
        io.to(data.receiver).emit("ConnectSignal", {signalData: data.signalData, sender: socket.id});
    });
    socket.on("disconnect", () => {
        console.log("user disconnected " + socket.id);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
