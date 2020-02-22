const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')

describe('GET / ', () => {
    test('It should respond with Welcome to the nfl message', async () => {
        const response = await request(app).get('/')
        expect(response.body).toEqual({ message: 'Welcome to the nfl!' })
        expect(response.statusCode).toBe(200)
        mongoose.connection.close()
    })
})
