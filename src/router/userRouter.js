const express = require('express');
const router = express.Router();
//const config = require('config');
const userController = require('../controller/userController');
const authenToken = require('../middleware/authorization')

router.put('/update-user/:id',
    authenToken.authenToken(["User", "Sale", "Admin"]),
    userController.updateUser)

router.put('/change-password',
    authenToken.authenToken(["User", "Sale", "Admin"]),
    userController.changePassword
)

router.delete('/delete-user/:id',
    authenToken.authenToken(["Admin"]),
    userController.deleteUser)

router.get('/get-user',
    authenToken.authenToken(["User", "Sale", "Admin"]),
    userController.getUser)


router.get('/get-user-detail/:id',
    //authenToken.authenToken(["User", "Sale", "Admin"]),
    userController.getUserDetail)


router.get('/profile',
    authenToken.authenToken(["User", "Sale", "Admin"]),
    userController.getProfile)

module.exports = router;