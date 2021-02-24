import { reactive, computed } from '../../config/composition-api'
import seasonService from './season.service'

const state = reactive({
    seasons: [],
})

const loadSeasons = async () => {
    const seasons = await seasonService.findAllSeasons()
    setSeasons(seasons)
}

const seasons = computed(() => state.seasons)

const setSeasons = (seasons) => {
    state.seasons = seasons
}

const currentSeason = computed(() => state.seasons[state.seasons.length - 1])

module.exports = {
    loadSeasons,
    currentSeason,
}
