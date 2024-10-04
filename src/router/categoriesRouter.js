const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const roomController = require('../controller/roomController')
router.post('/create', AuthenToken.authenToken(["Admin", "Sale"]), roomController.createRoom);
router.put('/update/:id', AuthenToken.authenToken(["Admin", "Sale"]), roomController.updateRoom);
router.delete('/delete/:id', AuthenToken.authenToken(["Admin", "Sale"]), roomController.deleteRoom)
router.get('/detail/:id', AuthenToken.authenToken(["Admin", "Sale"]), roomController.getRoomDetail)
module.exports = router;