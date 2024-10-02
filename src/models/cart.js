const mongoose = require('mongoose');

// Định nghĩa schema cho giỏ hàng
const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Thêm required nếu muốn đảm bảo người dùng phải có
    },
    cartItems: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Liên kết đến model Product
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        status: {
            type: Boolean,
            default: true // Nếu default = false thì sản phẩm không có sẵn
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Cart = mongoose.model('Cart', cartSchema);

// Xuất model
module.exports = Cart;
