const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 新建频道
exports.createChannel = async (req, res, next) =>{
    try{
        const channel = await prisma.channel.create({
            data:{
                name: req.body.name,
                groupId: req.body.groupId
            }
        })
        res.apiResponse(channel)
    } catch (err) {
        next(err)
    }
}
// 删除频道
exports.deleteChannel = async (req, res, next) =>{
    try{
        const channel = await prisma.channel.delete({
            where:{
                id: req.body.id
            }
        })
        res.apiResponse(channel)
    } catch (err) {
        next(err)
    }
}
// 更新频道
exports.updateChannel = async (req, res, next) =>{
    try{
        const channel = await prisma.channel.update({
            where:{
                id: req.body.id
            },
            data:{
                name: req.body.name
            }
        })
        res.apiResponse(channel)
    } catch (err) {
        next(err)
    }
}