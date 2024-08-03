const {User} = require("../models/user");
class userRepository
{
    async getById(id)
    {
        try{
            const user = await User.findById(id);
            
        } catch(err)
        {
            console.log("Something went wrong at repository level");
            throw(err);
        }
    }
}
module.exports = {userRepository};