const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '../public');
var app = express();

app.use(express.static(publicPath));

var port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');

app.listen(port, ()=>{
    console.log(`App is up at port ${port}`);
})