const comment = require("../models/comment");

class CommentRepository{
    async findComment(id)
    {
        try {
            return await comment.findById(id);
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    }
}

module.exports = { CommentRepository };