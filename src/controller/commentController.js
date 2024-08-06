const {CommentService} = require("../service/commentService")
const commentService = new CommentService();

const commentPostController = async(req,res,next) => { 
    try {
        const {userId} = req.params;
        const {postId , content} = req.body;
        
        const newComment = await commentService.commentPost(userId, postId , content);
        res.status(200).json({data : newComment,
            message :"Commented Successfully"}
        );
    }  catch(error)
    {
        next(error);
    }

};

const commentOnCommentController = async(req,res,next) => { 
    try {
        const {userId} = req.params;
        const {commentId , content} = req.body;
        
        const newComment = await commentService.commentOnComment(userId, commentId , content);
        res.status(200).json(newComment);
    }  catch(error)
    {
        next(error);
    }

};
module.exports = {commentController: {
    commentPostController,
    commentOnCommentController
},
};