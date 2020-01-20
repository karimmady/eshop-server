const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
    Email:{
        type: String
    },
    height:{
        type: Number
    },
    Tshirt:{
        type: String
    },
    shoeSize:{
        type: Number
    },
    pantsSize:{
        type: Number
    },
    points:{
        type: Number
    }

});
module.export= mongoose.model('size', sizeSchema)