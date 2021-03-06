const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const config = require('../config/config')
const routes = require('./routes')

const app = express()

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
}

app.use(cors())

app.route('/').get((req, res) => {
    res.json({ message: 'Welcome to the nfl!' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', routes)
app.use(express.static('client/dist'))
module.exports = app
