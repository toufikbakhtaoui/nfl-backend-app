const express = require('express')
const gameRoutes = express.Router()
const gameController = require('./game.controller')

gameRoutes.get('/', gameController.findGames)
gameRoutes.get('/week/:week', gameController.findGamesByWeek)
gameRoutes.get('/team/:team', gameController.findGamesByTeam)
gameRoutes.get('/scores/season/:season/week/:week', gameController.playGames)

module.exports = gameRoutes
