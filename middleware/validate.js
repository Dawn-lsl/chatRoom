const { validationResult } = require('express-validator');
// parallel processing
module.exports = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)))
  
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return next()
      }
      const message = [];
      for (data of errors.array()) {
        message.push(data["msg"]);
      }
      // errors.array()[0].msg,
      const errData = {
        code: 1, // 0 means success
        message: message,
        data: errors.mapped()
      };
      res.status(400).json(
        errData
        // { errors: errors.mapped() }
        )
    }
}
