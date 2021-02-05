'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantDinerDietary = entities.restaurant.dinerDietary
const restaurantDiner = entities.restaurant.diner
const catalogSchema = entities.catalog._schema
const catalogeDietary = entities.catalog.dietary

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      restaurantDinerDietary,
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.fn(entities.defaults.uuid)
        },
        index: {
          type: Sequelize.INTEGER,
          unique: false,
          allowNull: false
        },
        dietary_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: catalogSchema,
            tableName: catalogeDietary
          }
        },
        diner_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: restaurantSchema,
            tableName: restaurantDiner
          }
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
        schema: restaurantSchema
      }
    )
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable({ tableName: restaurantDinerDietary, schema: restaurantSchema })
  }
}
