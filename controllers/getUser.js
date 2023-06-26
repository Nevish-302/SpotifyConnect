const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Fetch = require('node-fetch')

const getStory = async (AccessToken) => {
    const jack = await Fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
    method: 'GET',                               // Replace with the HTTP method you want to use
    headers: {
    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    'Scope' : 'user-read-currently-playing'
  }
}).then(j=> {
    console.log(j, j.json())
    return j.json()
}).then(res => {
    console.log(res)
return {name : res.item.name, url : res.item.images[0].url}}
)
return jack;
}

const getUser = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {AccessToken} = await req.body;
    const Story = await getStory(AccessToken)
    User.findOne({_id : user_id}).then((data) => {
        if (!data)  {
            console.log("User not found");
            res.status(400).json({msg : "User not found"})
        }
        //console.log("Hello")
        console.log(data, user_id, "hi")

        res.status(200).json({response : data, story : Story})
        
    })

}

module.exports ={
    getUser
}