const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true // Đảm bảo mã giảm giá là duy nhất
    },
    discount: {
        type: Number,
        required: true,
        min: 0 // Tối thiểu là 0%
    },
    isActive: {
        type: Boolean,
        default: true // Mặc định là true
    },
    validUntil: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Thời gian tạo mã
    }
});

// Tạo model từ schema
const Coupon = mongoose.model('Coupon', couponSchema);

// Xuất model
module.exports = Coupon;

