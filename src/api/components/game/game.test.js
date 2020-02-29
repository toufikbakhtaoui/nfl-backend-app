const request = require('supertest')
const app = require('../../../app')
const {
    start,
    stop,
    cleanup,
    gameSetup,
} = require('../../../helpers/test-helper')

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
})

describe('Game endpoint tests', () => {
    it('Should find game', async () => {
        const response = await request(app).get('/api/games/season/1/week/1')
        expect(response.body.homeTeam).toBe(12)
        expect(response.body.awayTeam).toBe(19)
        expect(response.body.homeTeamPoints).toBe(43)
        expect(response.body.awayTeamPoints).toBe(11)
        expect(response.status).toBe(200)
    })

    it('Should not return a game not exists', async () => {
        const response = await request(app).get('/api/games/season/1/week/34')
        expect(response.status).toBe(404)
        expect(response.body).toEqual('No game was found')
    })
})
