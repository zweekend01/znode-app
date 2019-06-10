module.exports = function () {
  return function (req, res, next) {
    if (/^\/api/.test(req.path)) {
      res.set('Content-Type', 'application/json')
      res.restError = (data, next) => {
        const error = new Error()
        error.status = 400
        error.message = data
        next(error)
      }
      res.restData = (data, msg = 'request:ok') => {
        res.status(200).json({ code: 'success', data, msg })
      }
      next()
    }
  }
}
