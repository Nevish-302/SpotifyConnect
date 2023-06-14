const mongoose = require(`mongoose`)
const {Schema}  = mongoose;

const userinfo = new Schema ({
    Username : {
        type: String, 
        required: true,
        unique: true,
        trim: true,         
        minlength:3,
    },
    AccessToken : {
        type : String,
        required : true,
        trim: true,
    },
    TopArtists : {
        type: Array,
        members : {
            artist : {type : String}
        }
    },
    TopAlbums : {
        type : Array,
        members : {
            album : {type : String}
        }
    },
    Name: {
        type : String,
        required : true
    },
    Age : {
        type : Number
    },
    Gender : {
        type: String
    },
    Phone : {
        type : String
    },
    BeatMates : {
        type: Array,
        members : {
            _id : {type : String}
        }
    },
    ProfilePic : {
        data: Buffer,
        contentType: String
    },
    Posts : {
        type: Array,
        members : {
            _id : {type : String}
        }
    }

});

const User = mongoose.model('User', userinfo);

module.exports = User;