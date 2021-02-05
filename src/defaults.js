require('dotenv').config()

const defaults = {
  PORT: 4000,
  DEFAULT_LANG: 'es',
  DEFAULT_TIMEZONE: 'UTC',
  ENABLE_PLAYGROUND: 'false',
  ENABLE_TASKS: 'false'
}

const getValue = function (key, isFlag) {
  let value = process.env[key]
  if (typeof value === 'undefined') value = defaults[key]
  if (isFlag) return (value === 'true')
  return value
}

export default getValue
