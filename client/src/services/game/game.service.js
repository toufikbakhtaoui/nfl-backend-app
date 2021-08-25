import axios from '../../config/axios.config'

const findGames = async (seasonIdentifier, weekToFind, teamToFind) => {
    let query = ''
    const season =
        seasonIdentifier != null && seasonIdentifier != undefined
            ? 'season=' + seasonIdentifier
            : null
    const week =
        weekToFind != null && weekToFind != undefined
            ? 'week=' + weekToFind
            : null

    const team =
        teamToFind != null && teamToFind != undefined
            ? 'team=' + teamToFind
            : null

    query = season != null ? query.concat('?').concat(season) : query

    query = week != null && query != '' ? query.concat('&').concat(week) : query
    query = week != null && query == '' ? query.concat('?').concat(week) : query

    query = team != null && query != '' ? query.concat('&').concat(team) : query
    query = team != null && query == '' ? query.concat('?').concat(team) : query

    const games = await axios.get('/games' + query)
    return games.data
}

const playGames = async (seasonIdentifier, week) => {
    const games = await axios.get(
        '/games/scores/season/' + seasonIdentifier + '/week/' + week
    )
    return games.data
}

module.exports = {
    findGames,
    playGames,
}
