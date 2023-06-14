const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const jwt = require("jsonwebtoken");
const register_p = async (req, res) => {
    const {username, password, email} = await req.body;
    const saltrounds = 10
    bcrypt.hash(password, saltrounds, (err, hash)=>{
        const user = new User({Username: username, passHash: hash, Email : email});
        user.save()
        .then(item => {
          console.log(`${item} has registered successfully`);
        })
        .catch(err => {
          console.log("unable to register", err);
        });
        const token = jwt.sign(
          { user_id: username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        console.log(user);
        res.status(200).json(user);            
    })
    
          
    
}
const register_g = (req, res) => {
    res.status(200).send('Home');
}
module.exports = {register_p, register_g}