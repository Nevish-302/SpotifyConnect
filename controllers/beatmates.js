const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const chats = require('../models/chats.model')

const addBeatMate = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {beat_id} = await req.body;
    
    try{
        User.findOne({_id : beat_id}).then((Beat) => {
    User.findOneAndUpdate({_id: user_id}, {$push: {BeatMates : Beat._id}}).then((user) => {
        res.status(200).json({response : user.BeatMates})
        const chat = new chats({
            userIdOne : user_id,
            userIdTwo : beat_id,
            messages : []
        })
        chat.save().then((chat) => {
            console.log(chat)
        }).catch((err) => {console.log(err)})
        
    }).catch((err) => { res.status(404).json({msg : "BeatMate not found", error : err})})
    })
}
    catch(error) {
        res.status(400).json({msg: error})
    }
}

const removeBeatmate = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {beat_id} = await req.body;
    
    try{
        User.findOne({_id : beat_id}).then((Beat) => {
    User.findOneAndUpdate({_id: user_id}, {$pop: {BeatMates : Beat._id}}).then((user) => {
        res.status(200).json({response : user.BeatMates})
    }).catch((err) => { res.status(404).json({msg : "BeatMate not found", error : err})})
    })
}
    catch(error) {
        res.status(400).json({msg: error})
    }
}


const getBeatMates = async (req, res) => {
    const name = req.body.name;
    try{
    User.find({Username: name}).then((byusernames) => {
        User.find({Name: name}).then((bynames) =>{
            res.status(200).json({byusernames : byusernames, bynames : bynames})
        })        
    })}
    catch(error) {
        res.status(400).json({msg: error})
    }
}


module.exports ={
addBeatMate, removeBeatmate, getBeatMates
}