const getStats = (teams) => {
    const statsArray = []
    teams.forEach((team) => {
        statsArray.push({
            team: team.name,
            win: team.stats.win,
            lost: team.stats.lost,
            draw: team.stats.draw,
            total: team.stats.win + team.stats.lost + team.stats.draw,
            percentage:
                Math.round(
                    (team.stats.win /
                        (team.stats.win + team.stats.lost + team.stats.draw)) *
                        10000
                ) / 100,
        })
    })
    statsArray.sort((team1, team2) => team2.win - team1.win)
    return statsArray
}
const getSuperbowlStats = (superbowls) => {
    const winnerArray = []
    const superbowlWinners = []
    const appearancesArray = []
    const championshipWinners = []
    superbowls.forEach((game) => {
        game.awayTeam.points > game.homeTeam.points
            ? winnerArray.push(game.awayTeam.name)
            : winnerArray.push(game.homeTeam.name)
        appearancesArray.push(game.awayTeam.name)
        appearancesArray.push(game.homeTeam.name)
    })

    const winners = winnerArray.reduce(
        (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
        new Map()
    )
    winners.forEach((value, key) => {
        superbowlWinners.push({
            team: key,
            superbowls: value,
        })
    })

    superbowlWinners.sort((team1, team2) => team2.superbowls - team1.superbowls)

    const appearances = appearancesArray.reduce(
        (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
        new Map()
    )
    appearances.forEach((value, key) => {
        championshipWinners.push({
            team: key,
            championships: value,
        })
    })

    championshipWinners.sort(
        (team1, team2) => team2.championships - team1.championships
    )
    return {
        superbowlWinners: superbowlWinners,
        championshipWinners: championshipWinners,
    }
}

module.exports = {
    getSuperbowlStats,
    getStats,
}
