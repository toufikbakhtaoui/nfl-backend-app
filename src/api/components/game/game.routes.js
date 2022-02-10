const express = require('express')
const gameRoutes = express.Router()
const gameController = require('./game.controller')

gameRoutes.get('/', gameController.findGames)
gameRoutes.get('/scores', gameController.playGames)

module.exports = gameRoutes
