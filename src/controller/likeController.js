const express = require("express");
const user = require("../models/user");
const post = require("../models/post");
const comment = require("../models/comment");
const {CustomError} = require("../middleware/error");

const likePostController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const {postId} = req.body;
        
        const follower = await user.findById(userId);
        const getPost = await post.findById(postId);

        if(!follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!getPost)
        {
            throw new CustomError("Post not found",404);
        }


        const userOfPost_id = getPost.post_user;
        const userOfPost = await user.findById(userOfPost_id);
              
        if(!userOfPost.followers.includes(userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        if(getPost.likes.includes(userId))
        {
            throw new CustomError("You already liked the given post",400);
        }
        
        getPost.likes.push(userId);      
        await getPost.save();
        
        res.status(200).json("Liked the Post");
    }  catch(error)
    {
        next(error);
    }
 
};

const likeCommentController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const {commentId} = req.body;
        
        const follower = await user.findById(userId);
        const getComment = await comment.findById(commentId);

        if(!follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!getComment)
        {
            throw new CustomError("Comment not found",404);
        }

        if(getComment.likes.includes(userId))
        {
            throw new CustomError("You already liked the given commment",400);
        }
        
        getComment.likes.push(userId);      
        await getComment.save();
        
        res.status(200).json(getComment);
    }  catch(error)
    {
        next(error);
    }
 
};
module.exports = {likeController: {
    likePostController,
    likeCommentController
},
};