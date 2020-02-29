const express = require('express')
const router = express.Router()
const seasonRoutes = require('./api/components/season/season.routes')
const teamRoutes = require('./api/components/team/team.routes')

router.use('/seasons', seasonRoutes)
router.use('/teams', teamRoutes)

module.exports = router
