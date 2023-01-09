const validate = require('../middleware/validate')
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createChatRoom = validate([
    body('roomId')
        .notEmpty().withMessage('聊天室号不能为空')
        .bail()
        .custom(async value => {
            const user = await prisma.chatRoom.findUnique({
                where:{
                    roomId: value
                }
            })
            if(user){
                return Promise.reject('聊天室号已存在,请重新输入聊天室号')
            }
        }),
    body('name').notEmpty().withMessage('聊天室名不能为空'),
])
exports.deleteChatRoom = validate([
    body('id')
        .notEmpty().withMessage('聊天室id不能为空')
        .bail()
        .custom(async (value, {req}) => {
            const chatRoom = await prisma.chatRoom.findUnique({
                where:{
                    id: value
                }
            })
            if(!chatRoom){
                return Promise.reject('未知聊天室')
            }else{
                if(chatRoom.ownerId!=req.user.id)
                return Promise.reject('你并不是聊天室创始人')
            }
        })
])