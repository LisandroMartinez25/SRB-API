'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantDiner = entities.restaurant.diner

module.exports = (sequelize, DataTypes) => {
  const Diner = sequelize.define(
    restaurantDiner,
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
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
        allowNull: true
      },
      homeLocation: {
        field: 'home_location',
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

  Diner.associate = function (models) {
    Diner.hasMany(models.DinerDietary, {
      as: 'dinerDietaries',
      foreignKey: 'diner_id',
      sourceKey: 'id'
    })

    Diner.hasMany(models.RestaurantDiner, {
      as: 'restaurantDiners',
      foreignKey: 'diner_id',
      sourceKey: 'id'
    })
  }

  return Diner
}
