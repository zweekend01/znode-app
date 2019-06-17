const { tabSql } = require('../../sqls/api')

class TabModel {
  constructor (db) {
    this.db = db
  }

  /**
   * 获取tab列表
   * @param {Function} cb
   */
  select (cb) {
    this.db.query(tabSql.SELECT, (error, results) => {
      if (error) return cb(error)
      return cb(null, results)
    })
  }
}

module.exports = TabModel
