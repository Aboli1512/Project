const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        comment_user : {type : mongoose.Schema.Types.ObjectId , ref : "user" , required : true},
        postToComment : {type : mongoose.Schema.Types.ObjectId , ref : "post"},
        commentOnWhichCommented : {type : mongoose.Schema.Types.ObjectId , ref : "comment"},
        content : {type : String , required : true},
        createdAt : {type : Date , default : Date.now},
        commentOncomment : [{type : mongoose.Schema.Types.ObjectId , ref : "comment"}],
        likes : [{type : mongoose.Schema.Types.ObjectId , ref : "user"}],
    } ,
    {
        timestamps : true 
    }
);

module.exports = mongoose.model("comment", commentSchema);