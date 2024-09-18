const mongoose = require('mongoose');
const { Schema } = mongoose;
const RoomTypeSchema = new mongoose.Schema({
    type_name: {
        type: String,
        required: true,
        unique: true, // Đảm bảo không có loại phòng nào trùng lặp
        trim: true, // Xóa khoảng trắng ở đầu và cuối
    },
    description: {
        type: String,
        required: true,
    },
    max_guests: {
        type: Number,
        required: true,
        min: 1,
    },
})

const RoomType = mongoose.model('RoomType', RoomTypeSchema);
module.exports = RoomType;