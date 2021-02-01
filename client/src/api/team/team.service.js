import axios from '../../config/axios.config'

const findOneTeam = async (teamIdentifier) => {
    const team = await axios.get('/teams/' + teamIdentifier)
    return team.data
}

const findAllTeams = async () => {
    const team = await axios.get('/teams/')
    return team.data
}

module.exports = {
    findOneTeam,
    findAllTeams,
}
