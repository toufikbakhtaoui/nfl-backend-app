const Game = require('../../../api/components/game/game.model')

exports.generateChampionship = (divisionalWinners, season) => {
    const championshipWeek = 19
    const higherSeed = divisionalWinners[0]
    const lowerSeed = divisionalWinners[1]

    return new Game({
        season: season,
        week: championshipWeek,
        homeTeam: {
            rank: higherSeed.rank,
            name: higherSeed.name,
            identifier: higherSeed.identifier,
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
                fumble: 0,
                interception: 0,
            },
        },
        awayTeam: {
            rank: lowerSeed.rank,
            name: lowerSeed.name,
            identifier: lowerSeed.identifier,
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
                fumble: 0,
                interception: 0,
            },
        },
    })
}
