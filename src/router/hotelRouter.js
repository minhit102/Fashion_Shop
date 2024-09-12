const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const hotelController = require('../controller/hotelController')
router.post('/create-hotel', AuthenToken.authenToken("admin"), hotelController.createHotel);
router.put('/update-hotel/:id', AuthenToken.authenToken("admin"), hotelController.updateHotel);
router.get('/get-all-hotel', AuthenToken.authenToken(["user", "admin", "sale"]), hotelController.getAllHotel)
router.get('/detail-hotel/:id', hotelController.getDetailHotel)
module.exports = router;