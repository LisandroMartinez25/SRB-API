'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantTable = entities.restaurant.restaurantTable

module.exports = (sequelize, DataTypes) => {
  const RestaurantTable = sequelize.define(
    restaurantRestaurantTable,
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
      restaurantId: {
        field: 'restaurant_id',
        type: DataTypes.UUID,
        allowNull: false
      },
      tableId: {
        field: 'table_id',
        type: DataTypes.UUID,
        allowNull: false
      },
      tables: {
        type: DataTypes.INTEGER,
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

  RestaurantTable.associate = function (models) {
    RestaurantTable.belongsTo(models.Restaurant, {
      as: 'restaurant',
      foreignKey: 'restaurant_id',
      sourceKey: 'id'
    })

    RestaurantTable.belongsTo(models.Table, {
      as: 'table',
      foreignKey: 'table_id',
      sourceKey: 'id'
    })
  }

  return RestaurantTable
}
