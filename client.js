const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');

socket.on('message', mesg => {
    console.log("[ New ] " +mesg[0] + ": " + mesg[1])
    appendMessages("[ New ] " +mesg[0] + ": " + mesg[1])
})
socket.on('output-messages', data => {
    console.log(data)
    if (data.length) {
        data.forEach(mesg => {
            var d = new Date(mesg.time);
            var text = d.toString();
            appendMessages("[ " + timeDiff(text) + " ] " +mesg.name + ": " + mesg.message)
        });
    }
})

msgForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chatmessage', ['Test User',msgForm.msg.value])
    console.log('submit from msgfrom', msgForm.msg.value)
    msgForm.msg.value = '';


})

function appendMessages(message) {
    const html = `<div>${message}</div>`
    messages.innerHTML += html
}

var timeDiff = (date1) => {
  
    var d1 = new Date(date1);
    var d2 = new Date()
  
    var diff = new Date(d2.getTime() - d1.getTime());
    
    var dt = 0;
    var st = '';
    
    if(diff.getUTCDate()-1 == 0){
      
      if(diff.getUTCHours() == 0){
        dt  = diff.getUTCMinutes()
        st = 'min'
      }else{
        dt = diff.getUTCHours()
        st = 'hour'
      }
    }else{
      dt = diff.getUTCDate()-1
      st = 'day'
    }
    
    return dt + " " + st + (dt == 1 ? "": "s") + " ago"
  }
  
//   console.log(timeDiff('2022-09-19T17:09:20.771+00:00'))