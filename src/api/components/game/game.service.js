const Game = require('./game.model')

exports.getGames = async (season, week, team) => {
    const query = {}
    if (season != null) {
        query.season = Number(season)
    }

    if (week != null) {
        query.week = Number(week)
    }

    if (team != null) {
        const teamId = Number(team)
        query.$or = [
            { 'homeTeam.identifier': teamId },
            { 'awayTeam.identifier': teamId },
        ]
    }

    return Game.find(query)
}
