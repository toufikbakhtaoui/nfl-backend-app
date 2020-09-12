const app = require('./src/app')
const config = require('./config/config')
const logger = require('./config/winston.config')
const schedulerHelper = require('./src/helpers/scheduling/commons/scheduler.helper')

app.listen(config.server.port, async () => {
    logger.info(`Magic happens on port ${config.server.port}`)
    await schedulerHelper.initCareer()
})
