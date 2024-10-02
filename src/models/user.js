const mongoose = require('mongoose');
// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    birthday: {
        type: Date,
    },
    role: {
        type: String,
        require: true,
        enum: ['User', 'Admin', 'Sale']
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;
