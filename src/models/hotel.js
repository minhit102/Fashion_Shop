const mongoose = require('mongoose');
const {Schema} = mongoose;
const HotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        required : true,
    },
    city : {
        type : String ,
        required  : true,
    },
    address : {
        type : String,
        require : true,
    },
    distance : {
        type : String,
        required : true,
    },
    photo : {
        type : [String],
    },
    desc : {
        type : String,
        required : true,
    },
    rating : {
        type : Number,
        min : 0 ,
        max : 5,
    },
    rooms : {
        type : [String],
    },
    cheapstPrice : {
        type : Number,
        required : true,
    },
    feature : {
        type : Boolean,
        default : false,
    }
})

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;