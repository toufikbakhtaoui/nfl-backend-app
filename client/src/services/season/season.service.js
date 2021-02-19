import axios from '../../config/axios.config'

const findOneSeason = async (seasonIdentifier) => {
    const season = await axios.get('/seasons/' + seasonIdentifier)
    return season.data
}

const findAllSeasons = async () => {
    const season = await axios.get('/seasons/')
    return season.data
}

module.exports = {
    findOneSeason,
    findAllSeasons,
}
