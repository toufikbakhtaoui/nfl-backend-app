const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Season = require('../../api/components/season/season.model')
const Team = require('../../api/components/team/team.model')
const Game = require('../../api/components/game/game.model')
const teamsHelper = require('../test/api-test.teams.helper')
const gameHelper = require('../test/api-test.games.helper')

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
    let insertedTeams = []
    const teams = teamsHelper.getTestTeams()
    teams.forEach((team) => {
        insertedTeams.push(new Team(team))
    })
    await Team.insertMany(insertedTeams)
}

const gameSetup = async () => {
    const games = gameHelper.getTestGames()
    await Game.insertMany(games)
}

module.exports = {
    start,
    stop,
    cleanup,
    seasonSetup,
    teamSetup,
    gameSetup,
}
