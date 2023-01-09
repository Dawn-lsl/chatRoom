const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// 获取登录用户聊天室列表
exports.getUserChatRoomList = async (req, res, next) => {
    try {
        const chatRoomList = await prisma.member.findMany({
            where:{
                userId: req.user.id
            },
            include:{
                room: true
            }
        })
        res.apiResponse(chatRoomList)
        // res.status(200).json(chatRoomList)
    } catch (err) {
        next(err)
    }
}
// 获取聊天室列表
exports.getChatRoomList = async (req, res, next) => {
    try {
        const chatRoomList = await prisma.chatRoom.findMany()
        res.apiResponse(chatRoomList)
        // res.status(200).json(chatRoomList)
    } catch (err) {
        next(err)
    }
}
// 获取聊天室成员列表
exports.getChatRoomMember = async (req, res, next) => {
    try {
        const memberList = await prisma.member.findMany({
            where:{
                roomId: req.body.roomId
            },
            select:{
                user:{
                    select:{
                        id:true
                    }
                }
            }
        })
        res.apiResponse(memberList)
        // res.status(200).json(MemberList)
    } catch (err) {
        next(err)
    }
}
// 创建聊天室
exports.createChatRoom = async (req, res, next) => {
    try {
        const {roomId, description, name, category, img} = req.body
        const chatRoom = await prisma.chatRoom.create({
            data:{
                roomId: roomId,
                ownerId: req.user.id,
                name: name,
                description: description,
                category: category,
                img: img,
                member:{
                    create:{
                        userId: req.user.id
                    }
                }
            }
        })
        res.apiResponse(chatRoom)
        // res.status(200).json(chatRoom)
    } catch (err) {
        next(err)
    }
}
// 删除聊天室
exports.deleteChatRoom = async (req, res, next) => {
    try {
        const deleteMember = prisma.member.deleteMany({
            where:{
                roomId: req.body.id
            }
        })
        const deleteChatRoom = prisma.chatRoom.deleteMany({
            where:{
                id: req.body.id
            }
        })
        const transaction = await prisma.$transaction([deleteMember, deleteChatRoom])
        res.apiResponse(transaction)
        // res.status(200).json(transaction)
    } catch {
        next(err)
    }
}