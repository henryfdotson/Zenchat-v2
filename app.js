const mongoose = require('mongoose');
const Msg = require('./models/messages.js');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const mongoDB = <MongoDB Atlas connection url/password goes here>;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('Connected!')
}).catch(err => console.log(err))


app.use(express.static('public'))

// Serve up the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  Msg.find().then(result=>{
    socket.emit('output-messages',result)
  })
  console.log('A new session started');
  socket.on('chat message', (msg) => {
    const message = new Msg({msg})
    message.save().then(()=>{
      io.emit('chat message', msg);
    })
  });
  socket.on('disconnect', () => {
    console.log('A session ended');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});