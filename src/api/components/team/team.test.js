const request = require('supertest')
const app = require('../../../app')
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

describe('Team endpoint tests', () => {
    it('Should find team', async () => {
        const response = await request(app).get('/api/teams/1')

        expect(response.body.identifier).toBe(1)
        expect(response.body.name).toBe('patriots')
        expect(response.body.city).toBe('new england')
        expect(response.status).toBe(200)
    })

    it('Should not return a team not exists', async () => {
        const response = await request(app).get('/api/teams/198')

        expect(response.status).toBe(404)
        expect(response.body).toBe('No team was found')
    })

    it('Should return all teams', async () => {
        const response = await request(app).get('/api/teams')

        expect(response.body.length).toBe(32)
        expect(response.status).toBe(200)
    })

    it('Should not return any team', async () => {
        await cleanup()
        const response = await request(app).get('/api/teams')

        expect(response.body.length).toBe(0)
        expect(response.status).toBe(200)
    })
})
