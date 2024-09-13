const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Liên kết với User schema
        required: true,
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room', // Liên kết với Room schema
        required: true,
    },

    check_in_date: {
        type: Date,
        required: true,
    },
    check_out_date: {
        type: Date,
        required: true,
    },
    number_of_people: {
        type: Number,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending',
    },
    special_requests: {
        type: String,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
