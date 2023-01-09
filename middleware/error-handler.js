const util = require('util')

module.exports = () => {
    return (err, req, res, next) => {
        console.log(err)
        const responseData = {
            code: 1, // 0 means success
            message: util.format(err),
            data:{}
          }
        return res.status(500).json(responseData);
        // res.status(500).json({
        //     error: util.format(err)
        // })
    }
}