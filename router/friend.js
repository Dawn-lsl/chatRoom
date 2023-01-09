const express = require('express')
const friendCtrl = require('../contorller/friend')
const friendValidator = require('../validator/friend')
const auth = require('../middleware/auth')

const router = express.Router()
// 好友列表
router.get('/friend', auth, friendCtrl.FriendList)

module.exports = router