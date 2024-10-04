const Cart = require('../models/cart');
const Product = require('../models/products');
const Coupon = require('../models/coupons')
const { isValidDate, compareDates } = require('../utils/checkValidate')

exports.creatCoupons = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minOrderValue,
            maxDiscount,
            usageLimit,
            validStart,
            validEnd
        } = req.body

        if (code == null ||
            discountType == null ||
            discountValue == null ||
            validStart == null ||
            validEnd == null) {
            return res.status(400).json({
                status: 0,
                message: "Lack of data in request body."

            })
        }

        const findCoupon = await Coupon.findOne({ code: code });
        if (findCoupon) {
            return res.status(409).json({
                status: 0,
                message: "Coupon code already exists"
            })
        }
        if (!isValidDate(validStart)) {
            return res.status(409).json({
                status: 0,
                message: "Invalid start date format"
            });
        }
        else if (!isValidDate(validStart)) {
            return res.status(409).json({
                status: 0,
                message: "Invalid end date format"
            });
        }
        else if (!compareDates(validStart, validEnd)) {
            return res.status(409).json({
                status: 0,
                message: "Start date after end date."
            })
        }
        const coupon = {
            code,
            discountType,
            discountValue,
            minOrderValue,
            maxDiscount,
            usageLimit,
            validStart,
            validEnd

        }

        if (discountType === "fixed") {
            coupon.maxDiscount = coupon.discountValue;
        }
        const newCoupon = await Coupon.create(coupon)
        res.status(200).json({
            status: 0,
            message: "Create Coupons Success",
            coupons: newCoupon
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            message: "Error creat coupon"
        })
    }

}


exports.updateCoupons = async (req, res) => {
    try {
        const id = req.params.id
        const findCoupon = await Coupon.findById(id);
        if (!findCoupon) {
            return res.status(409).json({
                status: 0,
                message: "Coupon not exists"
            })
        }
        const {
            code,
            discountType,
            discountValue,
            minOrderValue,
            maxDiscount,
            usageLimit,
            validStart,
            validEnd
        } = req.body

        if (code == null ||
            discountType == null ||
            discountValue == null ||
            validStart == null ||
            validEnd == null) {
            return res.status(400).json({
                status: 0,
                message: "Lack of data in request body."

            })
        }

        if (!isValidDate(validStart)) {
            return res.status(409).json({
                status: 0,
                message: "Invalid start date format"
            });
        }
        else if (!isValidDate(validStart)) {
            return res.status(409).json({
                status: 0,
                message: "Invalid end date format"
            });
        }
        else if (!compareDates(validStart, validEnd)) {
            return res.status(409).json({
                status: 0,
                message: "Start date after end date."
            })
        }
        const coupon = {
            code,
            discountType,
            discountValue,
            minOrderValue,
            maxDiscount,
            usageLimit,
            validStart,
            validEnd
        }

        if (discountType === "fixed") {
            coupon.maxDiscount = coupon.discountValue;
        }
        const newCoupon = await Coupon.findByIdAndUpdate(id, coupon, { new: true })
        res.status(200).json({
            status: 0,
            message: "Create Coupons Success",
            coupons: newCoupon
        })

    }
    catch (error) {
        res.status(500).json({
            status: 0,
            message: "Error creat coupon"
        })
    }

}