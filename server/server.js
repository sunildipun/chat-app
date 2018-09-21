const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'mike@example.com',
        text: 'Hey, whats going on',
        createAt: 123,
    });

    socket.on('createMessage', (newMessage)=>{
        console.log('createMessage',newMessage);
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