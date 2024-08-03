const express = require('express');
const commentRouter = express.Router();
const { commentController } = require("../../controller/commentController");

//COMMENT POST
commentRouter.post("/commentPost/:userId",commentController.commentPostController);

//COMMENT ON COMMENT
commentRouter.post("/commentOnComment/:userId",commentController.commentOnCommentController);
module.exports = {commentRouter};