const Order = require('../models/order')
const Product = require('../models/products');
const User = require('../models/user');
const Coupons = require('../models/coupons');
const mongoose = require('mongoose');
const Coupon = require('../models/coupons');

exports.creatOrder = async (req, res) => {
    try {
        const user = req.user;
        const userOrder = await User.findById(user._id);
        if (!userOrder) {
            return res.status(404).json({
                status: 0,
                message: "User not exits"
            })

        }
        const {
            OrderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            coupon_id
        } = req.body;
        let totalItem = 0;
        let totalPrice;
        const productIds = OrderItems.map((Item) => Item.product_id);
        const products = await Product.find({ _id: { $in: productIds } })
        for (let Item of OrderItems) {
            const product = products.find(p => p._id.toString() === Item.product_id)
            if (!product) {
                return res.status(404).json({
                    status: 0,
                    message: "Sản phẩm không tồn tại."
                });
            }
            if (product.countInStock < Item.quantity) {
                return res.status(409).json({
                    status: 0,
                    message: "Requested quantity exceeds available stock.",
                    availableStock: product.countInStock,
                })
            }
            totalItem += product.price * Item.quantity
        }
        let coupon_aplly = false;
        if (coupon_id) {
            const coupon = await Coupons.findById(coupon_id)
            if (
                !coupon.isActive ||
                Date.now() <= coupon.validStart ||
                Date.now() >= coupon.validEnd ||
                coupon.usageLimit === coupon.usedCount
            ) {
                res.status(400).json({
                    status: 0,
                    message: "The coupon code is either expired or has exceeded its usage limit."
                })
            }
            if (totalItem <= coupon.minOrderValue) {
                return res.status(422).json({
                    status: 0,
                    message: "Order value is insufficient to apply the discount code."
                })
            }
            let valueApply;
            if (coupon.discountType === 'percentage') {
                const value = totalItem * coupon.discountValue / 100
                valueApply = value >= coupon.maxDiscount ? coupon.maxDiscount : value
            }
            else if (coupon.discountType === 'fixed') {
                valueApply = coupon.discountValue;

            }
            coupon_aplly = true;
            totalPrice = Math.max(totalItem - valueApply + shippingPrice, 0)
        }
        else {
            totalPrice = totalItem + shippingPrice
        }
        const dateOrder = Date.now();
        const data = {
            user_id: user._id,
            OrderItems: OrderItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            shippingPrice: shippingPrice,
            dateOrder: dateOrder,
            totalPrice: totalPrice,
            coupon_id: coupon_id
        }
        const newOrder = new Order(data)
        for (let Item of OrderItems) {
            const product = await Product.findById(Item.product_id);
            if (!product || product.countInStock < Item.quantity) {
                return res.status(409).json({
                    status: 0,
                    message: "Requested quantity exceeds available stock.",
                    availableStock: product.countInStock,
                })
            }
            product.countInStock -= Item.quantity;
            await product.save();
        }
        if (coupon_aplly) {
            const coupon = await Coupon.findById(coupon_id);
            coupon.usedCount += 1;
            coupon.save()
        }
        await newOrder.save();
        res.status(200).json({
            status: 1,
            message: "Creat Order success ",
            order: newOrder
        })
    }
    catch (error) {
        res.status(500).json({
            status: 0,
            error: error
        })
    }
}
