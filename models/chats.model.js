const mongoose = require('mongoose');

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
        time : {type : Date, default : Date.now},
        sentBy : {type : Number}
    }
}
})

const chats = mongoose.model('data', ChatSchema);

module.exports = chats;
