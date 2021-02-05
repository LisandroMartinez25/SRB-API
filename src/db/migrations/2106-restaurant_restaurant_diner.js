'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantDiner = entities.restaurant.restaurantDiner
const restaurantDiner = entities.restaurant.diner
const restaurantRestaurant = entities.restaurant.restaurant
const catalogSchema = entities.catalog._schema
const catalogTable = entities.catalog.table

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      restaurantRestaurantDiner,
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
        diner_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: restaurantSchema,
            tableName: restaurantDiner
          }
        },
        restaurant_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: restaurantSchema,
            tableName: restaurantRestaurant
          }
        },
        table_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: catalogSchema,
            tableName: catalogTable
          }
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false
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
    return queryInterface.dropTable({ tableName: restaurantRestaurantDiner, schema: restaurantSchema })
  }
}
