
const Hotel = require('../models/hotel')
const ServerExpection = require('../utils/ServerExpection')
exports.createHotel = async (req, res) => {
    try {
        const {
            name,
            type,
            city,
            address,
            distance,
            photo,
            desc,
            rating,
            rooms,
            cheapstPrice,
            feature
        } = req.body


        const newHotel = await Hotel.create({
            name: name,
            type: type,
            city: city,
            address: address,
            distance: distance,
            photo: photo,
            desc: desc,
            rating: rating,
            rooms: rooms,
            cheapstPrice: cheapstPrice,
            feature: feature
        })
        res.status(200).json({
            status: 1,
            message: "Create Hotel Success",
            hotel: newHotel
        })

    }
    catch (error) {
        return next(new ServerExpection(error))
    }
}

exports.getAllHotel = async (req, res) => {
    try {
        const allHotel = await Hotel.find({});
        res.status(200).json({
            status: 1,
            message: 'Get all hotel success',
            hotel: allHotel
        })
    }
    catch (error) {
        return next(new ServerExpection(error))
    }


}

exports.getDetailHotel = async (req, res) => {
    try {
        const idHotel = req.params.id;
        const hotelFind = await Hotel.findById(idHotel);
        if (!hotelFind) {
            res.status(404).json({
                status: 3,
                message: "Not found hotel !!!",

            })
        }
        else {
            res.status(200).json({
                status: 1,
                message: "Get detail hotel success!",
                hotel: hotelFind
            })

        }

    }
    catch (error) {
        return next(new ServerExpection(error))
    }
    
}