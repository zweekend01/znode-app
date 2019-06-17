const createError = require('http-errors')
const { TabModel } = require('../../models/api')

class TabController {
  static createTabs (req, res, next) {

  }

  static getTabs (req, res, next) {
    const tabModel = new TabModel(req.app.get('mysql'))

    tabModel.select((err, results) => {
      if (err) return next(createError(500))
      res.restData(results)
    })
  }

  static getTab (req, res, next) {

  }

  static updateTab (req, res, next) {

  }

  static deleteTab (req, res, next) {

  }
}

module.exports = TabController
