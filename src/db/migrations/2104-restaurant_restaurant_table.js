'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantTable = entities.restaurant.restaurantTable
const restaurantRestaurant = entities.restaurant.restaurant
const catalogSchema = entities.catalog._schema
const catalogTable = entities.catalog.table

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      restaurantRestaurantTable,
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
        tables: {
          type: Sequelize.INTEGER,
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
        schema: restaurantSchema
      }
    )
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable({ tableName: restaurantRestaurantTable, schema: restaurantSchema })
  }
}
