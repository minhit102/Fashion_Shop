const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.authenToken = (roles) => {
    return async (req, res, next) => {
        try {
            const authorizationHeader = req.headers['authorization'];
            if (!authorizationHeader) {
                return res.status(401).json({
                    status: 0,
                    message: "Authorization token is missing or invalid"
                });
            }

            const [scheme, token] = authorizationHeader.split(' ');
            if (scheme !== 'Bearer' || !token) {
                return res.status(401).json({
                    status: 0,
                    message: "Invalid authorization header format"
                });
            }

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
                if (err) {
                    return res.status(401).json({
                        status: 0,
                        message: "Invalid or expired token"
                    });
                }

                // Check user role
                if (!roles.includes(data.role)) {
                    return res.status(403).json({
                        status: 0,
                        message: "User does not have access"
                    });
                }
                console.log(data)
                // Find user
                const userAuthen = await User.findById(data._id);
                if (!userAuthen) {
                    return res.status(404).json({
                        status: 0,
                        message: "User not found"
                    });
                }

                // Attach user to request object and proceed
                req.user = userAuthen;
                next();
            });
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(500).json({
                status: 0,
                message: "Internal server error"
            });
        }
    }
}
