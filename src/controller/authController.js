const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmailExists } = require('../service/userService')
exports.createUser = async (req, res) => {
    try {
        let { username, email, password, role, phone, address } = req.body

        if (!email || !password || !username) {
            return res.status(400).json({
                status: 0,
                message: "Missing required fields"
            });
        }


        if (await isEmailExists(email)) {
            return res.status(409).json({
                status: 0,
                message: "Email already exists"
            })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);


        const user = await User.create({
            username: username,
            email: email,
            password: hash,
            phone: phone,
            address: address,
            role: role,
        })
        res.status(200).json({
            status: 1,
            message: "Creat User success",
            user: user
        })
    }
    catch (error) {
        res.status(500).json({ // Set the appropriate status code, e.g., 500 for Internal Server Error
            status: 4, // Custom status code (can be whatever you choose)
            message: error.message || "An unexpected error occurred." // Use error message or a default message
        });
    }
}


exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            res.status(404).json({
                status: 3,
                message: "Email not found."
            })
        }
        else {
            const checkPassword = await bcrypt.compareSync(password, findUser.password)
            if (checkPassword) {
                const accessToken = jwt.sign({
                    _id: findUser._id,
                    role: findUser.role
                },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '15m'
                    });
                // Tạo Refresh Token
                const refreshToken = jwt.sign({
                    _id: findUser._id,
                    role: findUser.role
                },
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: '7d'
                    });
                res.status(200).json({
                    status: 1,
                    message: "Login successful.",

                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: findUser

                })
            }
            else {
                res.status(404).json({
                    status: 2,
                    message: "Incorrect password. Please try again",
                })
            }
        }
    }
    catch (error) {
        res.status(500).json({ // Set the appropriate status code, e.g., 500 for Internal Server Error
            status: 4, // Custom status code (can be whatever you choose)
            message: error.message || "An unexpected error occurred." // Use error message or a default message
        });
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header

        if (!token) {
            return res.status(400).json({
                status: 0,
                message: 'No token provided'
            });
        }

        res.status(200).json({
            status: 1,
            message: 'Logout successful'
        });
    }
    catch (error) {
        res.status(500).json({ // Set the appropriate status code, e.g., 500 for Internal Server Error
            status: 4, // Custom status code (can be whatever you choose)
            message: error.message || "An unexpected error occurred." // Use error message or a default message
        });
    }


}

exports.uploads = async (req, res) => {
    const { id, img } = req.body;
    res.status(200).json({
        status: 1,
        id: id,
        img: img
    })
}