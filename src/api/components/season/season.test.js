const request = require('supertest')
const app = require('../../../app')
const {
    start,
    stop,
    cleanup,
    seasonSetup,
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
    await seasonSetup()
})

describe('Season endpoint tests', () => {
    it('Should return a season', async () => {
        const response = await request(app).get('/api/seasons/1')

        expect(response.body.identifier).toBe(1)
        expect(response.body.week).toBe(16)
        expect(response.status).toBe(200)
    })

    it('Should not return a season not exists', async () => {
        const response = await request(app).get('/api/seasons/198')

        expect(response.status).toBe(404)
        expect(response.body).toBe('No season was found')
    })

    it('Should return all seasons', async () => {
        const response = await request(app).get('/api/seasons')

        expect(response.body.length).toBe(2)
        expect(response.status).toBe(200)
    })

    it('Should not return any season', async () => {
        await cleanup()
        const response = await request(app).get('/api/seasons')

        expect(response.body.length).toBe(0)
        expect(response.status).toBe(200)
    })
})
