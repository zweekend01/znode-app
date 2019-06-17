const express = require('express')
const { UserController } = require('../../controllers/api')

const router = express.Router()
const VERSION = '/v1'
const PREFIX = `${VERSION}/users`

router.post(`${PREFIX}/register`, UserController.register)
router.post(`${PREFIX}/login`, UserController.login)
router.post(`${PREFIX}/logout`, UserController.logout)

module.exports = router
