const mongoose = require('mongoose');
const { Schema } = mongoose;
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    hotel_id : {
        type : String,
        required : true
    },
    price: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: Number,
        require: true,
    },
    roomNumber: {
        type: Number,
        required: true,
    },
    photo: {
        type: [String],
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
},
    {
        timestamps: true
    }
)

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;