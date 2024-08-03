const express = require('express');
const authRouter = express.Router();
const { authController } = require("../../controller/authController");


//SIGNUP
authRouter.post("/signup",authController.signupController);

//LOGIN
authRouter.post("/login",authController.loginController);

//LOGOUT
authRouter.get("/logout",authController.logoutController);

module.exports = {authRouter};