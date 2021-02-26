const express = require('express')
const teamRoutes = express.Router()
const teamController = require('./team.controller')

teamRoutes.get('/:identifier', teamController.findOneTeam)
teamRoutes.get('', teamController.findAllTeams)
teamRoutes.get('/seasons/:identifier/divisions', teamController.findTeamsByDivision)

module.exports = teamRoutes
