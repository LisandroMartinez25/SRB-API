'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurant = entities.restaurant.restaurant

module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    restaurantRestaurant,
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.fn(entities.defaults.uuid),
        get () {
          return this.getDataValue('index')
        }
      },
      privateId: {
        type: DataTypes.VIRTUAL,
        get () {
          return this.getDataValue('id')
        }
      },
      index: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      active: {
        field: 'is_active',
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: sequelize.fn(entities.defaults.date)
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: sequelize.fn(entities.defaults.date)
      }
    },
    {
      schema: restaurantSchema,
      freezeTableName: true
    }
  )

  Restaurant.associate = function (models) {
    Restaurant.hasMany(models.RestaurantTable, {
      as: 'restaurantTables',
      foreignKey: 'restaurant_id',
      sourceKey: 'id'
    })

    Restaurant.hasMany(models.RestaurantEndorsement, {
      as: 'restaurantEndorsements',
      foreignKey: 'restaurant_id',
      sourceKey: 'id'
    })

    Restaurant.hasMany(models.RestaurantDiner, {
      as: 'restaurantDiners',
      foreignKey: 'restaurant_id',
      sourceKey: 'id'
    })
  }

  return Restaurant
}
