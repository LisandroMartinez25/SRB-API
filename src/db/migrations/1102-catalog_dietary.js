'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogeDietary = entities.catalog.dietary

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      catalogeDietary,
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.fn(entities.defaults.uuid)
        },
        index: {
          type: Sequelize.INTEGER,
          unique: true,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn(entities.defaults.date)
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn(entities.defaults.date)
        }
      },
      {
        schema: catalogSchema
      }
    )
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable({ tableName: catalogeDietary, schema: catalogSchema })
  }
}
