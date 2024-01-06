const Chance = require('chance')
const chance = new Chance()

let position = 0
let endZone = 100
let target = 0
let isFourthDown = false
let isTouchDown = false
let isFumble = false
let isInterception = false
const thirdDown = 3
const touchdown = 7
const fieldGoal = 3

const initDrive = () => {
    position = 25
    target = position + 10
    isFourthDown = false
    isTouchDown = false
    isFumble = false
    isInterception = false
}

const isFieldGoal = (position) => {
    return chance.weighted([0, 3], [100 - position, position])
}

const turnOver = (team, losingBallTeam) => {
    position = 100 - position
    target = position + 10
    executeDrive(team, losingBallTeam)
}

const fourthDownPlay = (team) => {
    isFourthDown = true
    if (position < 60) {
        team.stats.punts = team.stats.punts + 1
    } else {
        if (isFieldGoal(position) === 3) {
            team.stats.fieldGoals += 1
        } else {
            team.stats.missedFieldGoals += 1
        }
    }
}

const play = () => {
    let play = chance.weighted(
        ['incompletion', 'completion', 'loss', 'fumble', 'interception'],
        [30, 60, 9.4, 0.3, 0.3]
    )
    switch (play) {
        case 'completion':
            return chance.weighted(
                [1, 3, 6, 8, 10, 13, 15, 17, 20, 30],
                [77, 75, 70, 65, 60, 55, 50, 40, 30, 15]
            )
        case 'fumble':
            return -1
        case 'interception':
            return -2
        default:
            return 0
    }
}

const checkInterception = (teamToPlay, turnOverTeam) => {
    if (isInterception === true) {
        teamToPlay.stats.interception += 1
        turnOver(turnOverTeam, teamToPlay)
    }
}

const checkFumble = (teamToPlay, turnOverTeam) => {
    if (isFumble === true) {
        teamToPlay.stats.fumble += 1
        turnOver(turnOverTeam, teamToPlay)
    }
}

const checkCompletion = (gainedYards, teamToPlay) => {
    if (gainedYards > 0) {
        teamToPlay.stats.completions = teamToPlay.stats.completions + 1
        teamToPlay.stats.yards += gainedYards
        position += gainedYards
    }
}

const executeDrive = (teamToPlay, turnOverTeam) => {
    initDrive()
    while (!isFourthDown && !isTouchDown && !isFumble && !isInterception) {
        for (let down = 1; down < 4; down++) {
            teamToPlay.stats.attempts = teamToPlay.stats.attempts + 1
            let gainedYards = play()

            switch (gainedYards) {
                case -1:
                    isFumble = true
                    break
                case -2:
                    isInterception = true
                    break
                default:
                    checkCompletion(gainedYards, teamToPlay)
            }

            if (isFumble || isInterception) {
                break
            }

            if (position >= endZone) {
                teamToPlay.stats.touchDowns += 1
                isTouchDown = true
                break
            }

            if (position >= target) {
                target = position + 10
                break
            } else if (down === thirdDown) {
                fourthDownPlay(teamToPlay)
            }
        }
    }
    checkFumble(teamToPlay, turnOverTeam)
    checkInterception(teamToPlay, turnOverTeam)
}

exports.getScore = (game) => {
    game.homeTeam.stats.drives = chance.natural({ min: 10, max: 13 })
    game.awayTeam.stats.drives = chance.natural({ min: 10, max: 13 })

    let tossWinner = chance.natural({ min: 0, max: 1 })
    let tossLoser = 1 + -tossWinner

    let teams = [game.homeTeam, game.awayTeam]
    let tossWinnerTeamDrives = teams[tossWinner].stats.drives
    let tossLoserTeamDrives = teams[tossLoser].stats.drives

    while (tossWinnerTeamDrives > 0 || tossLoserTeamDrives > 0) {
        if (tossWinnerTeamDrives > 0) {
            executeDrive(teams[tossWinner], teams[tossLoser])
            tossWinnerTeamDrives -= 1
        }
        if (tossLoserTeamDrives > 0) {
            executeDrive(teams[tossLoser], teams[tossWinner])
            tossLoserTeamDrives -= 1
        }
    }
    game.homeTeam.points =
        game.homeTeam.stats.touchDowns * touchdown +
        game.homeTeam.stats.fieldGoals * fieldGoal
    game.awayTeam.points =
        game.awayTeam.stats.touchDowns * touchdown +
        game.awayTeam.stats.fieldGoals * fieldGoal
}
