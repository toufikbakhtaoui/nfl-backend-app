const Game = require('../../../api/components/game/game.model')

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

const generateSuperBowl = (championshipWinners, season) => {
    const superBowlWeek = 20
    const higherSeed = championshipWinners[0]
    const lowerSeed = championshipWinners[1]

    return new Game({
        season: season,
        week: superBowlWeek,
        homeTeam: {
            rank: higherSeed.standings.rank,
            name: higherSeed.name,
            identifier: higherSeed.identifier,
            points: 0,
            stats: stats,
        },
        awayTeam: {
            rank: lowerSeed.standings.rank,
            name: lowerSeed.name,
            identifier: lowerSeed.identifier,
            points: 0,
            stats: stats,
        },
    })
}

module.exports = {
    generateSuperBowl,
}
