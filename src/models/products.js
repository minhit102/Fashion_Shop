const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: `http://localhost:${process.env.PORT}/api/uploads/default-product.png`
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Product = mongoose.model('Product', productSchema);

// Xuất model
module.exports = Product;