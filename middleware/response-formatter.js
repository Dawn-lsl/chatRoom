module.exports = (req, res, next) => {
    res.apiResponse = (data, httpCode = 200) => {
        const responseData = {
          code: 0, // 0 means success
          message: '',
          data
        };
        return res.status(httpCode).json(responseData);
      };
      return next();
}