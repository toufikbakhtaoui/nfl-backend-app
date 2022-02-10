const express = require('express')
const seasonRoutes = express.Router()
const seasonController = require('./season.controller')

seasonRoutes.get('', seasonController.findAllSeasons)

module.exports = seasonRoutes
