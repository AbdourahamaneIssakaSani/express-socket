const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 

// try 
// http://localhost:3000 - works on my end
// http://127.0.0.1:3000 - doesn't work on my end

// socket connection in postman doesn't work at all

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/realtime', (req, res) => {
  io.emit('realtime', { message: 'realtime' });
  res.send('realtime');

});

io.on('connection', (socket) => { 
  console.log('a user connected');

  socket.on("realtime", (data) => {
    console.log("realtime");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});