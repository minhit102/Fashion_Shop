
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
        console.error('Error updating user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while updating the user.',
            error: error.message // Thông điệp lỗi từ catch
        });
        
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
        console.error('Error geting list user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while geting list user.',
            error: error.message // Thông điệp lỗi từ catch
        });
        
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
        console.error('Error updating user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while geting the detail hotel.',
            error: error.message // Thông điệp lỗi từ catch
        });
        
    }

}

exports.updateHotel = async (req, res) => {
    try {
        let hotelId = req.params.id
        let findHotel = await Hotel.findById(hotelId);
        if (!findHotel) {
            return res.status(404).json({
                status: 0,
                message: "Hotel with id does not exist."
            })
        }
        let {
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
        let HotelUpdate = await Hotel.findByIdAndUpdate(
            hotelId,
            {
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
            },
            { new: true }
        )
        return res.status(200).json({
            status: 1,
            message: "Update User Success",
            hotel: HotelUpdate
        })


    } catch (error) {
        console.error('Error updating hotel :', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while updating the hotel.',
            error: error.message // Thông điệp lỗi từ catch
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let hotelId = req.params.id
        let findHotel = await User.findById(hotelId);
        if (!findHotel) {
            return res.status(404).json({
                status: 0,
                message: "Hotel does not exist."
            })
        }
        await User.findByIdAndDelete(hotelId)
        return res.status(200).json({
            status: 1,
            message: "Delete Hotel Success"
        })

    } catch (error) {
        //console.error('Error deleting user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while deleting the hotel.',
            //error: error.message // Thông điệp lỗi từ catch
        });

    }
}