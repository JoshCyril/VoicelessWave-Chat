const mongoose = require('mongoose');
const Msg = require('./models/messages');
const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://WV:yeOrjqrs6vPEGufk@cluster0.zvuasbs.mongodb.net/WVChat?retryWrites=true&w=majority'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB')
}).catch(err => console.log(err))

io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    // socket.emit('message', '---- Beginning of the Chat ----');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatmessage', data => {
        const Message = new Msg({ name: data[0], message: data[1] });
        
        Message.save().then(() => {
            io.emit('message', data)
        })


    })
});