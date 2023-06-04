// server.js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // 监听客户端发送的offer
  socket.on('offer', (offer) => {
    console.log('received offer:', offer);
    // 将offer转发给其他客户端
    socket.broadcast.emit('offer', offer);
  });

  // 监听客户端发送的answer
  socket.on('answer', (answer) => {
    console.log('received answer:', answer);
    // 将answer转发给其他客户端
    socket.broadcast.emit('answer', answer);
  });
  // 监听客户端发送的candidate
  socket.on('candidate', (candidate) => {
    console.log('received candidate:', candidate);
    // 将candidate转发给其他客户端
    socket.broadcast.emit('candidate', candidate);
  });
  socket.on("disconnect", () => {
      console.log("user disconnected " + socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});