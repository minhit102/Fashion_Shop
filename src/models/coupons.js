const mongoose = require('mongoose');
const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    minOrderValue: {
        type: Number,
        default: 0 // Giá trị tối thiểu của đơn hàng để áp dụng mã
    },
    maxDiscount: {
        type: Number, // Giảm giá tối đa (nếu loại là percentage)
        default: null
    },
    usageLimit: {
        type: Number, // Số lần sử dụng tối đa
        default: null
    },
    usedCount: {
        type: Number, // Số lần đã sử dụng
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    validStart: {
        type: Date,
        required: true
    },
    validEnd: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Coupon = mongoose.model('Coupon', couponSchema);

// Xuất model
module.exports = Coupon;

