const mongoose = require('mongoose');


// Định nghĩa schema cho đơn hàng
const orderItemSchema = new mongoose.Schema({
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
    price: {
        type: Number,
        required: true
    },
});

// Định nghĩa schema cho đơn hàng
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết đến model User
        required: true
    },
    orderItems: [orderItemSchema], // Mảng các sản phẩm trong đơn hàng
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
        enum: ['Cash', 'Bank Transfer']
    },
    paymentResult: {
        status: {
            type: String,
            required: true
        },
        update_time: {
            type: Date,
            required: true
        },
        email_address: {
            type: String,
            required: true
        }
    },
    itemsPrice: { // Tông gia tri san phamr
        type: Number,
        required: true
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
    isPaid: { // Ngay thanh toan
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: { // Trang thai giao hang
        type: String,
        required: true,
        enum: ['Pending', 'In Transit', 'Delivered', 'Canceled'],

    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Order = mongoose.model('Order', orderSchema);

// Xuất model
module.exports = Order;
