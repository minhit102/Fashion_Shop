
const Product = require('../models/products');
const Coupon = require('../models/coupons')
const Order = require('../models/order')
const { isValidDate, compareDates } = require('../utils/checkValidate')
const moment = require('moment');
exports.getOverView = async (req, res) => {
    const { dateRange, period } = req.body;
    const date = dateRange ? dateRange.slipt("_to_") : []
    const startDate = date[0] || '2024-01-01'
    const endDate = date[1] || moment(Date.now().format('YYYY-MM-DD'))
    const totalRevenue = await Order.aggregate([
        {
            $match: {
                createdAt: { $gte: startDate, $lte: endDate },
                isDelivered: "Delivered"
            }
        },
        {
            $group: {
                _id: null,
                totalRevenua: { $sum: "totalPrice" }
            }

        }
    ])




    try {


    }
    catch (error) {
        res.status(500).json({
            status: 0,
            message: "Error creat coupon"
        })
    }

}
