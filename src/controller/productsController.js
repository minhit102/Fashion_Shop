
const categoriesService = require('../service/categoriesService')
const Product = require('../models/products')
const fs = require('fs')
const path = require('path')
const sortProduct = require('../utils/sortProduct')

exports.createProduct = async (req, res) => {
    try {
        const pathProductImage = req.file
            ? `http://localhost:${process.env.PORT}/api/uploads/mainImage/${req.file.filename}`
            : null;
        const {
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
            countInStock,
            ...(pathProductImage && { imageURL: pathProductImage }) // Conditionally add imageURL
        };


        const product = await Product.create(productData);

        res.status(201).json({
            status: 1,
            message: "Create product success",
            product,
        });
    } catch (error) {
        console.error("Error creating product:", error); // More informative logging
        return res.status(500).json({
            status: 0,
            message: "Error creating product",

        });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId)
        const {
            nameProduct,
            category_id,
            price,
            brand,
            description,
            countInStock,
        } = req.body
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product not exits",
            });
        }
        const updatedData = {
            nameProduct,
            category_id,
            price,
            brand,
            description,
            countInStock,
        };
        if (req.file) {
            if (product.imageURL) {
                const oldImagePath = path.join(__dirname, '../uploads/mainImage/', path.basename(product.imageURL));
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error("Lỗi khi xóa hình ảnh cũ:", err);
                });
            }
            updatedData.imageURL = `http://localhost:${process.env.PORT}/api/uploads/mainImage/${req.file.filename}`;
        }
        else {
            updatedData.imageURL = product.imageURL;
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        res.status(200).json({
            status: 1,
            message: "Update product success",
            product: updatedProduct,
        });

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 0,
            message: "Error update product ",

        });
    }
};
exports.getProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const category_id = parseInt(req.query.category_id)
        const sort = req.query.sort


        let filterProduct = await Product.find({ category_id: category_id });
        filterProduct = sortProduct(filterProduct, sort);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const listproduct = filterProduct.slice(startIndex, endIndex);
        res.status(200).json({
            status: 1,
            page,
            limit,
            product: listproduct
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 0,
            message: "Get product fail",
        });
    }
};
exports.getDetailProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                status: 0,
                message: "Product not exits"
            })
        }
        res.status(200).json({
            status: 1,
            message: "Get detail success",
            product: product
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: 0,
            message: "Error get detail Product"
        })
    }
};


