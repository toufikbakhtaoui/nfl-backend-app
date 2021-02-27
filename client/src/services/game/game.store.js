import { reactive, computed } from '../../config/composition-api'
import gameService from '../game/game.service'

const state = reactive({
    games: [],
    superbowls: [],
})

const loadGames = async (identifier, week) => {
    const games = await gameService.findGames(identifier, week)
    setGames(games)
}

const loadSuperbowls = async () => {
    const superbowls = await gameService.findGamesByWeek(20)
    setSuperbowls(superbowls)
}

const playGames = async (identifier, week) => {
    const games = await gameService.playGames(identifier, week)
    setGames(games)
}

const games = computed(() => state.games)

const superbowls = computed(() => state.superbowls)

const setGames = (games) => {
    state.games = games
}

const setSuperbowls = (superbowls) => {
    state.superbowls = superbowls
}

module.exports = {
    loadGames,
    playGames,
    loadSuperbowls,
    games,
    superbowls,
}
