const getRankingByTeam = (teams) => {
    let bestRanking = 32

    teams.forEach((team) => {
        bestRanking =
            team.standings[0].rank < bestRanking
                ? team.standings[0].rank
                : bestRanking
    })

    let firstTeamDivisionTitles = 0
    teams[0].standings.shift()
    teams[0].standings.forEach((standing) => {
        if (standing.rank === bestRanking) {
            firstTeamDivisionTitles++
        }
    })

    let secondTeamDivisionTitles = 0
    teams[1].standings.shift()
    teams[1].standings.forEach((standing) => {
        if (standing.rank === bestRanking) {
            secondTeamDivisionTitles++
        }
    })

    let thirdTeamDivisionTitles = 0
    teams[2].standings.shift()
    teams[2].standings.forEach((standing) => {
        if (standing.rank === bestRanking) {
            thirdTeamDivisionTitles++
        }
    })

    let fourthTeamDivisionTitles = 0
    teams[3].standings.shift()
    teams[3].standings.forEach((standing) => {
        if (standing.rank === bestRanking) {
            fourthTeamDivisionTitles++
        }
    })

    return [
        { value: firstTeamDivisionTitles, name: teams[0].name },
        { value: secondTeamDivisionTitles, name: teams[1].name },
        { value: thirdTeamDivisionTitles, name: teams[2].name },
        { value: fourthTeamDivisionTitles, name: teams[3].name },
    ]
}

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
    getRankingByTeam,
}
