const app = require('./src/app')
const config = require('./config')
const logger = require('./winston.config')

app.listen(config.server.port, () => {
    logger.info(`Magic happens on port ${config.server.port}`)
})
