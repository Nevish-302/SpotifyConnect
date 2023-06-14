const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const getUser = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    
    User.findOne({_id : user_id}).then((data) => {
        if (!data)  {
            console.log("User not found");
            res.status(400).json({msg : "User not found"})
        }
        //console.log("Hello")
        console.log(data, user_id, "hi")

        res.status(200).json({response : data})
        
    })

}

const getBeatMates = async (req, res) => {
    const name = req.query.variable;
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
    getUser, getBeatMates
}