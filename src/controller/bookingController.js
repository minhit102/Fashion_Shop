const Room = require('../models/room');
const User = require('../models/user');
const Booking = require('../models/booking')


exports.createBooking = async (req, res) => {
    try {
        let {
            room_id,
            check_in_date,
            check_out_date,
            number_of_people,
            total_price,
            special_requests
        } = req.body;
        let user = req.user._id
        console.log("Minh : " + user);


        if (!Date.parse(check_in_date) || !Date.parse(check_out_date)) {
            return res.status(400).json({
                status: 1,
                message: 'Invalid date format.'
            });
        }

        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        if (checkIn >= checkOut) {
            return res.status(400).json({
                status: 0,
                message: 'Check-out date must be after check-in date.'
            });
        }
        let findUser = await User.findById(req.user._id);
        if (!findUser) {
            return res.status(404).json({
                status: 3,
                message: "User does not exist."
            })
        }

        let findRoom = await Room.findById(room_id);
        if (!findRoom) {
            return res.status(404).json({
                status: 3,
                message: "Room does not exist."
            })
        }

        const bookingRoom = await Booking.find({
            room_id: room_id,
            $or: [
                { check_in_date: { $lt: checkOut }, check_out_date: { $gt: checkIn } },
                { check_in_date: { $lte: checkIn }, check_out_date: { $gte: checkOut } }
            ]
        })

        if (bookingRoom.length > 0) {
            return res.status(404).json({
                status: 0,
                message: 'Room is no longer available for the selected dates.'
            });
        }

        console.log("minh");
        const bookRoom = await Booking.create({
            user_id: req.user._id, // Ví dụ về cách lấy thông tin người dùng
            room_id: room_id,
            check_in_date: checkIn,
            check_out_date: checkOut,
            number_of_people: number_of_people,
            total_price: total_price,
            status: 'pending',
            special_requests: special_requests,
        })

        return res.status(200).json({
            status: 1,
            message: "Request Booking success"
        })


    }
    catch (error) {
        console.error('Error Create room :', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(404).json({
            status: 0,
            message: 'An error occurred while creating  the room.',
            error: error.message // Thông điệp lỗi từ catch
        });


    }
}

/*exports.updateRoom = async (req, res) => {
    try {
        let roomId = req.params.id;

        // Tìm phòng theo ID
        let findRoom = await Room.findById(roomId);
        if (!findRoom) {
            return res.status(404).json({
                status: 0,
                message: `Room with id ${roomId} does not exist.`
            });
        }

        // Lấy thông tin từ request body
        let {
            title,
            hotel_id,
            price,
            desc,
            maxPeople,
            photo,
            rating,
            roomNumber
        } = req.body;

        // Tìm khách sạn theo ID để xác nhận tồn tại
        let findHotel = await Hotel.findById(hotel_id);
        if (!findHotel) {
            return res.status(404).json({
                status: 3,
                message: "Hotel doesn't exist"
            });
        }

        // Cập nhật thông tin phòng
        let updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                title,
                hotel_id,
                price,
                desc,
                maxPeople,
                photo,
                rating,
                roomNumber
            },
            { new: true } // Để trả về đối tượng phòng đã được cập nhật
        );

        // Trả về phản hồi thành công
        return res.status(200).json({
            status: 1,
            message: "Update Room Success",
            room: updatedRoom // Sửa lại từ `user` thành `room` để khớp với dữ liệu
        });
    } catch (error) {
        console.error('Error updating room:', error.message); // Ghi lại lỗi để phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while updating the room.',
            error: error.message // Thông điệp lỗi từ catch
        });
    }
};


exports.deleteRoom = async (req, res) => {
    try {
        let roomId = req.params.id
        let findRoom = await Room.findById(roomId);
        if (!findRoom) {
            return res.status(404).json({
                status: 0,
                message: "Room with id ${roomId} does not exist."
            })
        }
        await User.findByIdAndDelete(roomId)
        return res.status(200).json({
            status: 1,
            message: "Delete User Success"
        })

    } catch (error) {
        //console.error('Error deleting user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while deleting the room.',
            //error: error.message // Thông điệp lỗi từ catch
        });
    }
}

exports.getRoomDetail = async (req, res) => {
    try {
        let roomId = req.params.id
        let findRoom = await Room.findById(roomId);

        if (!findRoom) {
            return res.status(404).json({
                status: 0,
                message: "Room with id ${roomId} does not exist."
            })
        }
        return res.status(200).json({
            status: 1,
            message: "Get Detail User Success",
            Room: findRoom
        })


    } catch (error) {
        console.error('Error get list user:', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while get list the user.',
            error: error.message // Thông điệp lỗi từ catch
        });

    }
}*/
