
const Category = require('../models/categories.js')
const categoriesService = require('../service/userService')


exports.createProduct = async (req, res) => {
    try {
        let pathProductImage;
        if (!req.file) {
            pathAvatar = 0;
        }
        else {
            pathProductImage = `http://localhost:${process.env.PORT}/api/uploads/mainImage/${req.file.filename}`
        };
        let {
            nameProduct,
            category_id,
            price,
            brand,
            description,
            image,
            countInStock
        } = req.body;

        //const findCategory = categoriesService(category_id);
        /*if (!findCategory) {
            return res.status(404).json({
                status: 0,
                message: "Category not exits"
            })
        }*/
        res.status(200).json({
            status: 0,
            message: "Create product success",
            imageUrl: pathProductImage,
            name: nameProduct
        })
    }
    catch (error) {
        return res.status(404).json({
            status: 0,
            message: "Error creat product"
        })
    }

}

