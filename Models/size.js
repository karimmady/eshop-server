const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
    Email:{
        type: String,
        unique: true
    },
    height:{
        type: String
    },
    Tshirt:{
        type: String
    },
    shoeSize:{
        type: String
    },
    pantsSize:{
        type: String
    },
    points:{
        type: String
    }

});
module.export= mongoose.model('size', sizeSchema)