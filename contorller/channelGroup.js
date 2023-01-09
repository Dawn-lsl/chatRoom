const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 新建频道组
exports.createChannelGroup = async (req, res, next) => {
    try{
        const {name, roomId, sort} = req.body
        const ChannelGroup = await prisma.channelGroup.create({
            data:{
                name: name,
                roomId: roomId,
                sort: sort
            }
        })
        res.apiResponse(ChannelGroup)
    } catch (err) {
        next(err)
    }
}
// 删除频道组
exports.deleteChannelGroup = async (req, res, next) => {
    try{
        const channelGroup = await prisma.channelGroup.delete({
            where:{
                id: req.body.id
            }
        })
        res.apiResponse(channelGroup)
    } catch (err) {
        next(err)
    }
}
// 获取频道组列表
exports.getChannelGroupList = async (req, res, next) => {
    try{
        const channelGroupList = await prisma.channelGroup.findMany({
            where:{
                roomId: req.body.id
            },
            include:{
                channel:true
            }
        })
        res.apiResponse(channelGroupList)
    } catch (err) {
        next(err)
    }
}
// 更新频道组
exports.updateChannelGroup = async (req, res, next) => {
    try{
        const {id, name , sort} = req.body
        const channelGroup = await prisma.channelGroup.update({
            where:{
                id: id
            },
            data:{
                name: name,
                sort: Number(sort)
            }
        })
        res.apiResponse(channelGroup)
    } catch (err) {
        next(err)
    }
}