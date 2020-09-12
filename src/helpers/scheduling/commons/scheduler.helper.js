const teamsFile = require('../../../data/teams/teams.json')
const teamService = require('../../../api/components/team/team.service')
const wildCardScheduler = require('../wild-card/wild-card.scheduler')
const divisionalScheduler = require('../divisional/divisional.scheduler')
const championshipScheduler = require('../championship/championship.scheduler')
const superBowlScheduler = require('../super-bowl/superBowl.scheduler')
const regularSeasonScheduler = require('../regular-season/regular-season.scheduler')
const Game = require('../../../api/components/game/game.model')
const Season = require('../../../api/components/season/season.model')
const Team = require('../../../api/components/team/team.model')
const logger = require('../../../../config/winston.config')
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

const insertNewSeason = async (newSeasonIdentifier) => {
    const newSeason = new Season({ identifier: newSeasonIdentifier, week: 1 })
    await newSeason.save()
}

const generateNewSeason = async (nextSeasonIdentifier) => {
    await insertNewSeason(nextSeasonIdentifier)
    const newSeasonMatchups = regularSeasonScheduler.generateRegularSeason(
        nextSeasonIdentifier
    )
    //need to call two times to get the right result
    await Team.find()
    await Team.find()
    const teams = await teamService.getStandings(nextSeasonIdentifier)

    let newSeasonGames = []
    newSeasonMatchups.forEach((game) => {
        const homeTeamName = teams.find(
            (team) => team.standings.rank === game.homeTeamRank
        ).name
        const homeTeamIdentifier = teams.find(
            (team) => team.standings.rank === game.homeTeamRank
        ).identifier
        const awayTeamName = teams.find(
            (team) => team.standings.rank === game.awayTeamRank
        ).name
        const awayTeamIdentifier = teams.find(
            (team) => team.standings.rank === game.awayTeamRank
        ).identifier

        let newSeasonGame = new Game({
            season: nextSeasonIdentifier,
            week: game.week,
            homeTeam: {
                rank: game.homeTeamRank,
                name: homeTeamName,
                identifier: homeTeamIdentifier,
                points: 0,
                stats: stats,
            },
            awayTeam: {
                rank: game.awayTeamRank,
                name: awayTeamName,
                identifier: awayTeamIdentifier,
                points: 0,
                stats: stats,
            },
        })
        newSeasonGames.push(newSeasonGame)
    })
    await Game.insertMany(newSeasonGames)
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

            const wildCardGames = afcWildCardGames.concat(nfcWildCardGames)
            await Game.insertMany(wildCardGames)
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
            await Game.insertMany(divisionalGames)
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
            await Game.insertMany([afcChampionshipGame, nfcChampionshipGame])
            break
        case 19:
            const superBowlGame = superBowlScheduler.generateSuperBowl(
                [afcWinners[0], nfcWinners[0]],
                season
            )
            await Game.insertMany([superBowlGame])
            break
        case 20:
            const nextSeasonIdentifier = season + 1
            await teamService.insertStandings(
                afcStandings,
                nextSeasonIdentifier
            )
            await teamService.insertStandings(
                nfcStandings,
                nextSeasonIdentifier
            )
            await generateNewSeason(nextSeasonIdentifier)
        default:
            break
    }
}

const createTeamList = async () => {
    const teams = []
    teamsFile.forEach((item) => {
        let team = new Team({
            identifier: item.identifier,
            name: item.name,
            city: item.city,
            stadium: item.stadium,
            conference: item.conference,
            division: item.division,
            standings: [
                {
                    season: 1,
                    rank: item.identifier,
                    win: 0,
                    lost: 0,
                    draw: 0,
                    scored: 0,
                    conceded: 0,
                },
            ],
        })
        teams.push(team)
    })
    await Team.insertMany(teams)
}
const initCareer = async () => {
    logger.info(`Initlisation of a new career`)
    const seasons = await Season.find()
    if (seasons.length > 0) {
        logger.debug(`Playing season ${seasons[seasons.length - 1]}`)
    } else {
        await createTeamList()
        await generateNewSeason(1)
    }
}

module.exports = {
    getChampions,
    getContenders,
    getWinners,
    generatePlayoffs,
    initCareer,
}
