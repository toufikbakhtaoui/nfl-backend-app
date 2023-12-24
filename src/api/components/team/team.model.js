const mongoose = require('mongoose')

const standingSchema = new mongoose.Schema({
    season: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    win: {
        type: Number,
    },
    lost: {
        type: Number,
    },
    draw: {
        type: Number,
    },
    scored: {
        type: Number,
    },
    conceded: {
        type: Number,
    },
})

const statsSchema = new mongoose.Schema({
    win: {
        type: Number,
    },
    lost: {
        type: Number,
    },
    draw: {
        type: Number,
    },
    scored: {
        type: Number,
    },
    conceded: {
        type: Number,
    },
})

const currentSeasonRecordSchema = new mongoose.Schema({
    win: {
        type: Number,
    },
    lost: {
        type: Number,
    },
    scored: {
        type: Number,
    },
    conceded: {
        type: Number,
    },
})

const finalsSchema = new mongoose.Schema({
    winner: {
        type: Number,
    },
    finalist: {
        type: Number,
    },
})

const divisionRecordSchema = new mongoose.Schema({
    champion: {
        type: Number,
    },
    second: {
        type: Number,
    },
    third: {
        type: Number,
    },
    last: {
        type: Number,
    },
})

const trophiesRecordSchema = new mongoose.Schema({
    superBowl: finalsSchema,
    conference: finalsSchema,
    divisionalRecord: divisionRecordSchema,
})

const teamSchema = new mongoose.Schema(
    {
        identifier: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        city: String,
        stadium: String,
        conference: {
            type: String,
            enum: ['afc', 'nfc'],
            required: true,
        },
        division: {
            type: String,
            enum: ['north', 'south', 'east', 'west'],
            required: true,
        },
        standings: [standingSchema],
        stats: statsSchema,
        record: currentSeasonRecordSchema,
        trophiesRecord: trophiesRecordSchema,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Team', teamSchema)
