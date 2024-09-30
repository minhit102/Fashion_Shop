const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
const productsController = require('../controller/productsController')
const { uploadImage } = require('../middleware/uploadImage')
router.post(
    '/create-product',
    //AuthenToken.authenToken(["Admin", "Sale"]),
    uploadImage.single('mainImage'),
    productsController.createProduct);

router.put('/update-product/:productId',
    //AuthenToken.authenToken(["Admin", "Sale"]),
    uploadImage.single('mainImage'),
    productsController.updateProduct);


/*router.get('/get-all-product',
    AuthenToken.authenToken(["Admin", "Sale", "User"]),
    productsController.getAllProduct)

router.get('/detail/:id',
    AuthenToken.authenToken(["Admin", "Sale", "User"]),
    productsController.getDetailProduct)
*/


module.exports = router