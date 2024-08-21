const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
/*const bookingController = require('../controller/bookingController')
router.post('/create-booking', AuthenToken.authenToken("sale"), bookingController.createbooking);
router.put('/update-booking/:id',AuthenToken.authenToken("admin") , bookingController.updatebooking);
router.get('/get-all-booking',AuthenToken.authenToken("sale"),bookingController.getAllbooking )
router.get('/detail/:id',bookingController.getDetailbooking)*/
module.exports = router