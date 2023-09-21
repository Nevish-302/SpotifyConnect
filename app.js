//The required Node Modules

const express = require('express')
const mongoose = require('mongoose')
//const cors = require('cors')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
require('dotenv').config()

app = express()

//To parse the form data

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());     
//app.use(cors({credentials : true, origin: 'https://goresume-ten.vercel.app', }))

app.use(cookieParser())

//Mongodb URI
//const uri = `mongodb://127.0.0.1:27017/test`;
mongoose.connect(process.env.URI, {usenewUrlParser: true})
const connection = mongoose.connection
connection.once('open', ()=>
{
    console.log(`MongoDB connected successfully`);
})

//The routes
const userauth = require('./routes/userauth')
const compatiability = require('./routes/compatiability')
const Beatmates = require('./routes/beatMates')
const chats = require('./routes/chats')

//The routing of requests
app.use('/auth', userauth);
app.use('/compatiability', compatiability);
app.use('/beatmates', Beatmates);
app.use('/chats', chats);

app.listen(5000, () => {
  console.log(`The server is listening on the port 5000`);
});
//Socket Code

//var http = require("http").Server(app);
//var io = require("socket.io")(http);
const chats = require('./models/chat.model')
const User = require('./models/user.model')
)
const io = require("socket.io")(server, {
  cors : {
    //origin : ["http://localhost:8080", "https://admin.socket.io/"],
    origin : "*",
  }
})
module.exports=io

const socketIo = io.of('/socket') 

socketIo.on('connection', socket=>{
  socket.on('ping', n =>console.log(n))
  socket.on('custom-event', (a, b, c) => {
      console.log(a, b, c);
  })
//Team Getting Resource
socket.on('send-chat-message', async (request, cb) =>{
  
  if(request.senderId && request.receiverId){
  const sender = await User.find({_id : request.senderId})
  const receiver = await User.find({_id : request.receiverId})
  if(!sender || !receiver)
  {
    cb(
      {
        status: "failure",
        data: {
            message : "Incorrect Ids" ,
        }
    }
    )
  }
else {
    const chats = await Chat.findOneAndUpdate({userIdOne : sender._id, userIdTwo : sender._id}, {$push: {messages : {message : request.message.content, sentBy : request.message.sentBy})
    socket.broadcast.emit('receive-chat-message', request.receiverId)
    cb(
    {
      status: "success",
      data: {
          resource : chats ,
      }
  })
}
}
  else
  {
    cb({
      status: "failure",
      data: {
          message : "Provide the ids",
      }
  })
  }
})
})
