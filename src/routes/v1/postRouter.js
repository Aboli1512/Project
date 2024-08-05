const express = require('express');
const postRouter = express.Router();
const { postController } = require("../../controller/postController");
const upload = require("../../middleware/upload");
const path = require("path");

// CREATE POST
postRouter.post("/createPost/:userId",upload.single("imageUpload"),postController.createPostController);

//GET ALL POSTS 
postRouter.get("/getAllPostsIds/:userId",postController.getAllPostsIdsController);

//PAGINATION ON POSTS
postRouter.get("/getSomePosts/:userId",postController.getSomePostsController);

//GET A POST
postRouter.get("/getPost/:userId",postController.getPostController);



module.exports = {postRouter};
 






