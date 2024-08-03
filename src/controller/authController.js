const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const {CustomError} = require("../middleware/error");

const signupController = async(req,res,next)=>
    {
        try
        {
            const {username , email , password} = req.body;
            const check = await user.findOne({$or : [{username} , {email}]});
            if(check)
            {
                throw new CustomError("Username or email already existing. Not a unique info",400);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(password,salt);
            const newUser = new user({...req.body,password:hashedPassword});
            const addedUser = await newUser.save();
            res.status(201).json(addedUser);

        } catch(error)
        {
            next(error);
        }
    };

const loginController = async(req,res,next)=>
    {
        try
        {
            let inpUser;
            if(req.body.email)
            {
                inpUser = await user.findOne({email : req.body.email});
            }
            else
            {
                inpUser = await user.findOne({username : req.body.username});
            }

            if(!inpUser)
            {
                throw new CustomError("User not found",404);
            }

            const match = await bcrypt.compare(req.body.password,inpUser.password);
            if(!match)
            {
                throw new CustomError("Wrong Credentials",401);
            }

            const {password,...data}=inpUser._doc;
            const token = jwt.sign({_id : inpUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_DATE});
            res.cookie("token",token).status(200).json(data);
        } catch(error)
        {
            next(error);
        }
    };

const logoutController = async(req,res,next)=>
    {
        try
        {            
            res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("User logged out");
        } catch(error)
        {
            next(error);
        }
    };

module.exports = {authController: {
          signupController,
          loginController,
          logoutController
        },
    };