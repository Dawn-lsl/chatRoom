const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

exports.decode = promisify(jwt.decode)

// 生成 jwt
// const token = jwt.sign({
//     foo: 'bar'
// },'asdasd',(err, token) => {
//     if(err) {
//         return console('生成 token 失败')
//     }
//     console.log(token)
// })
// 验证
// const ret = jwt.verify(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJEYXduIiwiaWF0IjoxNjY5NzA1Mzc3fQ.dgbGFJud4IxYwDuneWnDVcD7Co6cVHB31T8JvB5hWwc', 
//     '36eb6922-6fa8-11ed-a1eb-0242ac120002',
//     (err, ret) => {
//         if(err) {
//             return console('token 认证失败')
//         }
//         console.log(ret)
//     })