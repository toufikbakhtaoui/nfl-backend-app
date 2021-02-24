import { reactive, computed } from '../../config/composition-api'
import gameService from '../game/game.service'

const state = reactive({
    games: [],
})

const loadGames = async (identifier, week) => {
    const games = await gameService.findGames(identifier, week)
    setGames(games)
}

const playGames = async (identifier, week) => {
    const games = await gameService.playGames(identifier, week)
    setGames(games)
}

const games = computed(() => state.games)

const setGames = (games) => {
    state.games = games
}

module.exports = {
    loadGames,
    playGames,
    games,
}
