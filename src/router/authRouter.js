const express = require('express');
const router = express.Router();
//const config = require('config');
const authController = require('../controller/authController');
const authenToken = require('../middleware/authorization')

router.post('/register', authenToken.authenToken("sale") , authController.createUser )
router.post('/login', authController.login )

module.exports = router;
