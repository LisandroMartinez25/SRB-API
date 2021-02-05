'use strict'
const entities = require('../config/entities')
const leaderFySchema = entities.restaurant._schema

module.exports = {
  up: (queryInterface, Sequelize) => {
    const createSchema = 'CREATE SCHEMA IF NOT EXISTS'
    return Promise.all([
      queryInterface.sequelize.query(`${createSchema} ${leaderFySchema};`)
    ])
  },

  down: (queryInterface, _) => {
    const dropSchema = 'DROP SCHEMA IF EXISTS'
    return Promise.all([
      queryInterface.sequelize.query(`${dropSchema} ${leaderFySchema};`)
    ])
  }
}
