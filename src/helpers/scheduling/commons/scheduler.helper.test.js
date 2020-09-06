const schedulerHelper = require('./scheduler.helper')
const Game = require('../../../api/components/game/game.model')
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

describe('Scheduler helper', () => {
    it('Should return champions', async () => {
        const season = 1
        const standings = await teamService.getStandingsByDivision(season)
        const afcStandings = standings.filter(
            (conference) => conference._id.conference === 'afc'
        )
        const champions = schedulerHelper.getChampions(afcStandings)
        expect(champions[0].name).toBe('ravens')
        expect(champions[1].name).toBe('chiefs')
        expect(champions[2].name).toBe('patriots')
        expect(champions[3].name).toBe('jaguars')
    })

    it('Should return contenders', async () => {
        const season = 1
        const standings = await teamService.getStandingsByDivision(season)
        const afcStandings = standings.filter(
            (conference) => conference._id.conference === 'afc'
        )
        const contenders = schedulerHelper.getContenders(afcStandings)
        expect(contenders[0].name).toBe('raiders')
        expect(contenders[1].name).toBe('bills')
    })

    it('Should get winners', async () => {
        const season = 2
        const week = 17
        const standings = await teamService.getStandings(season)
        const games = await Game.find({ season: season, week: week })
        const winners = schedulerHelper.getWinners(games, standings)
        expect(winners[0].name).toBe('raiders')
        expect(winners[1].name).toBe('bills')
    })
})
