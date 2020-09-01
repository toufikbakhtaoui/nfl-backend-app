const teamService = require('./team.service')
const Game = require('../game/game.model')
const Team = require('../team/team.model')
const scoringHelper = require('../../../helpers/scoring/scoring.helper')
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

describe('Team service tests', () => {
    it('Should return standings', async () => {
        const season = 1
        const standings = await teamService.getStandings(season)
        const ravens = standings.find((team) => team.name === 'ravens')
        const colts = standings.find((team) => team.name === 'colts')
        const _49ers = standings.find((team) => team.name === '49ers')

        expect(ravens.standings.win).toBe(13)
        expect(colts.standings.conceded).toBe(250)
        expect(_49ers.standings.rank).toBe(30)
    })

    it('Should return standings by division', async () => {
        const season = 1
        const standings = await teamService.getStandingsByDivision(season)
        const afcNorth = standings.find(
            (element) =>
                element._id.conference === 'afc' &&
                element._id.division === 'north'
        )
        const nfcWest = standings.find(
            (element) =>
                element._id.conference === 'nfc' &&
                element._id.division === 'west'
        )
        const nfcEast = standings.find(
            (element) =>
                element._id.conference === 'nfc' &&
                element._id.division === 'east'
        )
        expect(afcNorth.teams[0].name).toBe('ravens')
        expect(nfcWest.teams[2].name).toBe('seahawks')
        expect(nfcEast.teams[3].lost).toBe(15)
    })

    it('Should update standings', async () => {
        const season = 1
        const week = 16
        const games = await Game.find({ season: season, week: week })
        const patriots = await Team.findOne({
            identifier: 1,
            'standings.rank': 1,
            'standings.season': season,
        })
        const playedGames =
            patriots.standings[0].win +
            patriots.standings[0].lost +
            patriots.standings[0].draw

        for (let game of games) {
            scoringHelper.getScore(game)
            await game.save()
        }
        await teamService.updateStandings(games, season)
        const patriotsUpdated = await Team.findOne({
            identifier: 1,
            'standings.rank': 1,
            'standings.season': season,
        })
        const updatedPlayedGames =
            patriotsUpdated.standings[0].win +
            patriotsUpdated.standings[0].lost +
            patriotsUpdated.standings[0].draw

        expect(playedGames).toBe(15)
        expect(updatedPlayedGames).toBe(16)
        expect(patriotsUpdated.standings[0].season).toBe(season)
    })
})
