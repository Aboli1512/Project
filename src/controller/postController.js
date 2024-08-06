const {PostService} = require("../service/postService")
const postService = new PostService();

// CREATE POST
const createPostController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const{postContent} = req.body;
        const inp_password = req.body.password;
        const data = req.file;

        const newPost = await postService.createPost(userId,postContent,inp_password,data);
        res.status(201).json({message : "Post created successfully" , post : newPost});

    }  catch(error)
    {
        next(error);
    }
};

//GET IDS OF ALL POSTS
const getAllPostsIdsController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const userOfPost_id = req.body._id;

        const userOfPost = await postService.getPostIDs(userId,userOfPost_id);
        res.status(200).json(userOfPost.posts);

    }  catch(error)
    {
        next(error);
    }

};

//PAGINATION ON TWEETS
const getSomePostsController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const userOfPost_id = req.body._id;
        const {page, page_size} = req.body;

        const postsToDisplay = await postService.getSomePosts(userId,userOfPost_id,page,page_size);

        res.status(200).json(postsToDisplay);

    }  catch(error)
    {
        next(error);
    }

};
const getPostController = async(req,res,next) => {
    try {
        const {userId} = req.params;
        const {postId} = req.body;
    
        const getPost = await postService.getPostById(userId,postId);
        res.status(200).json(getPost);

    }  catch(error)
    {
        next(error);
    }

};

module.exports = {postController: {
    createPostController,
    getAllPostsIdsController,
    getSomePostsController,
    getPostController
},
};