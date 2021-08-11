const app = require('./config/app')

const database = require('./config/db');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./helpers/users.js')

const http = require('http').createServer(app);
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, cb) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return cb(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room }`})
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room.`})
        socket.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        socket.join(user.room)
    })

    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
    
        cb();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) { 
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`})
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
});

http.listen(process.env.PORT, async () => {
    try {
        const resultado = await database.sync();
    } catch (error) {
        console.log(error);
    }
    
    console.log(`server up on port ${PORT}`)
})