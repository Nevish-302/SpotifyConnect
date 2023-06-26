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
            shortTerm : {
                type : Array,
                members : {
                    name : {type : String},
                    url : {type : String}
                }
            }, 
            mediumTerm : {
                type : Array,
                members : {
                    name : {type : String},
                    url : {type : String}
                }
            },
            longTerm : {
                type : Array,
                members : {
                    name : {type : String},
                    url : {type : String}
                }
            }
        
    },
    TopTracks : {
        shortTerm : {
        type : Array,
        members : {
            name : {type : String},
            url : {type : String}
        }
    }, 
    mediumTerm : {
        type : Array,
        members : {
            name : {type : String},
            url : {type : String}
        }
    },
    longTerm : {
        type : Array,
        members : {
            name : {type : String},
            url : {type : String}
        }
    }
    },
    Name: {
        type : String,
        required : true
    },
    Genres : {
        type: Object,
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
        type : String,
    },
    SpotifyId: {
        type : String
    },
    Posts : {
        type: Array,
        members : {
            _id : {type : String}
        }
    },
});

const User = mongoose.model('User', userinfo);

module.exports = User;