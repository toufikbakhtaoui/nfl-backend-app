const request = require('supertest')
const app = require('../../../app')
const Game = require('./game.model')
const {
    start,
    stop,
    cleanup,
    gameSetup,
    seasonSetup,
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
    await gameSetup()
    await seasonSetup()
    await teamSetup()
})

describe('Game endpoint tests', () => {
    it('Should find game', async () => {
        const response = await request(app).get('/api/games?season=1&week=16')
        const games = response.body
        const aGameWithADifferentWeek = games.filter((game) => game.week !== 16)
        const allGamesOfWantedWeek = games.filter((game) => game.week === 16)

        expect(games[0].homeTeam.rank).toBe(1)
        expect(games[0].awayTeam.rank).toBe(2)
        expect(games[12].homeTeam.rank).toBe(25)
        expect(games[12].awayTeam.rank).toBe(26)
        expect(games.length).toBe(16)

        expect(aGameWithADifferentWeek.length).toBe(0)
        expect(allGamesOfWantedWeek.length).toBe(16)

        expect(response.status).toBe(200)
    })

    it('Should not return a game not exists', async () => {
        const response = await request(app).get('/api/games?season=1&week=34')
        expect(response.status).toBe(404)
        expect(response.body).toEqual('No game was found')
    })

    it('Should update season after playing a game', async () => {
        await request(app).get('/api/games/scores?season=1&week=16')

        const updatedSeason = await request(app).get(
            '/api/seasons?identifier=1'
        )
        expect(updatedSeason.body.identifier).toBe(1)
        expect(updatedSeason.body.week).toBe(17)
    })

    it('Should update standings after playing a game', async () => {
        const patriots = await request(app).get('/api/teams/1')
        expect(patriots.body.name).toEqual('patriots')
        expect(patriots.body.identifier).toEqual(1)
        const playedGames =
            patriots.body.standings[0].win +
            patriots.body.standings[0].lost +
            patriots.body.standings[0].draw
        expect(playedGames).toEqual(15)

        await request(app).get('/api/games/scores?season=1&week=16')

        const updatedPatriots = await request(app).get('/api/teams/1')
        expect(updatedPatriots.body.name).toEqual('patriots')
        expect(updatedPatriots.body.identifier).toEqual(1)

        const updatedPlayedGames =
            updatedPatriots.body.standings[0].win +
            updatedPatriots.body.standings[0].lost +
            updatedPatriots.body.standings[0].draw
        expect(updatedPlayedGames).toEqual(16)
    })

    it('Should add wildCard games after playing the last game of regular season', async () => {
        const wildCardGames = await request(app).get(
            '/api/games?season=1&week=17'
        )
        expect(wildCardGames.body).toEqual('No game was found')

        await request(app).get('/api/games/scores?season=1&week=16')

        const updatedWildCardGames = await request(app).get(
            '/api/games?season=1&week=17'
        )
        const games = updatedWildCardGames.body
        expect(games.length).toEqual(4)
    })

    it('Should add divisional games', async () => {
        const regularSeason = await request(app).get(
            '/api/games/scores?season=1&week=16'
        )
        const wildCard = await request(app).get(
            '/api/games/scores?season=1&week=17'
        )

        const divisional = await request(app).get('/api/games?season=1&week=18')
        expect(divisional.body.length).toEqual(4)
    })

    it('Should add championship games after playing divisional games', async () => {
        const regularSeason = await request(app).get(
            '/api/games/scores?season=1&week=16'
        )
        const wildCard = await request(app).get(
            '/api/games/scores?season=1&week=17'
        )
        const divisional = await request(app).get(
            '/api/games/scores?season=1&week=18'
        )

        const championship = await request(app).get(
            '/api/games?season=1&week=19'
        )
        expect(championship.body.length).toEqual(2)
    })

    it('Should add superbowl games after playing championship games', async () => {
        const regularSeason = await request(app).get(
            '/api/games/scores?season=1&week=16'
        )
        const wildCard = await request(app).get(
            '/api/games/scores?season=1&week=17'
        )
        const divisional = await request(app).get(
            '/api/games/scores?season=1&week=18'
        )
        const championship = await request(app).get(
            '/api/games/scores?season=1&week=19'
        )
        const superBowl = await request(app).get('/api/games?season=1&week=20')
        expect(superBowl.body.length).toEqual(1)
    })

    it('Should add new season games after playing superBowl', async () => {
        await request(app).get('/api/games/scores?season=1&week=16')
        await request(app).get('/api/games/scores?season=1&week=17')
        await request(app).get('/api/games/scores?season=1&week=18')
        await request(app).get('/api/games/scores?season=1&week=19')

        await request(app).get('/api/games/scores?season=1&week=20')

        const newRegularSeason = await request(app).get(
            '/api/seasons?identifier=2'
        )
        expect(newRegularSeason.body.week).toEqual(1)

        const teams = await request(app).get('/api/teams')
        expect(teams.body.length).toEqual(32)

        const teamStandings = teams.body[0].standings
        const seasonTwoStandings = teamStandings.find(
            (standing) => standing.season === 2
        )
        expect(seasonTwoStandings.win).toBe(0)
        expect(seasonTwoStandings.lost).toBe(0)
        expect(seasonTwoStandings.draw).toBe(0)
        expect(seasonTwoStandings.scored).toBe(0)
        expect(seasonTwoStandings.conceded).toBe(0)

        const games = await Game.find({ season: 2 })
        expect(games.length).toBe(256)
    })
})
