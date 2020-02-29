const express = require('express')
const router = express.Router()
const gameRoutes = require('./api/components/game/game.routes')
const teamRoutes = require('./api/components/team/team.routes')
const seasonRoutes = require('./api/components/season/season.routes')

router.use('/games', gameRoutes)
router.use('/teams', teamRoutes)
router.use('/seasons', seasonRoutes)

module.exports = router
