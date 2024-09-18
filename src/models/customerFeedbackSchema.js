const mongoose = require('mongoose');

const customerFeedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến schema User
        required: true,
    },
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Tham chiếu đến schema Hotel
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Tối thiểu 1 sao
        max: 5, // Tối đa 5 sao
    },
    created_at: {
        type: Date,
        default: Date.now, // Ngày tạo tự động lấy thời gian hiện tại
    },
});

// Tạo model từ schema
const CustomerFeedback = mongoose.model('CustomerFeedback', customerFeedbackSchema);

module.exports = CustomerFeedback;
