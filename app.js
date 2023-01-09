// 导入 express
const express = require('express')
const router = require('./router')
const errorHandler = require('./middleware/error-handler')
const responseFormatter = require('./middleware/response-formatter')

// 创建 web 服务器
const app = express()

// 配置解析表单请求体: application/json
app.use(express.json())
// 统一返回格式
app.use(responseFormatter)
// 挂载路由
app.use('/api',router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

// 启动 web 服务器
app.listen(3000,() => {
    console.log('express server running at http:localhost:3000')
})