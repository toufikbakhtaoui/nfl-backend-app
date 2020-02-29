const express = require('express')
const gameRoutes = express.Router()
const gameController = require('./game.controller')

gameRoutes.get('/season/:season/week/:week', gameController.findGames)

module.exports = gameRoutes
