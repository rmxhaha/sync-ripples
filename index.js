const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var connectCounter = 0;

io.on('connect', function(socket) {
    connectCounter++; 
    console.log('a user connected');

    socket.on('click', (event) => {
        io.emit('click', event);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      connectCounter--;
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

setInterval(() => {
    console.log(`${connectCounter} users connected`);
}, 5000);