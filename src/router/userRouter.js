const express = require('express');
const router = express.Router();
//const config = require('config');
const userController = require('../controller/userController')

router.get('/create-user' , userController.createUser )
module.exports = router;