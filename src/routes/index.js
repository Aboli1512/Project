const express = require("express");
const {userRouter} = require("./v1/userRouter");
const {authRouter} = require("./v1/authRouter");
const {postRouter} = require("./v1/postRouter");
const {likeRouter} = require("./v1/likeRouter");
const {commentRouter} = require("./v1/commentRouter");
const verifyToken = require("../middleware/verifyToken");

const appRouter = express.Router();

appRouter.use("/v1", authRouter);
appRouter.use("/v1", verifyToken, userRouter);
appRouter.use("/v1", verifyToken , postRouter);
appRouter.use("/v1", verifyToken , likeRouter);
appRouter.use("/v1", verifyToken , commentRouter);

module.exports = { appRouter };