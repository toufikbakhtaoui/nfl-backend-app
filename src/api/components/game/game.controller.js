const Game = require('./game.model')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')

const findGames = async (req, res) => {
    try {
        const season = req.params.season
        const week = req.params.week
        logger.debug('findOneGame - season: ' + season + ' - ' + 'week ' + week)
        const games = await Game.findOne({ season: season, week: week })
        if (games) {
            logger.debug('findGames - success - games: ' + games)
            res.status(httpSatus.success).json(games)
        } else {
            logger.debug(
                'findGames - not found - season: ' +
                    season +
                    ' - ' +
                    'week ' +
                    week
            )
            res.status(httpSatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('findGames - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to find a game'
        )
    }
}

module.exports = {
    findGames,
}
