const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    birthday: {
        day: {
            type: Number
        },
        month: {
            type: Number
        },
        year: {
            type: Number
        }
    },
    role: {
        type: String,
        enum: ['sale', 'admin', 'user'],
        required: true
    },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);
module.exports = User;