const Game = require('../../../api/components/game/game.model')
const divisionalScheduler = require('./divisional.scheduler')
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

describe('Divisional generation', () => {
    it('Should generate divisional', async () => {
        const season = 2
        const week = 17
        const standingsByDivision = await teamService.getStandingsByDivision(
            season
        )
        const afcStandings = standingsByDivision.filter(
            (conference) => conference._id.conference === 'afc'
        )
        const champions = schedulerHelper.getChampions(afcStandings)
        const wildCardGames = await Game.find({ season: season, week: week })
        const standings = await teamService.getStandings(season)
        const wildCardWinners = schedulerHelper.getWinners(
            wildCardGames,
            standings
        )
        const divisionalGames = divisionalScheduler.generateDivisional(
            champions,
            wildCardWinners,
            season
        )
        expect(divisionalGames[0].homeTeam.name).toBe('ravens')
        expect(divisionalGames[0].awayTeam.name).toBe('bills')
        expect(divisionalGames[1].homeTeam.name).toBe('chiefs')
        expect(divisionalGames[1].awayTeam.name).toBe('raiders')
    })
})
