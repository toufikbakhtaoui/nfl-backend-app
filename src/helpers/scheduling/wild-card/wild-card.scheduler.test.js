const Team = require('../../../api/components/team/team.model')
const wildCardScheduler = require('./wild-card.scheduler')
const schedulerHelper = require('../commons/scheduler.helper')

const teamService = require('../../../api/components/team/team.service')
const {
    start,
    stop,
    cleanup,
    teamSetup,
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
})

describe('Wild card generation', () => {
    it('Should generate wild card', async () => {
        const season = 1
        const standings = await teamService.getStandingsByDivision(season)
        const afcStandings = standings.filter(
            (conference) => conference._id.conference === 'afc'
        )
        const champions = schedulerHelper.getChampions(afcStandings)
        const contenders = schedulerHelper.getContenders(afcStandings)
        const games = wildCardScheduler.generateWildCard(
            champions,
            contenders,
            1
        )
        expect(games[0].homeTeam.name).toBe('patriots')
        expect(games[0].awayTeam.name).toBe('bills')

        expect(games[1].homeTeam.name).toBe('jaguars')
        expect(games[1].awayTeam.name).toBe('raiders')
    })
})
