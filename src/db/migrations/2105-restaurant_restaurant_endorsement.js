'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantEndorsement = entities.restaurant.restaurantEndorsement
const restaurantRestaurant = entities.restaurant.restaurant
const catalogSchema = entities.catalog._schema
const catalogEndorsement = entities.catalog.endorsement

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      restaurantRestaurantEndorsement,
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
        endorsement_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: catalogSchema,
            tableName: catalogEndorsement
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
    return queryInterface.dropTable({ tableName: restaurantRestaurantEndorsement, schema: restaurantSchema })
  }
}
