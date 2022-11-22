const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const nodemailer = require('nodemailer')

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
        prisma.$connect()
        await prisma.user.update({
            where: {
              id: '637c3349487cdf6592a8f3c3'
            },
            data:req.body
        })
        // await prisma.user.create({data:req.body})
        console.log(req.body)
        res.send('post /users')
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
        let code = Math.floor(Math.random() * 900000+ 100000)
        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'Dawnlsl@outlook.com', // generated ethereal user
              pass: 'ixcizotirrudkggd', // generated ethereal password
            },
        });
        let options = {
            from: 'Dawnlsl@outlook.com', // 发件邮箱
            to: '1972463883@qq.com', // 收件列表
            subject: '验证你的电子邮件', // 标题
            html: `
            <p>你好！</p>
            <p>您正在注册 Cracker 社区账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码5分钟内有效***</p>` // html 内容
        }
        transporter.sendMail(options,(err,msg)=>{
            if(err){console.log(err)}
            else{
                res.send(msg)
                transporter.close()
            }
        })
    } catch (err) {
        next(err)
    }
}