const Team = require('./team.model')
const httpStatus = require('../../../helpers/http-status.helper')
const logger = require('../../../config/winston.config')

const findOneTeam = async (req, res) => {
    try {
        const identifier = Number(req.params.identifier)
        logger.debug('findOneTeam - identifier: ' + identifier)
        const team = await Team.findOne({ identifier: identifier })
        if (team) {
            logger.debug('findOneTeam - success - identifier: ' + team)
            res.status(httpStatus.success).json(team)
        } else {
            logger.debug('findOneTeam - not found - identifier: ' + identifier)
            res.status(httpStatus.notfound).json('No team was found')
        }
    } catch (error) {
        logger.error('findOneTeam - technical problem: ', error)
        res.status(httpStatus.error).send(
            'A problem has occurred when trying to find a team'
        )
    }
}

const findAllTeams = async (req, res) => {
    try {
        logger.debug('findAllTeams')
        const teams = await Team.find()
        if (teams) {
            logger.debug('findAllTeams - success')
        } else {
            logger.debug('findAllTeams - not found')
        }
        res.status(httpStatus.success).json(teams)
    } catch (error) {
        logger.error('findAllTeams - technical problem: ' + error)
    }
}

module.exports = {
    findOneTeam,
    findAllTeams,
}
