const mongoose = require('mongoose');
const {Schema}  = mongoose;

const PostSchema= new Schema({

    Type: {
        type : Number,
        required : true
    },
    Media: {
        data: Buffer,
        contentType : String
    },
    Keywords : {
        type : Array,
        members : {
            keyword : {type : String}
        }
    },
    Time : {
        type : Date,
        required : true
    }
})

const posts = mongoose.model('data', PostSchema);

module.exports = posts;