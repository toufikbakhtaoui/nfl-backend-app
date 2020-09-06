const Game = require('../../../api/components/game/game.model')
const championshipScheduler = require('./championship.scheduler')
const schedulerHelper = require('../commons/scheduler.helper')
const teamService = require('../../../api/components/team/team.service')
const {
    start,
    stop,
    cleanup,
    teamSetup,
    gameSetup,
} = require('../../../helpers/test/api-test.helper')

beforeAll(async () => {
    await start()
})

afterAll(async () => {
    await stop()
})

afterEach(async () => {
    await cleanup()
})

beforeEach(async () => {
    await teamSetup()
    await gameSetup()
})

describe('Championship scheduler', () => {
    it('Should return championship games', async () => {
        const season = 2
        const week = 18
        const divisionalGames = await Game.find({ season: season, week: week })
        const standings = await teamService.getStandings(season)
        const winners = schedulerHelper.getWinners(divisionalGames, standings)
        const championshipGame = championshipScheduler.generateChampionship(
            winners,
            season
        )

        expect(championshipGame.homeTeam.name).toBe('ravens')
        expect(championshipGame.awayTeam.name).toBe('steelers')
    })
})
