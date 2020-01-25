const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema({
    Email:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    items:[],
    status:{
        type:String
    },
    total:{
        type:String,
        required:true
    }
});
module.export= mongoose.model('orders', ordersSchema)