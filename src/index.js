import defaults from './defaults'
import app from './datasources/index'
import logger from './logger'

const port = defaults('PORT')
const tasksEnabled = defaults('ENABLE_TASKS', true)
const defaultTimezone = defaults('DEFAULT_TIMEZONE')

app.listen(port, () => {
  logger.info(`🚀 App ready at port ${ port }`)
});
