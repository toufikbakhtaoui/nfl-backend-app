const mongoose = require('mongoose')

const seasonSchema = new mongoose.Schema(
    {
        identifier: {
            type: Number,
            required: true,
            unique: true,
        },
        week: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Season', seasonSchema)
