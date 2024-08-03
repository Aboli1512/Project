const express = require('express');
const likeRouter = express.Router();
const { likeController } = require("../../controller/likeController");

// LIKE POST
likeRouter.post("/likePost/:userId",likeController.likePostController);

//LIKE COMMENT
likeRouter.post("/likeComment/:userId",likeController.likeCommentController);

module.exports = {likeRouter};