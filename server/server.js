const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    
    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
    })

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })

    socket.on('disconnect', ()=>{
        console.log('Client disconneted');
    })
})

var port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');

server.listen(port, ()=>{
    console.log(`App is up at port ${port}`);
})