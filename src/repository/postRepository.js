const post = require("../models/post");

class PostRepository{
    async findPost(postId)
    {
        try {
            return await post.findById(postId);
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    }
}

module.exports = { PostRepository };