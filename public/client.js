var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('output-messages', data =>{
  console.log(data)
  if(data.length) {
    data.forEach(message=>{
      var item = document.createElement('li');
      item.textContent = message.msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    })
  }
})