const express = require('express')
const seasonRoutes = express.Router()
const seasonController = require('./season.controller')

seasonRoutes.get('/:identifier', seasonController.findOneSeason)
seasonRoutes.get('', seasonController.findAllSeasons)

module.exports = seasonRoutes
