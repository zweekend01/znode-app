const { userSql } = require('../../sqls/api')

class UserModel {
  constructor (db) {
    this.db = db
  }

  /**
   * 插入一行用户记录
   * @param {Object} user
   * @param {string} user[].name
   * @param {string} user[].password
   * @param {string} user[].tel
   * @param {string} [user[].address = '']
   * @param {string} [user[].email = '']
   * @param {Function} [cb]
   */
  insert ({
    name,
    password,
    tel,
    address = '',
    email = ''
  }, cb) {
    const values = [name, password, tel, address, email]
    this.db.query(userSql.INSERT, values, (error, results) => {
      if (error) return cb(error)
      return cb(null, results)
    })
  }

  /**
   * 依据名字查询用户信息
   * @param {string} name
   * @param {Function} cb
   */
  selectByName (name, cb) {
    this.db.query(userSql.SELECT_BY_NAME, [name], (error, results) => {
      if (error) return cb(error)
      return cb(null, results)
    })
  }
}

module.exports = UserModel
