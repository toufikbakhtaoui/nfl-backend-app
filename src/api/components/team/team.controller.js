const Team = require('./team.model')
const teamService = require('./team.service')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')

const findOneTeam = async (req, res) => {
    try {
        const identifier = req.params.identifier
        logger.debug('findOneTeam - identifier: ' + identifier)
        const team = await Team.findOne({ identifier: identifier })
        if (team) {
            logger.debug('findOneTeam - success - identifier: ' + team)
            res.status(httpSatus.success).json(team)
        } else {
            logger.debug('findOneTeam - not found - identifier: ' + identifier)
            res.status(httpSatus.notfound).json('No team was found')
        }
    } catch (error) {
        logger.error('findOneTeam - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to find a team'
        )
    }
}

const findAllTeams = async (req, res) => {
    try {
        logger.debug('findAllTeams')
        const teams = await Team.find()
        if (teams) {
            logger.debug('findAllTeams - success - teams: ' + teams)
        } else {
            logger.debug('findAllTeams - not found')
        }
        res.status(httpSatus.success).json(teams)
    } catch (error) {
        logger.error('findAllTeams - technical problem: ' + error)
    }
}

const findTeamsByDivision = async (req, res) => {
    try {
        const identifier = Number(req.params.identifier)
        logger.debug('findTeamsByDivision - identifier: ' + identifier)
        const teams = await teamService.getStandingsByDivision(identifier)
        if (teams) {
            logger.debug('findTeamsByDivision - success - teams: ' + teams)
        } else {
            logger.debug('findTeamsByDivision - not found')
        }
        res.status(httpSatus.success).json(teams)
    } catch (error) {
        logger.error('findTeamsByDivision - technical problem: ' + error)
    }
}

module.exports = {
    findOneTeam,
    findAllTeams,
    findTeamsByDivision,
}
