import axios from '../../config/axios.config'

const findGames = async (seasonIdentifier, week) => {
    const games = await axios.get(
        '/games/season/' + seasonIdentifier + '/week/' + week
    )
    return games.data
}

const findGamesByWeek = async (week) => {
    const games = await axios.get('/games/week/' + week)
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
    findGamesByWeek,
}
