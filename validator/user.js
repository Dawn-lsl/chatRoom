const validate = require('../middleware/validate')
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
exports.register = validate([
    body('userId')
        .notEmpty().withMessage('账号不能为空')
        .bail()
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where:{
                    userId: value
                }
            })
            if(user){
                return Promise.reject('账号已存在,请重新输入账号')
            }
        }),
    body('userName').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('email')
        .notEmpty().withMessage('邮箱不能为空')
        .isEmail().withMessage('邮箱格式不正确')
        .bail()
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where:{
                    email: value
                }
            })
            if(user){
                return Promise.reject('邮箱已存在')
            }
        }),
    body('code')
        .notEmpty().withMessage('验证码不能为空')
        .isInt().withMessage('验证码格式不正确')
])
exports.getcode = validate([
    body('email')
        .notEmpty().withMessage('邮箱不能为空')
        .isEmail().withMessage('邮箱格式不正确')
        .bail()
        .custom(async value => {
            const user = await prisma.user.findUnique({
                where:{
                    email: value
                }
            })
            if(user){
                return Promise.reject('邮箱已存在')
            }
        })
])