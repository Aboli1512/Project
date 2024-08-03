const express = require('express');
const userRouter = express.Router();
const { userController } = require("../../controller/userController");


// GET USER INFO
userRouter.get("/getUser/:id",userController.getUserController);

//UPDATE USER INFO
userRouter.put("/updateUser/:id",userController.updateUserController);

//FOLLOW
userRouter.post("/follow/:id",userController.followUserController);

//UNFOLLOW
userRouter.post("/unfollow/:userid",userController.unfollowUserController);

module.exports = {userRouter};








