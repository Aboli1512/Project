const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {CustomError} = require("../middleware/error");
const { UserRepository } = require("../repository/userRepository");
const userRepository = new UserRepository();

const user = require("../models/user");

class AuthService {

    async signUp(username , email , password , data) {
        const check = await userRepository.findAcc(username , email);
        if(check)
            {
                throw new CustomError("Username or email already existing. Not a unique info",400);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const newUser = new user({...data,password:hashedPassword});
            const addedUser= await newUser.save();
            return addedUser;
    }

    async login(data)
    {
        const inp_email = data.email;
        const inp_username = data.username;
        const inp_password = data.password;
        let inpUser;
            if(inp_email)
            {
                inpUser = await userRepository.findByemail(inp_email);
            }
            else
            {
                inpUser = await userRepository.findByName(inp_username);
            }

            if(!inpUser)
            {
                throw new CustomError("User not found",404);
            }

            const match = await bcrypt.compare(inp_password,inpUser.password);
            if(!match)
            {
                throw new CustomError("Wrong Credentials",401);
            }
            
            const token = jwt.sign({_id : inpUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_DATE});
            const userId = inpUser._id;

            return {token,userId};
    }

}
module.exports = {AuthService};