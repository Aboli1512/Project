
const {UserService} = require("../service/userService")
const userService = new UserService();

// GET USER INFO
const getUserController = async(req,res,next) => {
    try {
        const {id} = req.params;

        const data = await userService.getUserInfo(id);

        res.status(200).json(data);

    }  catch(error)
    {
        next(error);
    }

};

//GET USER PROFILE
const getUserProfileController = async(req,res,next) => {
    try {
        const{userID} = req.params;
        const inpName = req.body.username;

        const {getUser,LastTenTweets} = await userService.getUserProfile(userID,inpName);

        res.status(200).json({
            "username" : getUser.username ,
            "bio" : getUser.bio ,
            "follower_count" : getUser.followers.length,
            "Latest_Tweets" : LastTenTweets

        });

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
        const inp_password = req.body.password;
        const userToUpdate = await userService.updateUser(id,updateinfo,inp_password);

        res.status(200).json({
            message : "Update successful",
            data : userToUpdate
        });
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
        
        userService.followUser(id,userToFollow_id);

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

        userService.unfollowUser(userid,userToUnfollow_id);
        res.status(200).json("Unfollowed");
    }  catch(error)
    {
        next(error);
    }

};
module.exports = {userController: {
    getUserController,
    getUserProfileController,
    updateUserController,
    followUserController,
    unfollowUserController
},
};