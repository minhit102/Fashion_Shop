const express = require('express');
const router = express.Router();
//const config = require('config');
const hotelController = require('../controller/hotelController')

router.post('/create-hotel' , hotelController.createHotel )
router.get('/get-all-hotel',hotelController.getAllHotel )
router.get('/detail/:id',hotelController.getDetailHotel)
module.exports = router;