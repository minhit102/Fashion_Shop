const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const orderController = require('../controller/orderController')
router.post('/creatOrder', AuthenToken.authenToken("User"), orderController.creatOrder);
//router.post('/editOrder', AuthenToken.authenToken("User"), orderController.editOrder);
//router.post('/cancelOrder', AuthenToken.authenToken("User"), orderController.cancelOrder);
module.exports = router;