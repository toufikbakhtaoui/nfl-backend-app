const Game = require('../../../api/components/game/game.model')

exports.generateDivisional = (champions, wildCardWinners, season) => {
    const divisionalWeek = 18

    const bestWildCardSeed = wildCardWinners[0]
    const worstWildCardSeed = wildCardWinners[1]

    const firstSeed = champions[0]
    const secondSeed = champions[1]

    const firstDivisionalGame = new Game({
        season: season,
        week: divisionalWeek,
        homeTeam: {
            rank: firstSeed.rank,
            name: firstSeed.name,
            identifier: firstSeed.identifier,
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
            rank: worstWildCardSeed.standings.rank,
            name: worstWildCardSeed.name,
            identifier: worstWildCardSeed.identifier,
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

    const secondDivisionalGame = new Game({
        season: season,
        week: divisionalWeek,
        homeTeam: {
            rank: secondSeed.rank,
            name: secondSeed.name,
            identifier: secondSeed.identifier,
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
            rank: bestWildCardSeed.standings.rank,
            name: bestWildCardSeed.name,
            identifier: bestWildCardSeed.identifier,
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

    return [firstDivisionalGame, secondDivisionalGame]
}
