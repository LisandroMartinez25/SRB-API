'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantDinerDietary = entities.restaurant.dinerDietary

module.exports = (sequelize, DataTypes) => {
  const DinerDietary = sequelize.define(
    restaurantDinerDietary,
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
      dietaryId: {
        field: 'dietary_id',
        type: DataTypes.UUID,
        allowNull: false
      },
      dinerId: {
        field: 'diner_id',
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

  DinerDietary.associate = function (models) {
    DinerDietary.belongsTo(models.Dietary, {
      as: 'dietary',
      foreignKey: 'dietary_id',
      sourceKey: 'id'
    })

    DinerDietary.belongsTo(models.Diner, {
      as: 'diner',
      foreignKey: 'diner_id',
      sourceKey: 'id'
    })
  }

  return DinerDietary
}
