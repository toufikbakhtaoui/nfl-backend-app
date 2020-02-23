const express = require('express')
const mongoose = require('mongoose')
const config = require('../config/config')
const routes = require('./routes')

const app = express()

mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/', routes)

module.exports = app
