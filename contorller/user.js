const { PrismaClient } = require('@prisma/client')
const e = require('cors')
const prisma = new PrismaClient()
const nodemailer = require('nodemailer')
const md5 = require('../util/md5')

// 用户登录
exports.login = async (req, res , next) => {
    try{
        res.send('post /users')
    } catch (err) {
        next(err)
    }
}
// 用户注册
exports.register = async (req, res , next) => {
    try{
        const {code, userId, userName, email, password} = req.body
        const isEmpty = await prisma.code.findUnique({
            where:{
                email
            }
        })
        if(!isEmpty){
            res.send('该邮箱未获取验证码')
        }
        if(isEmpty.code==code&&isEmpty.email==email){
            let secret = md5(password)
            const result = await prisma.user.create({
                data:{
                    userId,
                    userName,
                    email,
                    password: secret
                },
                select:{
                    userId: true,
                    userName: true,
                    email: true
                }
            })
            console.log(req.body)
            res.status(201).json({
                result
            })
        }else{
            res.send('验证码错误')
        }
    } catch (err) {
        next(err)
    }
}
// 获取当前登录用户
exports.getCurrentUser = async (req, res , next) => {
    try{
        res.send('get /user')
    } catch (err) {
        next(err)
    }
}
// 更新当前登录用户
exports.updateCurrentUser = async (req, res , next) => {
    try{
        res.send('put /user')
    } catch (err) {
        next(err)
    }
}
// 邮箱验证
exports.getcode = async (req, res , next) => {
    try{
        const {email} = req.body
        let code = Math.floor(Math.random() * 900000+ 100000)
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'Dawnlsl@outlook.com', // generated ethereal user
              pass: 'fcocbmostazsiooa', // generated ethereal password
            },
        })
        let options = {
            from: 'Dawnlsl@outlook.com', // 发件邮箱
            to: email, // 收件列表
            subject: '验证你的电子邮件', // 标题
            html: `
            <p>你好！</p>
            <p>您正在注册 Cracker 社区账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码5分钟内有效***</p>` // html 内容
        }
        transporter.sendMail(options,async (err,msg)=>{
            if(err){console.log(err)}
            else{
                const isUsed = await prisma.code.findUnique({
                    where:{
                        email
                    }
                })
                if(isUsed){
                    await prisma.code.update({
                        where: {
                            email
                        },
                        data: {
                            code
                        }
                    })
                }else{
                    await prisma.code.create({data:{
                        email,
                        code
                    }})
                }
                res.send(msg)
                transporter.close()
            }
        })
    } catch (err) {
        next(err)
    }
}