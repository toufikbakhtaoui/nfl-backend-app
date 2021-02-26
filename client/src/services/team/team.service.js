import axios from '../../config/axios.config'

const findOneTeam = async (teamIdentifier) => {
    const teams = await axios.get('/teams/' + teamIdentifier)
    return teams.data
}

const findAllTeams = async () => {
    const teams = await axios.get('/teams/')
    return teams.data
}

const findTeamsByDivision = async (seasonIdentifier) => {
    const teams = await axios.get('/teams/seasons/' + seasonIdentifier + '/divisions')
    return teams.data
}

module.exports = {
    findOneTeam,
    findAllTeams,
    findTeamsByDivision
}
