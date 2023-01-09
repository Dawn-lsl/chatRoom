const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 好友列表
exports.FriendList = async (req, res, next) => {
    try{
        const FriendList = prisma.friend.findMany({
            where:{
                userId: req.user.userId
            }
        })
        res.apiResponse(FriendList)
    } catch (err) {
        next(err)
    }
}