const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.updateUser = async (req, res) => {
    try {
        let userId = req.params.id
        let findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(404).json({
                status: 0,
                message: "User with id ${userId} does not exist."
            })
        }
        let {
            username,
            birthday,
            address
        } = req.body
        let UserUpdate = await User.findByIdAndUpdate(
            userId,
            {
                username: username,
                birthday: birthday,
                address: address
            },
            { new: true }
        )
        return res.status(200).json({
            status: 1,
            message: "Update User Success",
            user: UserUpdate
        })


    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while updating the user.',
            error: error.message // Thông điệp lỗi từ catch
        });
    }
}

/*exports.deleteUser = async (req, res) => {
    try {
        let userId = req.params.id
        let findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(404).json({
                status: 0,
                message: "User with id ${userId} does not exist."
            })
        }
        await User.findByIdAndDelete(userId)
        return res.status(200).json({
            status: 1,
            message: "Delete User Success"
        })

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'An error occurred while deleting the user.',
        });

    }
}

exports.getAllUser = async (req, res) => {
    try {

        let findUsers = await User.find({});
        return res.status(200).json({
            status: 1,
            message: "Get List User Success",
            listUser: findUsers
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

exports.getUserDetail = async (req, res) => {
    try {
        let userId = req.params.id
        let findUser = await User.findById(userId);

        if (!findUser) {
            return res.status(404).json({
                status: 0,
                message: "User with id ${userId} does not exist."
            })
        }
        return res.status(200).json({
            status: 1,
            message: "Get Detail User Success",
            User: findUser
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

exports.getProfile = async (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(404).json({
            status: 3,
            message: "User not exits"
        })
    }
    else {
        res.status(200).json({
            status: 1,
            message: "Get information success",
            user: user,
        })
    }
}*/

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
            status: 0,
            message: 'Please enter complete information ',
        });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            status: 0,
            message: "New password and confirmation do not match."
        })
    }
    const userChange = req.user
    const checkPassword = await bcrypt.compareSync(currentPassword, userChange.password)
    if (!checkPassword) {
        return res.status(401).json({
            status: 0,
            message: "Incorrect password"
        })
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPassword, salt);
    userChange.password = hash;
    await userChange.save();
    return res.status(200).json({
        status: 1,
        message: "Password changed successfully.",
    });
}



