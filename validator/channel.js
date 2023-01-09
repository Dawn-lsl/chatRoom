const validate = require('../middleware/validate')
const {body} = require('express-validator');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.createChannel = [
    validate([
        body('name').notEmpty().withMessage('名字不能为空'),
        body('groupId').notEmpty().withMessage('频道组不能为空')
    ]),
    validate([
        body('groupId').custom(async id => {
            const channelGroup = await prisma.channelGroup.findUnique({
                where: {
                    id: id
                }
            })
            if (!channelGroup) {
                return Promise.reject('未知频道组')
            }
        })
    ])
]

exports.deleteChannel = validate([
    body('id')
    .notEmpty().withMessage('id不能为空')
    .bail()
    .custom(async id =>{
        const channel = await prisma.channel.findUnique({
            where:{
                id: id
            }
        })
        if (!channel) {
            return Promise.reject('未知频道')
        }
    })
])

exports.updateChannel = [
    validate([
        body('id')
            .notEmpty().withMessage('id不能为空'),
        body('name')
            .notEmpty().withMessage('名字不能为空')
    ]),
    validate([
        body('id')
            .custom(async id =>{
                const channel = await prisma.channel.findUnique({
                    where:{
                        id: id
                    }
                })
                if (!channel) {
                    return Promise.reject('未知频道')
                }
            })
    ])
]