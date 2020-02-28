const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Season = require('../api/components/season/season.model')

const server = new MongoMemoryServer()

const start = async () => {
    const mongoUri = await server.getConnectionString()
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
}

const stop = async () => {
    await mongoose.disconnect()
    await server.stop()
}

const cleanup = async () => {
    await mongoose.connection.db.dropDatabase()
}

const seasonSetup = async () => {
    const seasonOne = new Season({ identifier: 1, week: 1 })
    const seasonTwo = new Season({ identifier: 2, week: 1 })
    await Season.insertMany([seasonOne, seasonTwo])
}

module.exports = {
    start,
    stop,
    cleanup,
    seasonSetup,
}
