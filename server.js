const { Document } = require('mongoose')
const app = require('./src/app')
const config = require('./src/config/config')
const logger = require('./src/config/winston.config')
const schedulerHelper = require('./src/helpers/scheduling/commons/scheduler.helper')

app.listen(config.server.port, async () => {
    logger.info(`Magic happens on port ${config.server.port}`)
    await schedulerHelper.initCareer()
})
