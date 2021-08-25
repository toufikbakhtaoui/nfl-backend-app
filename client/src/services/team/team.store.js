import { reactive, computed } from '../../config/composition-api'
import teamService from './team.service'

const state = reactive({
    teams: [],
    teamsByDivision: [],
})

exports.loadTeams = async () => {
    const teams = await teamService.findAllTeams()
    setTeams(teams)
}

const setTeams = (teams) => {
    state.teams = teams
}

exports.teams = computed(() => state.teams)

exports.loadTeamsByDivision = async (seasonIdentifier) => {
    const teams = await teamService.findTeamsByDivision(seasonIdentifier)
    setTeamsByDivision(teams)
}

const setTeamsByDivision = (teams) => {
    state.teamsByDivision = teams
}

exports.teamsByDivision = computed(() => state.teamsByDivision)
