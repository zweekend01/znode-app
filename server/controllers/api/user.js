const crypto = require('crypto')
const createError = require('http-errors')
const { PWD_SECRET } = require('../../config')
const { UserModel } = require('../../models/api')
const {
  ERROR_USER_EXISTED,
  ERROR_USER_NOT_EXISTED,
  ERROR_USER_PWD_INCORRECT
} = require('../../config/errors')

class UserController {
  static register (req, res, next) {
    const userModel = new UserModel(req.app.get('mysql'))
    let { name, password, tel, address, email } = req.body

    userModel.selectByName(name, (err, results) => {
      if (err) return next(createError(500))

      // 检验用户名是否存在
      if (results[0] && results[0].id) return res.restError(ERROR_USER_EXISTED, next)

      // 为密码加密
      const hmac = crypto.createHmac('sha256', PWD_SECRET)
      hmac.update(password)
      password = hmac.digest('hex')

      userModel.insert({ name, password, tel, address, email }, (err, results) => {
        if (err) return next(createError(500))

        req.session.uid = results.insertId
        req.session.save()
        res.restData(null, 'Register Success')
      })
    })
  }

  static login (req, res, next) {
    const userModel = new UserModel(req.app.get('mysql'))
    const { name, password } = req.body

    userModel.selectByName(name, (err, results) => {
      if (err) return next(createError(500))

      // 检验用户名是否存在
      if (!results[0]) return res.restError(ERROR_USER_NOT_EXISTED, next)

      // 检验密码是否正确
      const hmac = crypto.createHmac('sha256', PWD_SECRET)
      hmac.update(password)
      if (results[0].password !== hmac.digest('hex')) return res.restError(ERROR_USER_PWD_INCORRECT, next)

      req.session.uid = results[0].id
      req.session.save()
      res.restData(null, 'Login success')
    })
  }

  static logout (req, res, next) {
    req.session.uid = ''
    req.session.save()
    res.restData(null, 'Logout success')
  }
}

module.exports = UserController
