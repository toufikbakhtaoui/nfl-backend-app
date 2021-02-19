import { reactive, computed } from './config/composition-api'
import teamService from './services/team/team.service'
import seasonService from './services/season/season.service'

const state = reactive({
    teams: [],
    seasons: [],
})

//teams
const loadTeams = async () => {
    const teams = await teamService.findAllTeams()
    setTeams(teams)
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

const setTeams = (teams) => {
    state.teams = teams
}

//season
const loadSeasons = async () => {
    const seasons = await seasonService.findAllSeasons()
    setSeasons(seasons)
}

const seasons = computed(() => state.seasons)

const setSeasons = (seasons) => {
    state.seasons = seasons
}

const currentSeason = computed(() => state.seasons[state.seasons.length - 1])

export default {
    loadTeams,
    teams,
    afcNorth,
    afcSouth,
    afcEast,
    afcWest,
    nfcNorth,
    nfcSouth,
    nfcEast,
    nfcWest,
    loadSeasons,
    seasons,
    currentSeason,
}
