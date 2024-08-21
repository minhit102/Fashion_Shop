const User = require('../models/user')
const ServerExpection = require('../utils/ServerExpection')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.createUser = async (req, res) => {
    try {
        let { username, email, password, role ,birthday } = req.body
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const user = await User.create({
            username: username,
            email: email,
            password: hash,
            role: role,
            birthday : birthday
        })
        res.status(200).json({
            status: 1,
            message: "Creat User or Admin success",
            user: user
        })
    }
    catch (error) {
        console.log(error)
        //return next(new ServerExpection(error))
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
        console.log(error)
        //return next(new ServerExpection(error))
    }
}