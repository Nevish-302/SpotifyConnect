const {Schema, model} = require('mongoose') 

const usernames = new Schema(
    {
        username : {
            type : String,
            required : true,
            trim : true,
        },
    }
)

const userNames = model('userData', usernames)

module.exports = userNames