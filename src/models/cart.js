const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm trong giỏ hàng
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Liên kết đến model Product
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
});

// Định nghĩa schema cho giỏ hàng
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết đến model User
        required: true
    },
    cartItems: [cartItemSchema], // Mảng các sản phẩm trong giỏ hàng
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Cart = mongoose.model('Cart', cartSchema);

// Xuất model
module.exports = Cart;
