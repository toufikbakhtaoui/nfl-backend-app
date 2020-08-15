const Game = require('../api/components/game/game.model')
const scoringHelper = require('../helpers/scoring.helper')

const homeTeam = {
    rank: 1,
    name: 'ravens',
    identifier: 1,
    points: 0,
    stats: {
        drives: 0,
        punts: 0,
        fieldGoals: 0,
        missedFieldGoals: 0,
        attempts: 0,
        completions: 0,
        yards: 0,
        touchDowns: 0,
        fumbleOrInterception: 0,
    },
}

const awayTeam = {
    rank: 2,
    name: 'patriots',
    identifier: 2,
    points: 0,
    stats: {
        drives: 0,
        punts: 0,
        fieldGoals: 0,
        missedFieldGoals: 0,
        attempts: 0,
        completions: 0,
        yards: 0,
        touchDowns: 0,
        fumbleOrInterception: 0,
    },
}
const game = {
    season: 1,
    week: 1,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
}

describe('score calculation tests', () => {
    it('Should return score', () => {
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
})
