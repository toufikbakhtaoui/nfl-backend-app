import { reactive, computed } from '../../config/composition-api'
import teamService from './team.service'

const state = reactive({
    teams: [],
    teamsByDivision: [],
})

const loadTeams = async () => {
    const teams = await teamService.findAllTeams()
    setTeams(teams)
}

const setTeams = (teams) => {
    state.teams = teams
}

const teams = computed(() => state.teams)

const loadTeamsByDivision = async (seasonIdentifier) => {
    const teams = await teamService.findTeamsByDivision(seasonIdentifier)
    setTeamsByDivision(teams)
}

const setTeamsByDivision = (teams) => {
    state.teamsByDivision = teams
}

const teamsByDivision = computed(() => state.teamsByDivision)

module.exports = {
    loadTeams,
    loadTeamsByDivision,
    teams,
    teamsByDivision,
}
