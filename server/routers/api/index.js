const express = require('express')
const userRouter = require('./user')
const tabRouter = require('./tab')

const router = express.Router()

router.use(userRouter)
router.use(tabRouter)

module.exports = router
