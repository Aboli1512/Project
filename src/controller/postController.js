const express = require("express");
const user = require("../models/user");
const post = require("../models/post");
const {CustomError} = require("../middleware/error");


const generateFileURL = (filename) =>
{
    return process.env.URL+`/uploads/${filename}`
}
// CREATE POST
const createPostController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const{postContent} = req.body;


        const getUser = await user.findById(userId);

        if(!getUser) 
        {
            throw new CustomError("User not found",404);
        }

        const newPost = new post ({post_user : userId , postContent , image : generateFileURL(req.file.filename)});
        await newPost.save();
        getUser.posts.push(newPost._id);
        await getUser.save();

        res.status(201).json({message : "Post created successfully" , post : newPost});

    }  catch(error)
    {
        next(error);
    }
};

const getAllPostsIdsController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const userOfPost_id = req.body._id;
        const userOfPost = await user.findById(userOfPost_id);
        const follower = await user.findById(userId);

        if(!userOfPost && !follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!userOfPost.followers.includes(userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        res.status(200).json(userOfPost.posts);

    }  catch(error)
    {
        next(error);
    }

};

//PAGINATION ON TWEETS
const getSomePostsController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const userOfPost_id = req.body._id;
        const userOfPost = await user.findById(userOfPost_id);
        const follower = await user.findById(userId);

        if(!userOfPost && !follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!userOfPost.followers.includes(userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        const {page, page_size} = req.body;

        const start_index = (page-1) * page_size;
        
        const postsToDisplay = await user.findById(userOfPost_id).populate(
            {
            path : 'posts',
            options : {
                skip : start_index,
                limit : page_size,
                sort : {createdAt : -1}
            }
            }
        );

        res.status(200).json(postsToDisplay);

    }  catch(error)
    {
        next(error);
    }

};
const getPostController = async(req,res,next) => {
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

        res.status(200).json(getPost);

    }  catch(error)
    {
        next(error);
    }

};

module.exports = {postController: {
    createPostController,
    getAllPostsIdsController,
    getSomePostsController,
    getPostController
},
};