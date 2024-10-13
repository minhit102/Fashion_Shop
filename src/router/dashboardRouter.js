const express = require('express');
const router = express.Router();
//const config = require('config');
const dashboardController = require('../controller/dashboardController');
const authenToken = require('../middleware/authorization')
//Thông tin tổng quan 
router.get('/overview', authenToken.authenToken(["Admin", "Sale"]), dashboardController.getOverView)

router.get('/top-products', authenToken.authenToken(["Admin", "Sale"]), dashboardController.getTopProduct)
router.get('/recent-orders', authenToken.authenToken(["Admin", "Sale"]), authController.getRecentOrder)
module.exports = router;
