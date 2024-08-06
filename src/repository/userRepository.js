const user = require("../models/user");

class UserRepository{
    async findUser(id)
    {
        try {
            return await user.findById(id);
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    } 

    async findAcc(username , email)
    {
        try {
            return await user.findOne({$or : [{username : username} , {email : email}]});
          } catch (error) {
            console.log("Someting went wrong at repository layer for signup");
            throw { error };
          }
    }

    async findByemail(email)
    {
        try {
            return await user.findOne({email : email});
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    }

    async findByName(username)
    {
        try {
            return await user.findOne({username : username});
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    }

    async findLastestPosts(inp_username)
    {
        try {
            const getUser = await user.findOne({username : inp_username}).populate(
                {
                    path : 'posts',
                    options : {
                        limit : 10,
                        sort : {createdAt : -1}
                    }
                });

              return getUser.posts;
          } catch (error) {
            console.log("Someting went wrong at repository layer");
            throw { error };
          }
    }

    async pagination(userOfPost_id, start_index , page_size)
    {
        const getUser = await user.findById(userOfPost_id).populate(
        {
            path : 'posts',
            options : {
            skip : start_index,
            limit : page_size,
            sort : {createdAt : -1}
            }
        });

        return getUser.posts;
    }
}

module.exports = { UserRepository };