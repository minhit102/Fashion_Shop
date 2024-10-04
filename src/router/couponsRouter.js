const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const couponsController = require('../controller/couponsController')

router.post('/add-coupons',
    //AuthenToken.authenToken(["Admin", "Sale"]),
    couponsController.creatCoupons);

/*router.put('/update/:id',
    AuthenToken.authenToken(["Admin", "Sale"]),
    couponsController.updateCoupons);

router.get('/get-coupons',
    AuthenToken.authenToken(["User", "Admin", "Sale"]),
    couponsController.getCoupons);

router.get('/get-detail/id',
    AuthenToken.authenToken(["User", "Admin", "Sale"]),
    couponsController.getCouponDtail);*/

module.exports = router;