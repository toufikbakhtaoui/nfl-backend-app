const Team = require('./team.model')
const logger = require('../../../config/winston.config')

const isDraw = (firstScore, secondScore) => {
    return firstScore === secondScore ? 1 : 0
}

const isWin = (firstScore, secondScore) => {
    return firstScore > secondScore ? 1 : 0
}

const updateOneStanding = async (season, rank, identifier, w, l, d, s, c) => {
    await Team.findOneAndUpdate(
        {
            identifier: identifier,
            'standings.season': season,
            'standings.rank': rank,
        },
        {
            $inc: {
                'standings.$.win': w,
                'standings.$.lost': l,
                'standings.$.draw': d,
                'standings.$.scored': s,
                'standings.$.conceded': c,
            },
        }
    )
}

exports.updateStats = async (games) => {
    for (let game of games) {
        await this.updateOneStats(
            game.homeTeam.identifier,
            isWin(game.homeTeam.points, game.awayTeam.points),
            isWin(game.awayTeam.points, game.homeTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.homeTeam.points,
            game.awayTeam.points
        )
        await this.updateOneStats(
            game.awayTeam.identifier,
            isWin(game.awayTeam.points, game.homeTeam.points),
            isWin(game.homeTeam.points, game.awayTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.awayTeam.points,
            game.homeTeam.points
        )
    }
}

exports.updateOneStats = async (identifier, w, l, d, s, c) => {
    await Team.findOneAndUpdate(
        {
            identifier: identifier,
        },
        {
            $inc: {
                'stats.win': w,
                'stats.lost': l,
                'stats.draw': d,
                'stats.scored': s,
                'stats.conceded': c,
            },
        }
    )
}

exports.updateRecords = async (games) => {
    for (let game of games) {
        logger.debug(
            'update record homeTeam ' +
                game.homeTeam.name +
                ' awayTeam ' +
                game.awayTeam.name
        )
        await this.updateOneRecord(
            game.homeTeam.identifier,
            isWin(game.homeTeam.points, game.awayTeam.points),
            isWin(game.awayTeam.points, game.homeTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.homeTeam.points,
            game.awayTeam.points
        )
        await this.updateOneRecord(
            game.awayTeam.identifier,
            isWin(game.awayTeam.points, game.homeTeam.points),
            isWin(game.homeTeam.points, game.awayTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.awayTeam.points,
            game.homeTeam.points
        )
    }
}

exports.updateOneRecord = async (identifier, w, l, d, s, c) => {
    await Team.findOneAndUpdate(
        {
            identifier: identifier,
        },
        {
            $inc: {
                'record.win': w,
                'record.lost': l,
                'record.draw': d,
                'record.scored': s,
                'record.conceded': c,
            },
        }
    )
}

exports.updateStandings = async (games, season) => {
    for (let game of games) {
        await updateOneStanding(
            season,
            game.homeTeam.rank,
            game.homeTeam.identifier,
            isWin(game.homeTeam.points, game.awayTeam.points),
            isWin(game.awayTeam.points, game.homeTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.homeTeam.points,
            game.awayTeam.points
        )
        await updateOneStanding(
            season,
            game.awayTeam.rank,
            game.awayTeam.identifier,
            isWin(game.awayTeam.points, game.homeTeam.points),
            isWin(game.homeTeam.points, game.awayTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.awayTeam.points,
            game.homeTeam.points
        )
    }
}

exports.getStandingsByDivision = async (season) => {
    return Team.aggregate([
        { $unwind: '$standings' },
        {
            $match: {
                'standings.season': season,
            },
        },
        {
            $sort: {
                'standings.win': -1,
                'standings.draw': -1,
                'standings.scored': -1,
                'standings.conceded': 1,
            },
        },
        {
            $group: {
                _id: {
                    conference: '$conference',
                    division: '$division',
                },
                teams: {
                    $push: {
                        identifier: '$identifier',
                        city: '$city',
                        name: '$name',
                        stadium: '$stadium',
                        rank: '$standings.rank',
                        win: '$standings.win',
                        lost: '$standings.lost',
                        draw: '$standings.draw',
                        scored: '$standings.scored',
                        conceded: '$standings.conceded',
                    },
                },
            },
        },
    ])
}

exports.getStandings = async (season) => {
    return Team.aggregate([
        { $unwind: '$standings' },
        {
            $match: {
                'standings.season': season,
            },
        },
        {
            $sort: {
                'standings.win': -1,
                'standings.draw': -1,
                'standings.scored': -1,
                'standings.conceded': 1,
            },
        },
    ])
}

exports.insertStandings = async (standings, newSeasonIdentifier) => {
    const teamsPerDivision = 4
    standings.forEach(async (div) => {
        div.teams.forEach(async (team, i) => {
            const currentTeam = await Team.findOne({
                identifier: team.identifier,
            })
            const currentSeasonStandings = currentTeam.standings.find(
                (standing) => standing.season === newSeasonIdentifier - 1
            )
            const modulus = currentSeasonStandings.rank % teamsPerDivision
            const dividing = Math.floor(
                currentSeasonStandings.rank / teamsPerDivision
            )
            const division = modulus === 0 ? dividing : dividing + 1
            const newRank = (division - 1) * teamsPerDivision + i + 1
            let newStanding = {
                season: newSeasonIdentifier,
                rank: newRank,
                win: 0,
                lost: 0,
                draw: 0,
                scored: 0,
                conceded: 0,
            }
            currentTeam.standings.push(newStanding)
            await currentTeam.save()
        })
    })
}
