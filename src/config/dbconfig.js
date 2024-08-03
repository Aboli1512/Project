const mongoose = require('mongoose');

const mongoConnect = async () =>
    {
        try
        {
            await mongoose.connect(process.env.MONGO_URL);
                
            console.log("Connected to Mongodb");         
            
        } 
        catch(err)
        {
            console.log("Error connecting to Mongodb : " , err);
        }
    };

module.exports = {mongoConnect};