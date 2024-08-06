const {CommentRepository} = require("../repository/commentRepository");
const {UserRepository} = require("../repository/userRepository");
const {PostRepository} = require("../repository/postRepository");
const {CustomError} = require("../middleware/error");
const comment = require("../models/comment");
const userRepository = new UserRepository();
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();

class CommentService {

    async commentPost(userId, postId , content) {
        try {
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

            const newComment = new comment ({comment_user : userId , postToComment : postId , content });
            await newComment.save();
            getPost.comments.push(newComment._id);
            await getPost.save();

            return newComment;

        } catch (error) {
          console.log("Someting went wrong at service layer");
          throw { error };
        }
      }

      async commentOnComment(userId, commentId , content) {
        try {
            const userToComment = await userRepository.findUser(userId);
            const getComment = await commentRepository.findComment(commentId);

        if(!userToComment)
        {
            throw new CustomError("User not found",404);
        }

        if(!getComment)
        {
            throw new CustomError("Post not found",404);
        }

        const newComment = new comment ({comment_user : userId , commentOnWhichCommented : commentId , content });
        await newComment.save();
        getComment.commentOncomment.push(newComment._id);
        await getComment.save();

        return newComment;

        } catch (error) {
          console.log("Someting went wrong at service layer");
          throw { error };
        }
      }
}

module.exports = {CommentService};