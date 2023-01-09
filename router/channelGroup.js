const express = require('express')
const channelGroupCtrl = require('../contorller/channelGroup')
const channelGroupValidator = require('../validator/channelGroup')
const auth = require('../middleware/auth')

const router = express.Router()
// 新建频道组
router.post('/channelGroup', auth, channelGroupValidator.createChannelGroup, channelGroupCtrl.createChannelGroup)
// 删除频道组
router.delete('/channelGroup', auth, channelGroupValidator.deleteChannelGroup, channelGroupCtrl.deleteChannelGroup)
// 更新频道组
router.put('/channelGroup', auth, channelGroupValidator.updateChannelGroup, channelGroupCtrl.updateChannelGroup)
// 获取频道组列表
router.get('/channelGroup', auth, channelGroupValidator.getChannelGroupList, channelGroupCtrl.getChannelGroupList)
module.exports = router