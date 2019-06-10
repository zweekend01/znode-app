const jwt = require('jsonwebtoken')

module.exports = function ({ secret } = {}) {
  let unlessPath = []

  const handler = function (req, res, next) {
    // if (unlessPath.some(item => item.test(req.path))) return next()
    if (unlessPath.some(item => item.test(req.path))) console.log('has')
  }
  handler.unless = function ({ path }) {
    unlessPath = path
    return this
  }

  return handler
}
