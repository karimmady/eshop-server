const mongoose = require("mongoose");
const userTokenSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Token:{
        type:String,
        required:true
    }
});
module.export= mongoose.model('userToken', userTokenSchema)