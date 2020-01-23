const mongoose = require("mongoose");
const infoSchema = new mongoose.Schema({
    Email:{
        type: String,
        unique: true
    },
    address:{
        type: String,
        default:""
    }
});
module.export= mongoose.model('info', infoSchema)