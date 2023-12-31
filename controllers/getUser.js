const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const Fetch = require('node-fetch')

const get_items = async (AccessToken) => {
    try {
    const jack = await Fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
      method: 'GET',                               // Replace with the HTTP method you want to use
      headers: {
      'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
      'Scope' : 'user-read-currently-playing'
    }
  }).then(response => {if(response.status == 200) {return response.json();} else {console.log(response.status) ;return null}})
  
  console.log(jack, 'jack')
  if (jack == null) {
  return null
  }
  return {name : jack.item.name, img : jack.item.album.images[0].url}
  
}
  catch (err) {
    console.log(err)
    return err
}
  }
  

const getStory = async (AccessToken) => {
    const jack = await Fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
    method: 'GET',                               // Replace with the HTTP method you want to use
    headers: {
    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    'Scope' : 'user-read-recently-played'
  }
}).then(j=> {
    console.log("HHKJ", j)
    return j.json()
}).then(res => {
    console.log("KJGKH", res)
return {name : res.items[0].track.name, url : res.items[0].track.album.images[0].url}}
  //return res;}
)
return jack;
}

const getUser = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {AccessToken} = await req.body;
    var Story = await get_items(AccessToken)
    if (Story == null)
    {
      console.log("Hello")
      Story = await getStory(AccessToken);      
    }

    User.findOne({_id : user_id}).then((data) => {
        if (!data)  {
            console.log("User not found");
            res.status(400).json({msg : "User not found"})
        }
        //console.log("Hello")
        //console.log(data, user_id, "hi")

        res.status(200).json({response : data, story : Story})
        
    })

}

module.exports ={
    getUser
}