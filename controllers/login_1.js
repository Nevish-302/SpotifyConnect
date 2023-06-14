const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const https = require('https')
const User = require('../models/user.model')

const login = (req, res) => {
    console.log("Hello")
    //const {AccessToken} = req.body
        const AccessToken = 'BQAjxakR8QdDXWRKrlZreTaBsogvi18wcsq-MWM7w8lY7C3tATp0mslbYUkqx8RXVRVnKP269W8qFFajpMQhLqmlItwwgXHskj9_7MnT4usgc1E8dB2aaJmkxiJvHBXlEP-sXBvgtPhcjwAS7jfoe4fNsV2PN-rtLmQ9We8zGEM_r6z4AOGUe5dXEi0mHti7kznvFSDH_rF99ZUgsiDtC36ZQ4neqjf1'
        const options = {
            hostname: 'api.spotify.com',  // Replace with the API hostname
            path: '/v1/m',            // Replace with the API endpoint path
            method: 'GET',                 // Replace with the HTTP method you want to use
            headers: {
              'Authorization': `Bearer ${AccessToken}`  // Replace with your bearer token
            }
          };
        //const Req = https.request(options, (res) => 
        //{
        //    // Handle the response
        //    let data = '';
//
        //    res.on('data', (chunk) => {
        //      data += chunk;
        //    });
        //
        //    res.on('end', () => {
        //      // Process the received data
        //      console.log(data);
        //    });
        //    console.log("Fuck You");
        //    console.log(res)
        //});
        //Req.end()
        fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=100&offset=0', {
            method: 'GET',                               // Replace with the HTTP method you want to use
            headers: {
              'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
              'Scope' : 'user-top-read'
            }
          })
            .then(response => response.json())
            .then(data => {
              // Process the received data
              console.log('________________________________________________________________________')
              const jack = data.items.forEach(item=> {console.log(item.name) ;return item.name})
              console.log(data.items.length);
              res.json({items : data.items})
            })
            .catch(error => {
              console.error(error);
            });
    //    User.findOne({Username: username}).then((id)=>
    //    {
    //    if(!id)
    //    {return res.status(400).json({ msg: "User not found" })}
    //        console.log(id)
    //    bcrypt.compare(password, id.passHash, (err, data) => {
    //        if(err) console.log(err);
    //        if (data) {
    //            console.log(id)
    //            const token = jwt.sign(
    //                { user_id: id._id, AccessToken : id.AccessToken },
    //                process.env.TOKEN_KEY,
    //                {
    //                  expiresIn: "20h",
    //                }
    //              );
    //              res.status(200).json({success : true, auth: token})
    //              //res.cookie("auth", token, { expire: new Date() + 9999 }).status(200).json(id);
    //            console.log({ msg: "Login success" }, token);
    //        } else {
    //            return res.status(401).json({ msg: "Invalid credentials" })
    //        }
    //    })
    //})
  
    
}


//const login_p = (req, res) => {
//    //
//    const {username, password} = req.body
//        console.log(username, password)
//        if (username && password)
//        {
//        const user = User.findOne({Username: username}).then((id)=>
//        {
//        if(!id)
//            res.status(400).json({ msg: "User not found" })
//            console.log(id)
//        bcrypt.compare(password, id.passHash, (err, data) => {
//            if(err) console.log(err);
//            if (data) {
//                console.log(id)
//                const token = jwt.sign(
//                    { user_id: id._id, user_name : id.Username },
//                    process.env.TOKEN_KEY,
//                    {
//                      expiresIn: "2h",
//                    }
//                  );
//                  res.status(200).cookie("auth", token, { expire: new Date() + 9999 });
//                  //res.status(200).json({name : "auth", token : token});
//                  console.log(id, "auth", token, { expire: new Date() + 9999 });
//                console.log({ msg: "Login success" }, req.session);
//            } 
//            else {
//                console.log(`invalid credentials`)
//                return res.status(401).json({ msg: "Invalid credentials" })
//            }
//        })
//    })
//  }
//  else{
//    return res.status(401).json({ msg: "Invalid credentials" })
//  }
//    
//}
//
//
module.exports = {login}