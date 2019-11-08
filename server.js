const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
  // username
  socket.on('new-user', user => {
    users[socket.id] = user;
    socket.broadcast.emit('user-connected', user);
  });

  // message
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });

  // disconnected
  socket.on('disconnected', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
