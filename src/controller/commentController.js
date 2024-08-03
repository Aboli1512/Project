const express = require("express");
const user = require("../models/user");
const post = require("../models/post");
const comment = require("../models/comment");
const {CustomError} = require("../middleware/error");

const commentPostController = async(req,res,next) => { 
    try {
        const {userId} = req.params;
        const {postId , content} = req.body;
        
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

        const newComment = new comment ({comment_user : userId , postToComment : postId , content });
        await newComment.save();
        getPost.comments.push(newComment._id);
        await getPost.save();
        
        res.status(200).json(newComment);
    }  catch(error)
    {
        next(error);
    }

};

const commentOnCommentController = async(req,res,next) => { 
    try {
        const {userId} = req.params;
        const {commentId , content} = req.body;
        
        const userToComment = await user.findById(userId);
        const getComment = await comment.findById(commentId);

        if(!userToComment)
        {
            throw new CustomError("User not found",404);
        }

        if(!getComment)
        {
            throw new CustomError("Post not found",404);
        }

        const newComment = new comment ({comment_user : userId , commentOnWhichCommented : commentId , content });
        await newComment.save();
        getComment.commentOncomment.push(newComment._id);
        await getComment.save();
        
        res.status(200).json(newComment);
    }  catch(error)
    {
        next(error);
    }

};
module.exports = {commentController: {
    commentPostController,
    commentOnCommentController
},
};