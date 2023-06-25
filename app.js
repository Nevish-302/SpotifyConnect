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
