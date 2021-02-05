'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema

module.exports = {
  up: (queryInterface, Sequelize) => {
    const createSchema = 'CREATE SCHEMA IF NOT EXISTS'
    return Promise.all([
      queryInterface.sequelize.query(`${createSchema} ${catalogSchema};`)
    ])
  },

  down: (queryInterface, _) => {
    const dropSchema = 'DROP SCHEMA IF EXISTS'
    return Promise.all([
      queryInterface.sequelize.query(`${dropSchema} ${catalogSchema};`)
    ])
  }
}
