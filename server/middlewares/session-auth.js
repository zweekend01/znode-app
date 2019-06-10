const createError = require('http-errors')
const { UserModel } = require('../models/api')
const { ERROR_USER_LOGON_EXPIRES } = require('../config/errors')

module.exports = function () {
  // 无需鉴权的router
  let unlessPath = []

  // 中间件
  const handler = function (req, res, next) {
    if (unlessPath.some(item => item.test(req.path))) return next()

    // 查看session中是否存有用户登录的信息
    if (!req.session.uid) return next(createError(401))

    // 查看登录态是否过期
    if (req.session.cookie.maxAge === 0) return res.restError(ERROR_USER_LOGON_EXPIRES, next)

    // 从数据库查询出相关的用户信息
    const userModel = new UserModel(req.app.get('mysql'))
    userModel.selectByName(req.session.uid, (err, results) => {
      if (err) return next(createError(500))
      req.user = results[0]
      next()
    })
  }

  handler.unless = function ({ path }) {
    unlessPath = path
    return this
  }

  return handler
}
