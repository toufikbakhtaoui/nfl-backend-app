const sameDivisionScheduleFile = require('../../../data/schedule/same-division.json')
const sameConferenceDifferentDivisionFile = require('../../../data/schedule/same-conference-different-division.json')
const differentConferenceDifferentDivisionFile = require('../../../data/schedule/different-conference-different-division.json')

const teamsPerDivision = 4

const getScheduleFromFile = (file) => {
    const matchups = new Map()
    Object.keys(file).forEach((key) => {
        matchups.set(key, file[key])
    })
    return matchups
}

const generateDifferentDivisionMatchups = (
    firstDivision,
    secondDivision,
    week
) => {
    const teamsInFirstDivision = []
    for (let index = 1; index < 5; index++) {
        teamsInFirstDivision.push(
            (firstDivision - 1) * teamsPerDivision + index
        )
    }

    const teamsInSecondDivision = []
    for (let index = 1; index < 5; index++) {
        teamsInSecondDivision.push(
            (secondDivision - 1) * teamsPerDivision + index
        )
    }

    let matchups = []

    let game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[0],
        awayTeamRank: teamsInSecondDivision[0],
    }

    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[2],
        awayTeamRank: teamsInSecondDivision[2],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[1],
        awayTeamRank: teamsInSecondDivision[1],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[3],
        awayTeamRank: teamsInSecondDivision[3],
    }
    matchups.push(game)

    week++

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[1],
        awayTeamRank: teamsInFirstDivision[0],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[0],
        awayTeamRank: teamsInFirstDivision[1],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[3],
        awayTeamRank: teamsInFirstDivision[2],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[2],
        awayTeamRank: teamsInFirstDivision[3],
    }
    matchups.push(game)

    week++

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[0],
        awayTeamRank: teamsInSecondDivision[2],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[1],
        awayTeamRank: teamsInSecondDivision[3],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[2],
        awayTeamRank: teamsInSecondDivision[0],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInFirstDivision[3],
        awayTeamRank: teamsInSecondDivision[1],
    }
    matchups.push(game)

    week++

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[2],
        awayTeamRank: teamsInFirstDivision[1],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[3],
        awayTeamRank: teamsInFirstDivision[0],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[1],
        awayTeamRank: teamsInFirstDivision[2],
    }
    matchups.push(game)

    game = {
        week: week,
        homeTeamRank: teamsInSecondDivision[0],
        awayTeamRank: teamsInFirstDivision[3],
    }

    matchups.push(game)

    return matchups
}

const generateHeadToHead = (firstDivision, secondDivision, week) => {
    const teamsInFirstDivision = []
    let games = []
    for (let index = 1; index < 5; index++) {
        teamsInFirstDivision.push(
            (firstDivision - 1) * teamsPerDivision + index
        )
    }

    const teamsInSecondDivision = []
    for (let index = 1; index < 5; index++) {
        teamsInSecondDivision.push(
            (secondDivision - 1) * teamsPerDivision + index
        )
    }

    for (let index = 0; index < 4; index++) {
        let game = {
            week: week,
            homeTeamRank: teamsInFirstDivision[index],
            awayTeamRank: teamsInSecondDivision[index],
        }
        games.push(game)
    }
    return games
}

const generateSamePositionMatchups = (selectedYear, week) => {
    let games = []
    const allPossiblesSchedules = getScheduleFromFile(
        sameConferenceDifferentDivisionFile
    )
    const selectedSchedule = allPossiblesSchedules.get(selectedYear)
    for (const matchup of selectedSchedule) {
        let firstDivision = parseInt(matchup[0])
        let secondDivision = parseInt(matchup[1])
        games.push.apply(
            games,
            generateHeadToHead(firstDivision, secondDivision, week)
        )
    }
    return games
}

const generateSameConferenceDifferentDivisionGames = (season) => {
    const seasonIterations = 3
    const selectedYear = (season % seasonIterations) + ''
    const allPossiblesSchedules = getScheduleFromFile(
        sameConferenceDifferentDivisionFile
    )
    const selectedSchedule = allPossiblesSchedules.get(selectedYear)
    let games = []
    for (const matchup of selectedSchedule) {
        let firstDivision = parseInt(matchup[0])
        let secondDivision = parseInt(matchup[1])
        const week = 4
        let twoDivisionsMatchups = generateDifferentDivisionMatchups(
            firstDivision,
            secondDivision,
            week
        )
        games.push.apply(games, twoDivisionsMatchups)
    }
    return games
}

const generateSameDivisionGames = () => {
    const games = []
    for (let division = 1; division < 9; division++) {
        const complementToPosition = (division - 1) * teamsPerDivision
        const schedule = getScheduleFromFile(sameDivisionScheduleFile)

        for (const [key, value] of schedule.entries()) {
            for (const matchup of value) {
                let game = {
                    week: Number(key),
                    homeTeamRank: parseInt(matchup[0]) + complementToPosition,
                    awayTeamRank: parseInt(matchup[1]) + complementToPosition,
                }
                games.push(game)
            }
        }
    }
    return games
}

const generateSamePositionGames = (season) => {
    const weekTwelve = 12
    const weekThirteen = 13
    const seasonIterations = 3
    const firstMatchup = (season + 1) % seasonIterations
    const secondMatchup = (season + 2) % seasonIterations
    let games = []
    const firstMatchupGames = generateSamePositionMatchups(
        firstMatchup + '',
        weekTwelve
    )
    const secondMatchupGames = generateSamePositionMatchups(
        secondMatchup + '',
        weekThirteen
    )
    games.push.apply(games, firstMatchupGames)
    games.push.apply(games, secondMatchupGames)
    return games
}

const generateDifferentConferenceDifferentDivisionGames = (season) => {
    const seasonIterations = 4
    const selectedYear = (season % seasonIterations) + ''
    const allPossiblesSchedules = getScheduleFromFile(
        differentConferenceDifferentDivisionFile
    )
    const selectedSchedule = allPossiblesSchedules.get(selectedYear)
    const week = 8
    const games = []
    for (const matchup of selectedSchedule) {
        const firstDivision = parseInt(matchup[0])
        const secondDivision = parseInt(matchup[1])
        let twoDivisionsMatchups = generateDifferentDivisionMatchups(
            firstDivision,
            secondDivision,
            week
        )
        games.push.apply(games, twoDivisionsMatchups)
    }
    return games
}

const generateRegularSeason = (season) => {
    const sameConferenceDifferentDivisionGames =
        generateSameConferenceDifferentDivisionGames(season)
    const samePositionGames = generateSamePositionGames(season)
    const differentConferenceDifferentDivisionGames =
        generateDifferentConferenceDifferentDivisionGames(season)
    const sameDivisionGames = generateSameDivisionGames()

    let games = []

    games.push.apply(games, sameDivisionGames)
    games.push.apply(games, sameConferenceDifferentDivisionGames)
    games.push.apply(games, samePositionGames)
    games.push.apply(games, differentConferenceDifferentDivisionGames)

    return games
}

module.exports = {
    generateRegularSeason,
    generateSameConferenceDifferentDivisionGames,
    generateSamePositionGames,
    generateDifferentConferenceDifferentDivisionGames,
    generateSameDivisionGames,
}
