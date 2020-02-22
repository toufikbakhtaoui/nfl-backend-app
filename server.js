const app = require('./src/app')
const config = require('./config/config')
const logger = require('./config/winston.config')

app.listen(config.server.port, () => {
    logger.info(`Magic happens on port ${config.server.port}`)
})
