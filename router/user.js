const express = require('express')
const userCtrl = require('../contorller/user')

const router = express.Router()
// 用户登录
router.post('/users/login', userCtrl.login)
// 用户注册
router.post('/users', userCtrl.register)
// 获取当前登录用户
router.get('/user', userCtrl.getCurrentUser)
// 更新当前登录用户
router.put('/user', userCtrl.updateCurrentUser)
// 邮箱验证
router.get('/user/email', userCtrl.getcode)

module.exports = router