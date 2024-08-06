const bcrypt = require("bcrypt");

const {UserRepository} = require("../repository/userRepository");
const {PostRepository} = require("../repository/postRepository");
const post = require("../models/post");
const userRepository = new UserRepository();
const postRepository = new PostRepository();
const {CustomError} = require("../middleware/error");

const generateFileURL = (filename) =>
    {
        return process.env.URL+`/uploads/${filename}`
    }

class PostService {

    async createPost(userId,postContent,inp_password,data)
    {
        const getUser = await userRepository.findUser(userId);
        
        if(!getUser) 
            {
                throw new CustomError("User not found",404);
            }

        const match = await bcrypt.compare(inp_password,getUser.password);
        if(!match)
        {
            throw new CustomError("Wrong Credentials",401);
        }

        let newPost = {};
        if(data)
        {
            newPost = new post ({post_user : userId , postContent , image : generateFileURL(data.filename)});
        }
        else{
           newPost = new post ({post_user : userId , postContent , image : null});
        }
        await newPost.save();
        getUser.posts.push(newPost._id);
        await getUser.save();

        return newPost;
    }
    async getPostIDs(userId,userOfPost_id)
    {
        const userOfPost = await userRepository.findUser(userOfPost_id);
        const follower = await userRepository.findUser(userId);

        if(!userOfPost && !follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!userOfPost.followers.includes(userId) && (userOfPost_id != userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        return userOfPost;
    }

    async getSomePosts(userId,userOfPost_id,page,page_size)
    {
        const userOfPost = await userRepository.findUser(userOfPost_id);
        const follower = await userRepository.findUser(userId);

        if(!userOfPost && !follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!userOfPost.followers.includes(userId) && (userOfPost_id != userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        const start_index = (page-1) * page_size;
        
        let postsToDisplay = {};
        if(userOfPost.posts.length>0)
        {
            postsToDisplay = await userRepository.pagination(userOfPost_id , start_index , page_size); 
        }

        return postsToDisplay;
        
    }

    async getPostById(userId,postId)
    {
        const follower = await userRepository.findUser(userId);
        const getPost = await postRepository.findPost(postId);

        if(!follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!getPost)
        {
            throw new CustomError("Post not found",404);
        }


        const userOfPost_id = getPost.post_user;
        const userOfPost = await userRepository.findUser(userOfPost_id);
              
        if(!userOfPost.followers.includes(userId) && (userOfPost_id != userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        return getPost;
    }

}
module.exports = {PostService};