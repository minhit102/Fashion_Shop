const Room = require('../models/room');
const Hotel = require('../models/hotel');

exports.createRoom = async (req, res) => {
    try {
        let {
            title,
            hotel_id,
            price,
            desc,
            maxPeople,
            photo,
            rating,
            roomNumber
        } = req.body

        let findHotel = await Hotel.findById(hotel_id);
        if (!findHotel) {
            return res.status(404).json({
                status: 3,
                message: "Hotel does not exist."
            })
        }
        let newRoom = await Room.create({
            title: title,
            hotel_id: hotel_id,
            price: price,
            desc: desc,
            maxPeople: maxPeople,
            photo: photo,
            rating: rating,
            roomNumber: roomNumber
        })

        return res.status(200).json({
            status: 1,
            message: "Create Room Success",
            room: newRoom
        })
    }
    catch (error) {
        console.error('Error Create room :', error.message); // Log lỗi để phát hiện và phân tích

        // Trả về phản hồi lỗi
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while creating  the room.',
            error: error.message // Thông điệp lỗi từ catch
        });


    }
}

exports.updateRoom = async (req, res) => {
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
}


exports.updateisAvailableRoom = async (req, res) => {
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
            isAvailable
        } = req.body;


        let updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                isAvailable
            },
            { new: true } // Để trả về đối tượng phòng đã được cập nhật
        );

        // Trả về phản hồi thành công
        return res.status(200).json({
            status: 1,
            message: "Update isAvailable Room Success",
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
