const {AuthService} = require("../service/authService")
const authService = new AuthService();

const signupController = async(req,res,next)=>
    {
        try
        {
            const {username , email , password} = req.body;
            const data = req.body;
            const addedUser = await authService.signUp(username , email , password , data);
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

            const data = req.body;
            const {token , userId} = await authService.login(data);
            res.cookie("token",token).status(200).json(
                {
                    "message" : "LOGIN SUCCESSFULL",
                    "id" : userId
                });
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