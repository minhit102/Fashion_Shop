const express = require('express');
const router = express.Router();
//const config = require('config');
const authController = require('../controller/authController');
const authenToken = require('../middleware/authorization')

router.post('/register', authController.createUser)
router.post('/login', authController.login)
router.post('/logout', authenToken.authenToken(["User", "Admin", "Sale"]), authController.logout)
router.post('/uploads', authController.uploads)
module.exports = router;
