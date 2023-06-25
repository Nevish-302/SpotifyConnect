const mongoose = require('mongoose');
const { send } = require('vite');

const {Schema}  = mongoose;

const ChatSchema = new Schema({

    userIdOne : {
        type : String
    },
    userIdTwo : {
        type : String
    },
    messages: {
    type : Array,
    members : {
        message : {type : String},
        time : {type : Date},
        sentBy : {type : Number}
    }
}
})

const chats = mongoose.model('data', ChatSchema);

module.exports = chats;