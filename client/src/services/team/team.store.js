import { reactive, computed } from '../../config/composition-api'
import teamService from './team.service'

const state = reactive({
    teams: [],
})

const loadTeams = async () => {
    const teams = await teamService.findAllTeams()
    setTeams(teams)
}

const setTeams = (teams) => {
    state.teams = teams
}

const teams = computed(() => state.teams)

const afcNorth = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'afc' && team.division === 'north'
    )
)
const afcSouth = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'afc' && team.division === 'south'
    )
)
const afcEast = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'afc' && team.division === 'east'
    )
)
const afcWest = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'afc' && team.division === 'west'
    )
)

const nfcNorth = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'nfc' && team.division === 'north'
    )
)
const nfcSouth = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'nfc' && team.division === 'south'
    )
)
const nfcEast = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'nfc' && team.division === 'east'
    )
)
const nfcWest = computed(() =>
    state.teams.filter(
        (team) => team.conference === 'nfc' && team.division === 'west'
    )
)

module.exports = {
    loadTeams,
    teams,
    // afcNorth,
    // afcSouth,
    // afcEast,
    // afcWest,
    // nfcNorth,
    // nfcSouth,
    // nfcEast,
    // nfcWest
}
