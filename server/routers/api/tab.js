const express = require('express')
const { TabController } = require('../../controllers/api')

const router = express.Router()
const VERSION = '/v1'
const PREFIX = `${VERSION}/tabs`

router.route(PREFIX)
  .post(TabController.createTabs)
  .get(TabController.getTabs)

router.route(`${PREFIX}/:id`)
  .get(TabController.getTab)
  .put(TabController.updateTab)
  .delete(TabController.deleteTab)

module.exports = router
