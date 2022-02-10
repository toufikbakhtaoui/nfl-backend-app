const Season = require('./season.model')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')

const findAllSeasons = async (req, res) => {
    try {
        const identifier =
            req.query.identifier != undefined && req.query.identifier != null
                ? Number(req.query.identifier)
                : req.query.identifier
        logger.debug('findAllSeasons - identifier: ' + identifier)
        let seasons =
            identifier != null && identifier != undefined
                ? await Season.findOne({ identifier: identifier })
                : await Season.find()
        if (seasons) {
            logger.debug('findAllSeasons - success - identifier: ' + seasons)
            res.status(httpSatus.success).json(seasons)
        } else {
            logger.debug(
                'findAllSeasons - not found - identifier: ' + identifier
            )
            res.status(httpSatus.notfound).json('No season was found')
        }
    } catch (error) {
        logger.error('findAllSeasons - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to find a season'
        )
    }
}

module.exports = {
    findAllSeasons,
}
