const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { path: '/ripples/socket.io/' });


app.get('/ripples/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var connectCounter = 0;

io.on('connect', function(socket) {
    connectCounter++; 
    console.log('a user connected');

    var colour = '#' + Math.floor(Math.random()*16777215).toString(16);

    socket.on('click', (event) => {
        event.meta = { colour };
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