const request = require('supertest')
const { start, stop, cleanup } = require('./helpers/test/api-test.helper')
const app = require('./app')

beforeAll(async () => {
    await start()
})

afterAll(async () => {
    await stop()
})

afterEach(async () => {
    await cleanup()
})

describe('App testing', () => {
    it('Should respond with Welcome to the nfl message', async () => {
        const response = await request(app).get('/')
        expect(response.body).toEqual({ message: 'Welcome to the nfl!' })
        expect(response.statusCode).toBe(200)
    })

    it('Should failed when env not test ', () => {
        expect(process.env.NODE_ENV).toEqual('test')
    })
})
