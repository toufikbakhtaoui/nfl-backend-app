const Game = require('../../../api/components/game/game.model')

exports.generateWildCard = (champions, contenders, season) => {
    const wildCardWeek = 17
    const thirdSeed = 2
    const sixthSeed = 1
    const fourthSeed = 3
    const fifthSeed = 0

    const firstWildCardGame = new Game({
        season: season,
        week: wildCardWeek,
        homeTeam: {
            rank: champions[thirdSeed].rank,
            name: champions[thirdSeed].name,
            identifier: champions[thirdSeed].identifier,
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
            rank: contenders[sixthSeed].rank,
            name: contenders[sixthSeed].name,
            identifier: contenders[sixthSeed].identifier,
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

    const secondWildCardGame = new Game({
        season: season,
        week: wildCardWeek,
        homeTeam: {
            rank: champions[fourthSeed].rank,
            name: champions[fourthSeed].name,
            identifier: champions[fourthSeed].identifier,
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
            rank: contenders[fifthSeed].rank,
            name: contenders[fifthSeed].name,
            identifier: contenders[fifthSeed].identifier,
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
    return [firstWildCardGame, secondWildCardGame]
}
