const express = require('express')
const app = express();
const port = 8000;

app.use(express.static('static'));

const server = app.listen(port, (err) => {
    if (err) {
        console.log(`ERROR 404 NOT FOUND ${err}`)
        return;
    }
    console.log(`Server is successfully running in ${port}`)
})

const socket = require('socket.io')(server);


socket.on('connection', (socket) => {
    socket.on('SEND_NEW_MESSAGE', (data) => {
        socket.broadcast.emit('ON_NEW_MESSAGE_RECEIVED', data)
    })
})
