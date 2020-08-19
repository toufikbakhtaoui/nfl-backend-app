exports.getChampions = (standings) => {
    const divisionChampionPosition = 0
    const champions = []

    standings.forEach((div) =>
        champions.push(div.teams[divisionChampionPosition])
    )

    champions.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    return champions
}

exports.getContenders = (standings) => {
    const contendersStartingPosition = 1
    const contenders = []

    standings.forEach((div) =>
        Array.prototype.push.apply(
            contenders,
            div.teams.slice(contendersStartingPosition)
        )
    )

    contenders.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    return contenders
}

exports.getWinners = (games, standings) => {
    const winners = []
    games.forEach((game) => {
        const winner =
            game.homeTeam.points - game.awayTeam.points > 0
                ? standings.filter(
                      (team) => team.rank === game._doc.homeTeam._doc.rank
                  )
                : standings.filter(
                      (team) => team.rank === game._doc.awayTeam._doc.rank
                  )
        winners.push(winner[0])
    })
    winners.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.win - firstTeam.win ||
            secondTeam.draw - firstTeam.draw ||
            secondTeam.scored - firstTeam.scored ||
            firstTeam.conceded - secondTeam.conceded
        )
    })

    return winners
}
