require('dotenv').config()

const defaults = {
  DEFAULT_TIMEZONE: 'UTC'
}

const getValue = function (key, isFlag) {
  let value = process.env[key]
  if (typeof value === 'undefined') value = defaults[key]
  if (isFlag) return (value === 'true')
  return value
}

module.exports = getValue
