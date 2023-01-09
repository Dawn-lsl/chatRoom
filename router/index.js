const express = require('express')

const router = express.Router()

//用户相关路由
router.use(require('./user'))

//聊天室相关路由
router.use(require('./chatRoom'))

//频道组相关路由
router.use(require('./channelGroup'))

//频道相关路由
router.use(require('./channel'))

//好友相关路由
router.use(require('./friend'))

module.exports = router