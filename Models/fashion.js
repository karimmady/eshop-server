const mongoose = require("mongoose");
const fashionSchema = new mongoose.Schema({
    ID : {
        type:String
    },
    price : {
        type:String
    },
    Gender : {
        type:String
    },
    name : {
        type:String
    },
    description : {
        type:String
    },
    size : []
});
module.export= mongoose.model('fashion', fashionSchema)