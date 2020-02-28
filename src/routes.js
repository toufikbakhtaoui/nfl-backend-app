const express = require('express')
const router = express.Router()
const seasonRoutes = require('./api/components/season/season.routes')

router.use('/seasons', seasonRoutes)

module.exports = router
