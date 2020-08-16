const Chance = require('chance')
const chance = new Chance()

let position = 0
let endZone = 100
let target = 0
let fourthDown = false
let touchDown = false
let fumbleOrInterception = false

const initDrive = () => {
    position = 25
    target = position + 10
    fourthDown = false
    touchDown = false
    fumbleOrInterception = false
}

const fieldGoal = (position) => {
    return chance.weighted([0, 3], [100 - position, position])
}

const turnOver = (team) => {
    position = 100 - position
    target = position + 10
    executeDrive(team)
}

const fourthDownPlay = (team) => {
    fourthDown = true
    const element =
        position < 60
            ? (team.stats.punts += 1)
            : fieldGoal(position) === 3
            ? (team.stats.fieldGoals += 1)
            : (team.stats.missedFieldGoals += 1)
}

const play = () => {
    let play = chance.weighted(
        ['incompletion', 'completion', 'loss', 'fumble', 'interception'],
        [25, 65, 9, 0.5, 0.5]
    )
    switch (play) {
        case 'completion':
            return chance.weighted(
                [1, 3, 6, 8, 10, 13, 15, 17, 20, 30],
                [77, 75, 70, 65, 60, 55, 50, 40, 30, 15]
            )
        case ('fumble', 'interception'):
            return -1
        default:
            return 0
    }
}

const executeDrive = (teamToPlay, turnOverTeam) => {
    initDrive()
    while (!fourthDown && !touchDown && !fumbleOrInterception) {
        for (let down = 1; down < 4; down++) {
            teamToPlay.stats.attempts += 1
            let gainedYards = play()
            if (gainedYards < 0) {
                fumbleOrInterception = true
                break
            }

            if (gainedYards > 0) {
                teamToPlay.stats.completions += 1
                teamToPlay.stats.yards += gainedYards
                position += gainedYards
            }

            if (position >= endZone) {
                teamToPlay.stats.touchDowns += 1
                touchDown = true
                break
            }

            if (position >= target) {
                target = position + 10
                break
            } else if (down === 3) {
                fourthDownPlay(teamToPlay)
            }
        }
    }
    if (fumbleOrInterception === true) {
        teamToPlay.stats.fumbleOrInterception += 1
        turnOver(turnOverTeam)
    }
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
        game.homeTeam.stats.touchDowns * 7 + game.homeTeam.stats.fieldGoals * 3
    game.awayTeam.points =
        game.awayTeam.stats.touchDowns * 7 + game.awayTeam.stats.fieldGoals * 3
}