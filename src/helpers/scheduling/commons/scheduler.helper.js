const teamService = require('../../../api/components/team/team.service')
const wildCardScheduler = require('../wild-card/wild-card.scheduler')
const divisionalScheduler = require('../divisional/divisional.scheduler')
const championshipScheduler = require('../championship/championship.scheduler')
const superBowlScheduler = require('../super-bowl/superBowl.scheduler')
const Game = require('../../../api/components/game/game.model')

const getChampions = (standings) => {
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

const getContenders = (standings) => {
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

const getWinners = (games, standings) => {
    const winners = []
    for (let game of games) {
        const winner =
            game.homeTeam.points - game.awayTeam.points > 0
                ? standings.find(
                      (team) =>
                          team.standings.rank === game._doc.homeTeam._doc.rank
                  )
                : standings.find(
                      (team) =>
                          team.standings.rank === game._doc.awayTeam._doc.rank
                  )
        winners.push(winner)
    }
    winners.sort(function (firstTeam, secondTeam) {
        return (
            secondTeam.standings.win - firstTeam.standings.win ||
            secondTeam.standings.draw - firstTeam.standings.draw ||
            secondTeam.standings.scored - firstTeam.standings.scored ||
            firstTeam.standings.conceded - secondTeam.standings.conceded
        )
    })

    return winners
}

const generatePlayoffs = async (week, season) => {
    const standingsByDivision = await teamService.getStandingsByDivision(season)

    const afcStandings = standingsByDivision.filter(
        (conference) => conference._id.conference === 'afc'
    )
    const afcChampions = getChampions(afcStandings)
    const afcContenders = getContenders(afcStandings)

    const nfcStandings = standingsByDivision.filter(
        (conference) => conference._id.conference === 'nfc'
    )
    const nfcChampions = getChampions(nfcStandings)
    const nfcContenders = getContenders(nfcStandings)

    const standings = await teamService.getStandings(season)
    let afcWinners = []
    let nfcWinners = []

    if (week !== 16) {
        const games = await Game.find({ season: season, week: week })
        const winners = getWinners(games, standings)
        afcWinners = winners.filter((team) => team.conference === 'afc')
        nfcWinners = winners.filter((team) => team.conference === 'nfc')
    }
    switch (week) {
        case 16:
            const afcWildCardGames = wildCardScheduler.generateWildCard(
                afcChampions,
                afcContenders,
                season
            )

            const nfcWildCardGames = wildCardScheduler.generateWildCard(
                nfcChampions,
                nfcContenders,
                season
            )

            let wildCardGames = afcWildCardGames.concat(nfcWildCardGames)
            const wildCard = await Game.insertMany(wildCardGames)
            break
        case 17:
            const afcDivisionalGames = divisionalScheduler.generateDivisional(
                afcChampions,
                afcWinners,
                season
            )
            const nfcDivisionalGames = divisionalScheduler.generateDivisional(
                nfcChampions,
                nfcWinners,
                season
            )
            let divisionalGames = afcDivisionalGames.concat(nfcDivisionalGames)
            const divisional = await Game.insertMany(divisionalGames)
            break
        case 18:
            const afcChampionshipGame = championshipScheduler.generateChampionship(
                afcWinners,
                season
            )
            const nfcChampionshipGame = championshipScheduler.generateChampionship(
                nfcWinners,
                season
            )
            const championhsip = await Game.insertMany([
                afcChampionshipGame,
                nfcChampionshipGame,
            ])
            break
        case 19:
            const superBowlGame = superBowlScheduler.generateSuperBowl(
                [afcWinners[0], nfcWinners[0]],
                season
            )
            const superBowl = await Game.insertMany([superBowlGame])
            break
        default:
            break
    }
}

module.exports = {
    getChampions,
    getContenders,
    getWinners,
    generatePlayoffs,
}
