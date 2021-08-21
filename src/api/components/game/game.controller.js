const Game = require('./game.model')
const Season = require('../season/season.model')
const teamService = require('../team/team.service')
const httpSatus = require('../../../helpers/http-status.helper')
const logger = require('../../../../config/winston.config')
const scoringHelper = require('../../../helpers/scoring/scoring.helper')
const schedulerHelper = require('../../../helpers/scheduling/commons/scheduler.helper')

const regularSeasonWeeks = 16
const stats = {
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
        const season = Number(req.params.season)
        const week = Number(req.params.week)
        logger.debug('findGames - season: ' + season + ' - ' + 'week ' + week)
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

const findGamesByWeek = async (req, res) => {
    try {
        const week = Number(req.params.week)
        logger.debug('findGamesByWeek - week ' + week)
        const games = await Game.find({ week: week })
        if (games !== null && games.length > 0) {
            logger.debug('findGamesByWeek - success - games: ' + games)
            res.status(httpSatus.success).json(games)
        } else {
            logger.debug('findGamesByWeek - not found - week: ' + week)
            res.status(httpSatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('findGamesByWeek - technical problem: ', error)
        res.status(httpSatus.error).send(
            'A problem has occured when trying to find a game'
        )
    }
}

const findGamesByTeam = async (req, res) => {
    try {
        const team = Number(req.params.team)
        logger.debug('findGamesByTeam - team ' + team)
        const currentSeason = await Season.findOne({ week: { $ne: 21 } })
        const finishedSeasonsGames = await Game.find({
            season: { $ne: currentSeason.identifier },
            $or: [
                { 'homeTeam.identifier': team },
                { 'awayTeam.identifier': team },
            ],
        })
        const currentSeasonPlayedGames = await Game.find({
            $and: [
                { season: currentSeason.identifier },
                { week: { $lt: currentSeason.week } },
            ],
            $or: [
                { 'homeTeam.identifier': team },
                { 'awayTeam.identifier': team },
            ],
        })
        const games = finishedSeasonsGames.concat(currentSeasonPlayedGames)
        if (games !== null && games.length > 0) {
            logger.debug('findGamesByTeam - success - games: ' + games)
            res.status(httpSatus.success).json(games)
        } else {
            logger.debug('findGamesByTeam - not found - team: ' + team)
            res.status(httpSatus.notfound).json('No game was found')
        }
    } catch (error) {
        logger.error('findGamesByTeam - technical problem: ', error)
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
                    while (
                        game.homeTeam.points === game.awayTeam.points &&
                        game.week > 16
                    ) {
                        game.homeTeam.points = 0
                        game.awayTeam.points = 0
                        game.homeTeam.stast = stats
                        game.awayTeam.stats = stats
                        scoringHelper.getScore(game)
                    }
                    await game.save()
                }

                if (week <= regularSeasonWeeks) {
                    logger.debug(
                        'update standings - success - season: ' + season
                    )
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
    findGamesByWeek,
    findGamesByTeam,
    playGames,
}
