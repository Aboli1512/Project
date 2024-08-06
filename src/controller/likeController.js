const {LikeService} = require("../service/likeService")
const likeService = new LikeService();

const likePostController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const {postId} = req.body;
        
        const msg = await likeService.likePost(userId,postId);
        res.status(200).json(msg);
    }  catch(error)
    {
        next(error);
    }
 
};

const likeCommentController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const {commentId} = req.body;
    
        const msg = await likeService.likeComment(userId,commentId);
        res.status(200).json(msg);
    }  catch(error)
    {
        next(error);
    }
 
};
module.exports = {likeController: {
    likePostController,
    likeCommentController
},
};