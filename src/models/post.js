const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        post_user : {type : mongoose.Schema.Types.ObjectId , ref : "user" , required :true },
        postContent : {type : String , required : true , maxLength : 250},
        //image : {type : mongoose.Schema.Types.ObjectId , ref : "image"},
        image : {type : String},
        createdAt : {type : Date , default : Date.now},
        comments : [{type : mongoose.Schema.Types.ObjectId , ref : "comment"}],
        likes :[{type : mongoose.Schema.Types.ObjectId , ref : "user"}]
    } ,
    {
        timestamps : true 
    }
);



module.exports =  mongoose.model("post" , postSchema);