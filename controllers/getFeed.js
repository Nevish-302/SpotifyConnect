const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const getFeed = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    
    User.findOne({_id : user_id}).then((user) => {
        const feed = user.Posts
        for(friend in user.BeatMates)
        {
            User.findOne({_id: friend}).then(friend => {
                feed += friend.Posts
            })
        }
        res.status(200).json({response : feed})
        
    })

}


module.exports ={
    getFeed
}