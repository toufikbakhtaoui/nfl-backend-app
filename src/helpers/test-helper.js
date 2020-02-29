const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Season = require('../api/components/season/season.model')
const Team = require('../api/components/team/team.model')
const Game = require('../api/components/game/game.model')

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

const teamSetup = async () => {
    const teamOne = new Team({
        identifier: 1,
        name: 'Ravens',
        city: 'Baltimore',
        conference: 'afc',
        division: 'north',
    })

    const teamTwo = new Team({
        identifier: 2,
        name: 'Dolphins',
        city: 'Miami',
        conference: 'afc',
        division: 'east',
    })
    await Team.insertMany([teamOne, teamTwo])
}

const gameSetup = async () => {
    const gameOne = new Game({
        season: 1,
        week: 1,
        homeTeam: 12,
        awayTeam: 19,
        homeTeamPoints: 43,
        awayTeamPoints: 11,
    })

    const gameTwo = new Game({
        season: 1,
        week: 2,
        homeTeam: 13,
        awayTeam: 9,
        homeTeamPoints: 30,
        awayTeamPoints: 15,
    })

    await Game.insertMany([gameOne, gameTwo])
}

module.exports = {
    start,
    stop,
    cleanup,
    seasonSetup,
    teamSetup,
    gameSetup,
}
