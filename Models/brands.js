const mongoose = require("mongoose");
const brandsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    address:[],
    items:[]
});
module.export= mongoose.model('brands', brandsSchema)