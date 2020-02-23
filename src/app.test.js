const request = require('supertest')
const { start, stop, cleanup } = require('./commons/test-helper')
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

describe('GET / ', () => {
    test('It should respond with Welcome to the nfl message', async () => {
        const response = await request(app).get('/')
        expect(response.body).toEqual({ message: 'Welcome to the nfl!' })
        expect(response.statusCode).toBe(200)
    })
})
