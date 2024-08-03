const express = require("express");
const user = require("../models/user");
const {CustomError} = require("../middleware/error");

// GET USER INFO
const getUserController = async(req,res,next) => {
    try {
        const {id} = req.params;
        const getUser = await user.findById(id);
        if(!getUser)
        {
            throw new CustomError("User not found",404);
        }

        const {password,...data} = getUser._doc;
        res.status(200).json(data);

    }  catch(error)
    {
        next(error);
    }

};

//UPDATE USER INFO
const updateUserController = async(req,res,next) => {
    try {
        const {id} = req.params;
        const updateinfo = req.body;

        const userToUpdate = await user.findById(id);

        if(!userToUpdate)
        {
            throw new CustomError("User not found",404);
        }

        Object.assign(userToUpdate,updateinfo);
        await userToUpdate.save();

        res.status(200).json("Update successful");
    }  catch(error)
    {
        next(error);
    }

};

//FOLLOW
const followUserController = async(req,res,next) => {
    try {
        const {id} = req.params;
        const userToFollow_id = req.body._id;

        const userToFollow = await user.findById(userToFollow_id);
        const follower = await user.findById(id);

        if(!userToFollow && !follower)
        {
            throw new CustomError("User not found",404);
        }

        if(id == userToFollow_id)
        {
            throw new CustomError("You cannot follow yourself",500);
        }
        
        
        if(follower.following.includes(userToFollow_id))
        {
            throw new CustomError("You already follow the given user",400);
        }

        follower.following.push(userToFollow_id);
        userToFollow.followers.push(id);
       
        await userToFollow.save();
        await follower.save();
        
        res.status(200).json("Following");
    }  catch(error)
    {
        next(error);
    }

};

//UNFOLLOW
const unfollowUserController = async(req,res,next) => {
    try {
        const {userid} = req.params;
        const userToUnfollow_id = req.body._id;

        const userToUnfollow = await user.findById(userToUnfollow_id);
        const follower = await user.findById(userid);

        if(!userToUnfollow && !follower)
        {
            throw new CustomError("User not found",404);
        }       
        
        if(!follower.following.includes(userToUnfollow_id))
        {
            throw new CustomError("You don't follow the given user",400);
        }

        follower.following = follower.following.filter(id => id.toString() !== userToUnfollow_id);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userid);
       
        await userToUnfollow.save();
        await follower.save();
        
        res.status(200).json("Unfollowed");
    }  catch(error)
    {
        next(error);
    }

};
module.exports = {userController: {
    getUserController,
    updateUserController,
    followUserController,
    unfollowUserController
},
};