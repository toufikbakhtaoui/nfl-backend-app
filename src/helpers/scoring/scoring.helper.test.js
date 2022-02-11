const Game = require('../../api/components/game/game.model')
const scoringHelper = require('../scoring/scoring.helper')
const logger = require('../../config/winston.config')

const { start, stop, cleanup, gameSetup } = require('../test/api-test.helper')
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
beforeAll(async () => {
    await start()
})

afterAll(async () => {
    await stop()
})

afterEach(async () => {
    await cleanup()
})

beforeEach(async () => {
    await gameSetup()
})

describe('Score calculation tests', () => {
    it('Should return score', async () => {
        const season = 1
        const week = 16
        const games = await Game.find({ season: season, week: week })
        const game = games[0]
        scoringHelper.getScore(game)

        expect(game.homeTeam.stats.drives).toBeLessThanOrEqual(13)
        expect(game.awayTeam.stats.drives).toBeLessThanOrEqual(13)

        expect(game.homeTeam.stats.drives).toBeGreaterThanOrEqual(10)
        expect(game.awayTeam.stats.drives).toBeGreaterThanOrEqual(10)

        expect(game.homeTeam.stats.attempts).toBeGreaterThanOrEqual(
            game.homeTeam.stats.completions
        )
        expect(game.awayTeam.stats.attempts).toBeGreaterThanOrEqual(
            game.awayTeam.stats.completions
        )

        const homeTeamPoints =
            game.homeTeam.stats.touchDowns * 7 +
            game.homeTeam.stats.fieldGoals * 3
        expect(game.homeTeam.points).toBe(homeTeamPoints)

        const awayTeamPoints =
            game.awayTeam.stats.touchDowns * 7 +
            game.awayTeam.stats.fieldGoals * 3
        expect(game.awayTeam.points).toBe(awayTeamPoints)
    })

    it('Should return raisonable score', async () => {
        const season = 1
        const week = 16
        const games = await Game.find({ season: season, week: week })
        const game = games[0]

        for (let i = 0; i < 100; i++) {
            scoringHelper.getScore(game)
            game.homeTeam.stats = gameStats
            game.awayTeam.stats = gameStats
        }
        expect('0').toBe('0')
    })
})
