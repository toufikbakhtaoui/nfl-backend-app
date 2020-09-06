const Game = require('../../../api/components/game/game.model')
const superBowlScheduler = require('./superBowl.scheduler')
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

describe('SuperBowl scheduler', () => {
    it('Should return superBowl game', async () => {
        const season = 2
        const week = 19
        const championshipGames = await Game.find({
            season: season,
            week: week,
        })
        const standings = await teamService.getStandings(season)
        const winners = schedulerHelper.getWinners(championshipGames, standings)
        const superBowlGame = superBowlScheduler.generateSuperBowl(
            winners,
            season
        )

        expect(superBowlGame.homeTeam.name).toBe('ravens')
        expect(superBowlGame.awayTeam.name).toBe('jaguars')
    })
})
