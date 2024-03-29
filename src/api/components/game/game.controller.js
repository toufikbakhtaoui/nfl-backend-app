const Game = require('./game.model')
const Season = require('../season/season.model')
const teamService = require('../team/team.service')
const httpStatus = require('../../../helpers/http-status.helper')
const logger = require('../../../config/winston.config')
const scoringHelper = require('../../../helpers/scoring/scoring.helper')
const schedulerHelper = require('../../../helpers/scheduling/commons/scheduler.helper')
const gameService = require('./game.service')

const regularSeasonWeeks = 16
const gameStats = {
    drives: 0,
    punts: 0,
    fieldGoals: 0,
    missedFieldGoals: 0,
    attempts: 0,
    completions: 0,
    yards: 0,
    touchDowns: 0,
    fumble: 0,
    interception: 0,
}

const findGames = async (req, res) => {
    try {
        logger.debug(
            'findGames - season ' +
                req.query.season +
                ' - week ' +
                req.query.week +
                ' - team ' +
                req.query.team
        )

        let games = []
        games = await gameService.findGames(
            req.query.season,
            req.query.week,
            req.query.team
        )

        if (games !== null && games.length > 0) {
            logger.debug('findGames - success')
            res.status(httpStatus.success).json(games)
        } else {
            logger.debug(
                'findGames - not found - season: ' +
                    req.query.season +
                    ' - ' +
                    'week ' +
                    req.query.week
            )
            res.status(httpStatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('findGames - technical problem: ', error)
        res.status(httpStatus.error).send(
            'A problem has occurred when trying to find a game'
        )
    }
}

async function simulateGame(game) {
    scoringHelper.getScore(game)
    while (game.homeTeam.points === game.awayTeam.points && game.week > 16) {
        game.homeTeam.points = 0
        game.awayTeam.points = 0
        game.homeTeam.stats = gameStats
        game.awayTeam.stats = gameStats
        scoringHelper.getScore(game)
    }
    await game.save()
}

const playGames = async (req, res) => {
    try {
        const season =
            req.query.season != null
                ? Number(req.query.season)
                : req.query.season
        const week =
            req.query.week != null ? Number(req.query.week) : req.query.week
        logger.debug('playGames - season: ' + season + ' - ' + 'week ' + week)

        const currentSeason = await Season.findOne({ identifier: season })
        if (week !== currentSeason.week) {
            logger.debug(
                'playGames - can not play this game - season: ' +
                    season +
                    ' - ' +
                    'week ' +
                    week
            )
            return
        }

        const games = await Game.find({ season: season, week: week })
        if (games) {
            for (let game of games) {
                await simulateGame(game)
            }

            await teamService.updateStats(games)

            if (week <= regularSeasonWeeks) {
                logger.debug('update standings - success - season: ' + season)
                await teamService.updateStandings(games, season)
            }

            currentSeason.week = currentSeason.week + 1
            await currentSeason.save()

            if (week > regularSeasonWeeks) {
                await teamService.updateRecords(games)
            }
            if (week >= regularSeasonWeeks) {
                await schedulerHelper.generatePlayoffs(week, season)
            }

            res.status(httpStatus.success).json(games)
        } else {
            logger.debug(
                'playGames - not found - season: ' +
                    season +
                    ' - ' +
                    'week ' +
                    week
            )
            res.status(httpStatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('playGames - technical problem: ', error)
        res.status(httpStatus.error).send(
            'A problem has occurred when trying to play a game'
        )
    }
}

module.exports = {
    findGames,
    playGames,
}
