const mongoose = require('mongoose');
const { Schema } = mongoose;

const Payment_Schema = new mongoose.Schema({
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    payment_date: {
        type: Date,
        required: true,
    },

    amount: {
        type: mongoose.Decimal128,
        required: true,
    },
    payment_method: {
        type: String,
        enum: ['credit_card', 'bank_transfer', 'cash'], // Các phương thức thanh toán cho phép
        required: true,
    },
}, { timestamps: true });

const Payment = mongoose.model('Payment', Payment_Schema);
module.exports = Payment;
