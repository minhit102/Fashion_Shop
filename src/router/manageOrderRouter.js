const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const cartController = require('../controller/cartController')
router.get('/getCart', AuthenToken.authenToken("User"), cartController.getCart);
router.post('/addItem', AuthenToken.authenToken("User"), cartController.addItem);
module.exports = router;