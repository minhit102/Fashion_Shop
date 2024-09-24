const mongoose = require('mongoose');

// Định nghĩa schema cho danh mục
const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Category = mongoose.model('Category', categorySchema);

// Xuất model
module.exports = Category;
