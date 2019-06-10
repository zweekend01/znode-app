const express = require('express')
const { UserController } = require('../../controllers/api')

const router = express.Router()
const USER_VERSION = '/v1/user'

router.post(`${USER_VERSION}/register`, UserController.register)
router.post(`${USER_VERSION}/login`, UserController.login)
router.post(`${USER_VERSION}/logout`, UserController.logout)

module.exports = router
