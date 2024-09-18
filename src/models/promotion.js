const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Tham chiếu đến schema Hotel
        required: true,
    },
    discount_percentage: {
        type: Number,
        required: true,
        min: 0, // Không được âm
        max: 100, // Không được vượt quá 100%
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.start_date; // Ngày kết thúc phải sau ngày bắt đầu
            },
            message: 'Ngày kết thúc phải sau ngày bắt đầu.',
        },
    },
    description: {
        type: String,
        trim: true,
    },
});

// Tạo model từ schema
const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
