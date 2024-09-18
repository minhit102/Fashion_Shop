const mongoose = require('mongoose');

const hotelFacilitySchema = new mongoose.Schema({
    hotel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    facility_name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});
const HotelFacility = mongoose.model('HotelFacility', hotelFacilitySchema);

module.exports = HotelFacility;
