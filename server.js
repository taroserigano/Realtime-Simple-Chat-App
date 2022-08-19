const io = require('socket.io')(3000)

const users = {}

# server generates process

io.on('connection', socket => {
  
  # when user enter name in prompt message window, script emit "new-user" signal 
  # server socket.on accepts it, and drop "name"
  # then emit out "user-connected" signal, which script again process it, and append the message
  
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
