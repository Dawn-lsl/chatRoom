const express = require('express')
const channelCtrl = require('../contorller/channel')
const channelValidator = require('../validator/channel')
const auth = require('../middleware/auth')

const router = express.Router()
// 创建频道
router.post('/channel', auth, channelValidator.createChannel, channelCtrl.createChannel)
// 删除频道
router.delete('/channel', auth, channelValidator.deleteChannel, channelCtrl.deleteChannel)
// 更新频道
router.put('/channel', auth, channelValidator.updateChannel, channelCtrl.updateChannel)


module.exports = router