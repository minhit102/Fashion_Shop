
const categoriesService = require('../service/userService')
const Product = require('../models/products')


exports.createProduct = async (req, res) => {
    try {
        let pathProductImage;
        if (!req.file) {
            pathProductImage = 0;
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
            countInStock,
        } = req.body;

        const productData = {
            nameProduct,
            category_id,
            price,
            brand,
            description,
            countInStock
        };
        if (pathProductImage) {
            productData.imageURL = pathProductImage;
        }
        const product = await Product.create(productData);

        res.status(200).json({
            status: 0,
            message: "Create product success",
            product: product
        });
    }
    catch (error) {
        console.log("erroe :" + error)
        return res.status(404).json({
            status: 0,
            message: "Error creat product",
        })
    }

}

