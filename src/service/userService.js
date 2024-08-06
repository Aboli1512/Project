const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {CustomError} = require("../middleware/error");
const {UserRepository} = require("../repository/userRepository");
const userRepository = new UserRepository();
class UserService {

    async getUserInfo(id) {
        const getUser = await userRepository.findUser(id);
        if(!getUser)
        {
            throw new CustomError("User not found",404);
        }

        const {password,...data} = getUser._doc;
        return data;
    }

    async getUserProfile(userID,inpName)
    {
        const follower = await userRepository.findUser(userID);
        const getUser = await userRepository.findByName(inpName);
        if(!getUser)
        {
            throw new CustomError("User not found",404);
        }

        if(!follower)
        {
            throw new CustomError("Follower not found",404);
        }

        if(!getUser.followers.includes(userID))
            {
                throw new CustomError("You don't follow the given user",400);            
            }

        let LastTenTweets = {};

        if(getUser.posts.length > 0)
        {
            LastTenTweets = await userRepository.findLastestPosts(inpName);
        }

        return {getUser,LastTenTweets};
    }

    async updateUser(id,updateinfo,inp_password)
    {
        const userToUpdate = await userRepository.findUser(id);

        if(!userToUpdate)
            {
                throw new CustomError("User not found",404);
            }
        
        const match = await bcrypt.compare(inp_password,userToUpdate.password);
        if(!match)
        {
            throw new CustomError("Wrong Credentials",401);
        }

        delete updateinfo.password;
        Object.assign(userToUpdate,updateinfo);
        await userToUpdate.save();

        return userToUpdate;
    }

    async followUser(id,userToFollow_id)  
    {
        const userToFollow = await userRepository.findUser(userToFollow_id);
        const follower = await userRepository.findUser(id);

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

        return ;
    } 

    async unfollowUser(userid,userToUnfollow_id)
    {
        
        const userToUnfollow = await userRepository.findUser(userToUnfollow_id);
        const follower = await userRepository.findUser(userid);

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

        return ;
        
    }

}
module.exports = {UserService};