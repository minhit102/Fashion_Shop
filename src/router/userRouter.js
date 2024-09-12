const express = require('express');
const router = express.Router();
//const config = require('config');
const userController = require('../controller/userController');
const authenToken = require('../middleware/authorization')

router.put('/update-user/:id', authenToken.authenToken(["user", "sale", "admin"]), userController.updateUser)
router.delete('/delete-user/:id', authenToken.authenToken(["user", "sale", "admin"]), userController.deleteUser)
router.get('/get-all-user', /*authenToken.authenToken(["sale" , "admin"]), */userController.getAllUser)
router.get('/get-user-detail/:id', authenToken.authenToken(["user", "sale", "admin"]), userController.getUserDetail)
router.get('/profile', authenToken.authenToken(["user", "sale", "admin"]), userController.getProfile)
module.exports = router;