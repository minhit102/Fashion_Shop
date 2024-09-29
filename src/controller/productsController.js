const Room = require('../models/room');
const User = require('../models/user');
const Category = requỉe('../models/')
const categoriesService = require('../service/userService')


exports.createProduct = async (req, res) => {
    try {
        let {
            nameProduct,
            category_id,
            price,
            brand,
            description,
            image,
            countInStock
        } = req.body;

        const findCategory = categoriesService(category_id);
        if (!findCategory) {
            return res.status(404).json({
                status: 0,
                message: "Category not exits"
            })
        }
        return res.status(404).json({
            status: 0,
            message: "Category not exits"
        })
    }
    catch (error) {
        return res.status(404).json({
            status: 0,
            message: "Category not exits"
        })
    }
}

