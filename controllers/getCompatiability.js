const user = require('../models/user.model')
const jwt = require('jsonwebtoken')

const getCompatiability = async (req, res) => {
    const {user_id} = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.TOKEN_KEY);
    const {friend_id} = await req.body;
    try{
        user.findOne({_id : user_id}).then((user) => {
            user.findOne({_id : friend_id}).then(async (friend) => {
                
                commonArtists = await user.TopArtists.filter(value => friend.TopArtists.includes(value))
                commonTracks = await user.TopTracks.filter(value => friend.TopTracks.includes(value))
                commonGenres = await user.Genres.filter(value => friend.Genres.includes(value))
                totGenre = await user.Genres.length > friend.Genres.length ? user.Genres.length : friend.Genres.length
                totTracks = await user.TopTracks.length > friend.TopTracks.length ? user.TopTracks.length : friend.TopTracks.length
                totArtists = await user.TopArtists.length > friend.TopArtists.length ? user.TopArtists.length : friend.TopArtists.length
                compatiabilityScore = (commonArtists * 2 + commonTracks * 1 + commonGenres * 5 )/(totArtists * 2 + totTracks * 1 + totGenre * 5)
                
                res.status(200).json({commonArtists : commonArtists, commonTracks : commonTracks, commonGenres : commonGenres})
            })
        })
    }
    catch(error) {
        res.status(400).json({msg: error})
    }
}

module.exports = {
    getCompatiability
}