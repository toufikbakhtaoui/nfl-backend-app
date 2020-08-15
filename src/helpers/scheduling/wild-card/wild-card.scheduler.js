const Game = require('../../../api/components/game/game.model')

exports.generateWildCard = (standings, season) => {
    const champions = []
    const contenders = []
    const divisionChampionPosition = 0
    const contendersStartingPosition = 1

    const wildCardWeek = 17
    const thirdSeed = 2
    const sixthSeed = 1
    const fourthSeed = 3
    const fifthSeed = 0

    standings.forEach((div) =>
        champions.push(div.teams[divisionChampionPosition])
    )

    standings.forEach((div) =>
        Array.prototype.push.apply(
            contenders,
            div.teams.slice(contendersStartingPosition)
        )
    )

    champions.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    contenders.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    const firstWildCardGame = Game({
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
                fumbleOrInterception: 0,
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
                fumbleOrInterception: 0,
            },
        },
    })

    const secondWildCardGame = Game({
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
                fumbleOrInterception: 0,
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
                fumbleOrInterception: 0,
            },
        },
    })
    return [firstWildCardGame, secondWildCardGame]
}
