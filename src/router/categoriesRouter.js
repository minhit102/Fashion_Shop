const express = require('express');
const router = express.Router();
const AuthenToken = require('../middleware/authorization')
//const config = require('config');
const roomController = require('../controller/roomController')
router.post('/create-room', AuthenToken.authenToken("admin"), roomController.createRoom);
router.put('/update-room/:id', AuthenToken.authenToken("admin"), roomController.updateRoom);
router.put('/update-isAvailable-Room/:id', AuthenToken.authenToken("admin"), roomController.updateisAvailableRoom);
router.delete('/delete/:id', AuthenToken.authenToken("admin"), roomController.deleteRoom)
router.get('/detail/:id', roomController.getRoomDetail)
module.exports = router;