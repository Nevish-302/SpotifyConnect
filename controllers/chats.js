const chats = require('../models/chats.model')

const getChats = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {friend_id} = await req.body;
    try{
        chats.findOne({userIdOne : user_id, userIdTwo : friend_id}).then((chat) => {
            res.status(200).json({response : chat})
        }).catch((err) => {res.status(404).json({msg : "Chat not found", error : err})})
    }
    catch(error) {
        res.status(400).json({msg: error})
    }
}

const addMessage = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {friend_id, message, sentBy} = await req.body;
    try{
        chats.findOne({userIdOne : user_id, userIdTwo : friend_id}).then((chat) => {
            chats.findOneAndUpdate({userIdOne : user_id, userIdTwo : friend_id}, {$push: {messages : {message : message, time : Date.now(), sentBy : sentBy}}}).then((chat) => {
                res.status(200).json({response : chat})
            }).catch((err) => {res.status(404).json({msg : "Chat not found", error : err})})
        }).catch((err) => {res.status(404).json({msg : "Chat not found", error : err})})
    }
    catch(error) {
        res.status(400).json({msg: error})
    }
}

module.exports = {
    getChats, addMessage
}
    