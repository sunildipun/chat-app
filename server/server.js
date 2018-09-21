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

    
    socket.emit('newMessage',{
        from:'Admin',
        text:"Welcome to Chat App",
        createdAt: new Date().getTime(),

    })

    socket.broadcast.emit('newMessage',{
        from: "Admin",
        text:"New User Joined",
        createdAt: new Date().getTime(),

    })

    socket.on('createMessage', (message)=>{
        console.log('createMessage',message);
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime(),
        })
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