const express = require('express')
const app = express();
const port = 9000;

app.use(express.static('public'))

let server = app.listen(port, (err) => {
    if (err) {
        console.log(`Error ${err}`)
        return;
    }
    console.log(`Server running in ${port}`)
})

const socket = require('socket.io')(server);
const users = []
socket.on('connection', (socket) => {

    console.log('Connected...')

    socket.on('new user connected', (d) => {
        console.log(`Data`, d)
        users.push(d.name)
        socket.emit('user connected notifier', { listOfAllUsers: users })
    })
    socket.emit('user connected notifier', { listOfAllUsers: users })
})