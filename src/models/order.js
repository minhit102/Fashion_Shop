const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    OrderItems: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
    }],
    coupon_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash', 'Bank']
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 30000
    },
    totalPrice: {
        type: Number,
        required: true
    },
    statusOrder: { // Trang thai giao hang
        type: String,
        enum: ['Pending', 'Shipped', 'Completed', 'Canceled', "Returned"],
        default: 'Pending'
    },
    deliveredAt: {
        type: Date
    },
    dateOrder: {
        type: Date,
        required: true

    }
})

// Tạo model từ schema
const Order = mongoose.model('Order', orderSchema);

// Xuất model
module.exports = Order;
