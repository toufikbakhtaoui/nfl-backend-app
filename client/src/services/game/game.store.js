import { reactive, computed } from '../../config/composition-api'
import gameService from '../game/game.service'

const state = reactive({
    games: [],
})

const loadGames = async (identifier, week) => {
    return await gameService.findGames(identifier, week)
}

const games = computed(() => state.games)

const setGames = (games) => {
    state.games = games
}

module.exports = {
    loadGames,
    games,
}
