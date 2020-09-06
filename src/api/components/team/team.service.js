const Team = require('./team.model')

const isDraw = (firstScore, secondScore) => {
    return firstScore === secondScore ? 1 : 0
}

const isWin = (firstScore, secondScore) => {
    return firstScore > secondScore ? 1 : 0
}

const updateOneStanding = async (season, team, w, l, d, s, c) => {
    await Team.findOneAndUpdate(
        { 'standings.rank': team, 'standings.season': season },
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

exports.updateStandings = async (games, season) => {
    for (let game of games) {
        await updateOneStanding(
            season,
            game.homeTeam.rank,
            isWin(game.homeTeam.points, game.awayTeam.points),
            isWin(game.awayTeam.points, game.homeTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.homeTeam.points,
            game.awayTeam.points
        )
        await updateOneStanding(
            season,
            game.awayTeam.rank,
            isWin(game.awayTeam.points, game.homeTeam.points),
            isWin(game.homeTeam.points, game.awayTeam.points),
            isDraw(game.homeTeam.points, game.awayTeam.points),
            game.awayTeam.points,
            game.homeTeam.points
        )
    }
}

exports.getStandingsByDivision = async (season) => {
    return await Team.aggregate([
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
                        team: '$team',
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
    return await Team.aggregate([
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
