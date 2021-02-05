require('dotenv').config()
const defaults = require('./default')
const defaultTimezone = defaults('DEFAULT_TIMEZONE')

module.exports = {
  'production': {
    'dialect': process.env.DB_DIALECT,
    'host': process.env.DB_HOST,
    'username': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'logging': false,
    'timezone': defaultTimezone
  },
  'development': {
    'dialect': process.env.DEV_DB_DIALECT,
    'host': process.env.DEV_DB_HOST,
    'port': process.env.DEV_DB_PORT,
    'username': process.env.DEV_DB_USER,
    'password': process.env.DEV_DB_PASSWORD,
    'database': process.env.DEV_DB_DATABASE,
    'logging': process.env.DEV_DB_LOGGING !== 'false' ? console.log : false,
    'timezone': defaultTimezone
  },
  'test': {
    'dialect': process.env.TEST_DB_DIALECT,
    'host': process.env.TEST_DB_HOST,
    'username': process.env.TEST_DB_USER,
    'password': process.env.TEST_DB_PASSWORD,
    'database': process.env.TEST_DB_DATABASE
  }
}
