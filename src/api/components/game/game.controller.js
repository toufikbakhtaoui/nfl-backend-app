const Game = require('./game.model')
const Season = require('../season/season.model')
const teamService = require('../team/team.service')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')
const scoringHelper = require('../../../helpers/scoring/scoring.helper')
const schedulerHelper = require('../../../helpers/scheduling/commons/scheduler.helper')

const regularSeasonWeeks = 16

const findGames = async (req, res) => {
    try {
        const season = Number(req.params.season)
        const week = Number(req.params.week)
        logger.debug('findOneGame - season: ' + season + ' - ' + 'week ' + week)
        const games = await Game.find({ season: season, week: week })
        if (games !== null && games.length > 0) {
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

const playGames = async (req, res) => {
    try {
        let season = Number(req.params.season)
        let week = Number(req.params.week)
        logger.debug('playGames - season: ' + season + ' - ' + 'week ' + week)

        const games = await Game.find({ season: season, week: week })
        if (games) {
            const currentSeason = await Season.findOne({ identifier: season })
            if (week === currentSeason.week) {
                for (let game of games) {
                    scoringHelper.getScore(game)
                    await game.save()
                }

                if (week <= regularSeasonWeeks) {
                    await teamService.updateStandings(games, season)
                }

                currentSeason.week = currentSeason.week + 1
                await currentSeason.save()

                if (week >= regularSeasonWeeks) {
                    await schedulerHelper.generatePlayoffs(week, season)
                }
            }
            res.status(httpSatus.success).json(games)
        } else {
            logger.debug(
                'playGames - not found - season: ' +
                    season +
                    ' - ' +
                    'week ' +
                    week
            )
            res.status(httpSatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('playGames - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to play a game'
        )
    }
}

module.exports = {
    findGames,
    playGames,
}
