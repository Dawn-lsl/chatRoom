const express = require('express')
const chatRoomCtrl = require('../contorller/chatRoom')
const chatRoomValidator = require('../validator/chatRoom')
const auth = require('../middleware/auth')

const router = express.Router()
// 获取当前用户聊天室列表
router.get('/chatRoom', auth, chatRoomCtrl.getUserChatRoomList)
// 获取聊天室列表
router.get('/chatRoomList', auth, chatRoomCtrl.getChatRoomList)
// 获取聊天室成员列表
router.get('/chatRoom/member/:roomId', auth, chatRoomCtrl.getChatRoomMember)
// 创建聊天室
router.post('/chatRoom', auth, chatRoomValidator.createChatRoom, chatRoomCtrl.createChatRoom)
// 删除聊天室
router.delete('/chatRoom', auth, chatRoomValidator.deleteChatRoom, chatRoomCtrl.deleteChatRoom)
module.exports = router