const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const getFeed = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    
    User.findOne({_id : user_id}).then((user) => {
        //add null checks in the function
        const feed = user.Posts
        for(friend in user.BeatMates)
        {
            User.findOne({_id: friend}).then(fr => {
                feed += fr.Posts
            })
        }
        res.status(200).json({response : feed})
        
    })

}

const getStory = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    
    User.findOne({_id : user_id}).then((user) => {
        const stories = [{id : user_id, story : user.Story}]
        for(friend in user.BeatMates)
        {
            User.findOne({_id: friend}).then(fr => {
                stories += [{id : friend, story : fr.Story}]
            })
        }
        res.status(200).json({response : stories})
        
    })

}


module.exports ={
    getFeed, getStory
}