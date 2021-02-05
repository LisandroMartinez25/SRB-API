'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantEndorsement = entities.restaurant.restaurantEndorsement

module.exports = (sequelize, DataTypes) => {
  const RestaurantEndorsement = sequelize.define(
    restaurantRestaurantEndorsement,
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
      endorsementId: {
        field: 'endorsement_id',
        type: DataTypes.UUID,
        allowNull: false
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

  RestaurantEndorsement.associate = function (models) {
    RestaurantEndorsement.belongsTo(models.Restaurant, {
      as: 'restaurant',
      foreignKey: 'restaurant_id',
      sourceKey: 'id'
    })

    RestaurantEndorsement.belongsTo(models.Endorsement, {
      as: 'endorsement',
      foreignKey: 'endorsement_id',
      sourceKey: 'id'
    })
  }

  return RestaurantEndorsement
}
