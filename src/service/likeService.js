const {CustomError} = require("../middleware/error");
const {UserRepository} = require("../repository/userRepository");
const {PostRepository} = require("../repository/postRepository");
const {CommentRepository} = require("../repository/commentRepository");
const userRepository = new UserRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();

class LikeService {
    async likePost(userId,postId)
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
              
        if(!userOfPost.followers.includes(userId))
        {
            throw new CustomError("You don't follow the given user",400);            
        }

        if(getPost.likes.includes(userId))
        {
            throw new CustomError("You already liked the given post",400);
        }
        
        getPost.likes.push(userId);
        await getPost.save();

        return "Liked The Post";
    }

    async likeComment(userId,commentId)
    {
        const follower = await userRepository.findUser(userId);
        const getComment = await commentRepository.findComment(commentId);

        if(!follower)
        {
            throw new CustomError("User not found",404);
        }

        if(!getComment)
        {
            throw new CustomError("Comment not found",404);
        }

        if(getComment.likes.includes(userId))
        {
            throw new CustomError("You already liked the given commment",400);
        }
        
        getComment.likes.push(userId);      
        await getComment.save();

        return "Liked the Comment";
        
    }
}

module.exports = {LikeService};