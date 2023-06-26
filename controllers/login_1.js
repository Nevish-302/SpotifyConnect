const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Fetch = require('node-fetch')
const User = require('../models/user.model')

const get_items = async (AccessToken, time_range, userItem) => {
  const jack = await Fetch(`https://api.spotify.com/v1/me/top/${userItem}?time_range=${time_range}&limit=30&offset=0`, {
    method: 'GET',                               // Replace with the HTTP method you want to use
    headers: {
    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    'Scope' : 'user-top-read'
  }
}).then(response => response.json()).then(artists=> {
  console.log(artists)
  const Artists = artists.items.map(item => {
  console.log(item)
  if(userItem == 'artists'){
return {name : item.name, url : item.images[0].url}}
else{
return {name : item.name, url : item.album.images[0].url}

}
})
//console.log(typeof(Artists))
return Artists

//console.log(userItem, time_range, Artists)
})
return jack
}
const get_genre = async (AccessToken) => {
  const genres = await Fetch(`https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=30&offset=0`, {
    method: 'GET',                               // Replace with the HTTP method you want to use
    headers: {
    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    'Scope' : 'user-top-read'
  }
}).then(response => response.json()).then(artists=> {const Genres = {};const Artists = artists.items.map(item => {
  item.genres.forEach(genre=> {if (Genres[`${genre}`] == undefined) {Genres[`${genre}`] = 1} else {Genres[`${genre}`] += 1}} ); 
})
//console.log('Genres', Genres)
return Genres
})
return genres
}
const get_user = async (AccessToken) => {
  const User = await Fetch('https://api.spotify.com/v1/me', {
      method: 'GET',                               // Replace with the HTTP method you want to use
      headers: {
        'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
        'X-Scope' : 'user-read-private,user-read-email'
      }
    }).then(response => response.json()).then(user => {
      console.log("Hi Bro ", user)
      return user
    })
  return User
}


const register = async (req, res) => {
  const {AccessToken, user_name} = await req.body;

const artists_long_term = await get_items(AccessToken, 'long_term', 'artists')
const tracks_long_term = await  get_items(AccessToken, 'long_term', 'tracks')
const tracks_short_term = await  get_items(AccessToken, 'short_term', 'tracks')
const artists_medium_term = await  get_items(AccessToken, 'medium_term', 'artists')
const artists_short_term = await  get_items(AccessToken, 'short_term', 'artists')
const tracks_medium_term = await  get_items(AccessToken, 'medium_term', 'tracks')
const genre =  await get_genre(AccessToken)
const currentUser = await get_user(AccessToken)
//    console.log(
//      currentUser,
//      genre,
//artists_long_term,
//tracks_long_term,
//tracks_short_term,
//artists_medium_term,
//artists_short_term,
//      tracks_medium_term,
//    )
    console.log("Hello", currentUser)    
    const user = new User({Username : user_name, AccessToken : AccessToken, TopArtists : {shortTerm : artists_short_term, mediumTerm : artists_medium_term, longTerm : artists_long_term}, TopTracks : {shortTerm : tracks_short_term, mediumTerm : tracks_medium_term, longTerm : tracks_long_term}, Name : currentUser.display_name, Genres : genre, SpotifyId : currentUser.id, ProfilePic : currentUser.images[0].url,})
    
    user.save()
    .then(item => {
      console.log(`${item} has registered successfully`);
    })
    .catch(err => {
      console.log("unable to register", err);
    });
    res.status(200).json(user);            

  }

  const refresh = async (req, res) => {
    const {AccessToken, userId} = await req.body;
  
  const artists_long_term = await get_items(AccessToken, 'long_term', 'artists')
  const tracks_long_term = await  get_items(AccessToken, 'long_term', 'tracks')
  const tracks_short_term = await  get_items(AccessToken, 'short_term', 'tracks')
  const artists_medium_term = await  get_items(AccessToken, 'medium_term', 'artists')
  const artists_short_term = await  get_items(AccessToken, 'short_term', 'artists')
  const tracks_medium_term = await  get_items(AccessToken, 'medium_term', 'tracks')
  const genre =  await get_genre(AccessToken)
  const currentUser = await get_user(AccessToken)
//      console.log(
//        currentUser,
//        genre,
//  artists_long_term,
//  tracks_long_term,
//  tracks_short_term,
//  artists_medium_term,
//  artists_short_term,
//        tracks_medium_term,
//      )
  
      console.log("Hello")    
      const user = await User.findOneAndUpdate({_id : userId}, {Username : user_name, AccessToken : AccessToken, TopArtists : {shortTerm : artists_short_term, mediumTerm : artists_medium_term, longTerm : artists_long_term}, TopTracks : {shortTerm : tracks_short_term, mediumTerm : tracks_medium_term, longTerm : tracks_long_term}, Name : currentUser.display_name, Genres : genre, SpotifyId : currentUser.id, ProfilePic : currentUser.images[0].url,})
      then(item => {
        console.log(`${item} has been found`);
        const token = jwt.sign(
          { user_id: item._id},
          process.env.TOKEN_KEY,
          {
            expiresIn: "20h",
          }
        );
      })
      .catch(err => {
        console.log("unable to register", err);
      });
      res.status(200).json(user);            
      
    }

module.exports = {refresh, register}



//const AccessToken = 'BQDXjKJai7iF5NQ5CDDf7aiohPiG9C78BnedT6kjRYZW-FeSP7mq6u38CV0VBQCcinxSjnyBQiguKoh1BAADVKnM5tMpTOvBj4NuDnLgtKxIpwEizpwXxWmGBJgE8EYX2lGfxQ1u7Q1jk1dtBwOX0tkAQZSrEHS5rA6-KNMoh49FNvCz3mx0_BIvjEvADbnj4iiEV1PkNdahpVp4IPA6JIlvKPiDHcmE'



//Fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=30&offset=0', {
    //    method: 'GET',                               // Replace with the HTTP method you want to use
    //    headers: {
    //    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    //    'Scope' : 'user-top-read'
    //  }
    //}).then(response => response.json()).then(artists=> {Fetch('https://api.spotify.com/v1/me', {
    //  method: 'GET',                               // Replace with the HTTP method you want to use
    //  headers: {
    //    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    //    'X-Scope' : 'user-read-private,user-read-email'
    //  }
    //}).then(response => response.json()).then(user => {
    //  
    //  Fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=30&offset=0', {
    //    method: 'GET',                               // Replace with the HTTP method you want to use
    //    headers: {
    //    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    //    'Scope' : 'user-top-read'
    //  }
    //}).then(response => response.json()).then(short_term => {
    //
    //
    //  Fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=30&offset=0', {
    //   method: 'GET',                               // Replace with the HTTP method you want to use
    //   headers: {
    //     'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    //     'Scope' : 'user-top-read'
    //    }
    // }).then(response => response.json()).then(medium_term => {
    //  
    //  Fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30&offset=0', {
    //  method: 'GET',                               // Replace with the HTTP method you want to use
    //  headers: {
    //    'Authorization': `Bearer ${AccessToken}`,    // Include the bearer token in the Authorization header
    //    'Scope' : 'user-top-read'
    //  }
    //}).then(response => response.json()).then(long_term => {
    //  const Artists = artists.items.map(item => {
    //    item.genres.forEach(genre=> {if (Genres[`${genre}`] == undefined) {Genres[`${genre}`] = 1} else {Genres[`${genre}`] += 1}} ); 
    //  return item.name})
    //  const ShortTerm =  short_term.items.map(item => {return item.name})
    //  const MediumTerm =  medium_term.items.map(item => {return item.name})
    //  const LongTerm =  long_term.items.map(item => {return item.name})
    //  console.log(user, Artists, '____________________________________________________________', ShortTerm, '____________________________________________________________', MediumTerm, '____________________________________________________________', LongTerm)
    //})
    
//  })      
//})

//})
//    })
//
