const express = require('express');
const router = express.Router();
//const config = require('config');
const authController = require('../controller/authController')

router.post('/register' , authController.createUser )
router.post('/login' , authController.login )

module.exports = router;
