const socket = io('http://localhost:3000');
const MessageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

// asking for username
const name = prompt('what is your name');
appendMessage('you are joined');
socket.emit('new-user', name);

// send message to the server
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

// user connected
socket.on('user-connected', name => {
  appendMessage(`${$name} connected`);
});

// user disconnected;
socket.on('user-disconnected', name => {
  appendMessage(`${$name} disconnected`);
});

// once submit the form
MessageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

// function to append messages and name to the container
function appendMessage(message) {
  const chatElement = document.createElement('div');
  chatElement.innerText = message;
  messageContainer.append(chatElement);
}
