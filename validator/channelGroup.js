const validate = require('../middleware/validate')
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createChannelGroup = [
    validate([
        body('name')
            .notEmpty().withMessage('名称不能为空'),
        body('roomId')
            .notEmpty().withMessage('聊天室ID不能为空'),
        body('sort')
            .notEmpty().withMessage('类别不能为空')
    ]),
    validate([
        body('roomId')
            .custom(async (roomId, { req }) => {
                const chatRoom = await prisma.chatRoom.findUnique({
                    where:{
                        id: roomId
                    }
                })
                if(!chatRoom) {
                    return Promise.reject('聊天室不存在')
                } else if(chatRoom.ownerId!=req.user.id) {
                    return Promise.reject('你并不是聊天室创始人')
                }
            })
    ])
]

exports.deleteChannelGroup = [
    validate([
        body('id').notEmpty().withMessage('id不能为空')
    ]),
    validate([
        body('id')
            .custom(async (id,{req}) => {
                const channelGroup = await prisma.channelGroup.findUnique({
                    where:{
                        id: id
                    }
                })
                if(!channelGroup){
                    return Promise.reject('频道组不存在')
                } else {
                    const chatRoom = await prisma.chatRoom.findUnique({
                        where:{
                            id: channelGroup.roomId
                        }
                    })
                    if(chatRoom.ownerId!=req.user.id){
                        return Promise.reject('你并不是聊天室创始人')
                    }
                }
            })
    ])
]
exports.getChannelGroupList = [
    validate([
        body('id')
            .notEmpty().withMessage('id不能为空')
            .bail()
            .custom(async id => {
                const chatRoom = await prisma.chatRoom.findUnique({
                    where:{
                        id: id
                    }
                })
                if(!chatRoom) {
                    return Promise.reject('聊天室不存在')
                }
            })
    ]),
    validate([
        body('id')
            .custom(async (id ,{ req }) => {
                const memberList = await prisma.member.findMany({
                    where:{
                        roomId: id
                    },
                    select:{
                        userId: true
                    }
                })
                if(!memberList.some(({userId})=>userId===req.user.id)) {
                    return Promise.reject('你并不是聊天室成员')
                }
            })
    ])
]
exports.updateChannelGroup = [
    validate([
        body('id')
            .notEmpty().withMessage('id不能为空')
            .bail()
            .custom(async (id ,{ req }) => {
                const channelGroup = await prisma.channelGroup.findUnique({
                    where:{
                        id: id
                    }
                })
                if(!channelGroup) {
                    return Promise.reject('未知频道组')
                }
                const chatRoom = await prisma.chatRoom.findUnique({
                    where:{
                        id: channelGroup.roomId
                    }
                })
                if(chatRoom.ownerId!=req.user.id){
                    return Promise.reject('你并不是聊天室创始人')
                }
            }),
        body('name').notEmpty().withMessage('名字不能为空'),
        body('sort').isInt().withMessage('必须为Int')
    ]),
    validate([
        body
    ])
]