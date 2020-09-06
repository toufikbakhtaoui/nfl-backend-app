const Season = require('./season.model')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')

const findOneSeason = async (req, res) => {
    try {
        const identifier = Number(req.params.identifier)
        logger.debug('findOneSeason - identifier: ' + identifier)
        const season = await Season.findOne({ identifier: identifier })
        if (season) {
            logger.debug('findOneSeason - success - identifier: ' + season)
            res.status(httpSatus.success).json(season)
        } else {
            logger.debug(
                'findOneSeason - not found - identifier: ' + identifier
            )
            res.status(httpSatus.notfound).json('No season was found')
        }
    } catch (error) {
        logger.error('findOneSeason - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to find a season'
        )
    }
}

const findAllSeasons = async (req, res) => {
    try {
        logger.debug('findAllSeasons')
        const seasons = await Season.find()
        if (seasons) {
            logger.debug('findAllSeasons - success - seasons: ' + seasons)
        } else {
            logger.debug('findAllSeasons - not found')
        }
        res.status(httpSatus.success).json(seasons)
    } catch (error) {
        logger.error('findAllSeasons - technical problem: ' + error)
    }
}

module.exports = {
    findOneSeason,
    findAllSeasons,
}
