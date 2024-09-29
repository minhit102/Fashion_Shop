const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
const productsController = require('../controller/productsController')



router.post('/create-product', AuthenToken.authenToken(["Admin", "Sale"]), productsController.createProduct);
router.put('/update-product/:id', AuthenToken.authenToken(["Admin", "Sale"]), productsController.updateProduct);
router.get('/get-all-product', AuthenToken.authenToken(["Admin", "Sale", "User"]), productsController.getAllProduct)
router.get('/detail/:id', AuthenToken.authenToken(["Admin", "Sale", "User"]), productsController.getDetailProduct)
router.get('/get-all-product')
module.exports = router