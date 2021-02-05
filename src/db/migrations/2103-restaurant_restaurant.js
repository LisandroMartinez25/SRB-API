'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurant = entities.restaurant.restaurant

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      restaurantRestaurant,
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
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        location: {
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
        schema: restaurantSchema
      }
    )
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable({ tableName: restaurantRestaurant, schema: restaurantSchema })
  }
}
