const mongoose = require('mongoose')

const stats = new mongoose.Schema({
    drives: {
        type: Number,
        required: true,
    },
    punts: {
        type: Number,
        required: true,
    },
    fieldGoals: {
        type: Number,
        required: true,
    },
    missedFieldGoals: {
        type: Number,
        required: true,
    },
    attempts: {
        type: Number,
        required: true,
    },
    completions: {
        type: Number,
        required: true,
    },
    yards: {
        type: Number,
        required: true,
    },
    touchDowns: {
        type: Number,
        required: true,
    },
    fumbleOrInterception: {
        type: Number,
        required: true,
    },
})
const teamSchema = new mongoose.Schema({
    rank: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    identifier: {
        type: Number,
        required: false,
    },
    points: {
        type: Number,
    },
    stats: stats,
})
const gameSchema = new mongoose.Schema(
    {
        season: {
            type: Number,
            required: true,
        },
        week: {
            type: Number,
        },
        homeTeam: teamSchema,
        awayTeam: teamSchema,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Game', gameSchema)
