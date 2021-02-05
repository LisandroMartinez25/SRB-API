'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogTable = entities.catalog.table

module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    catalogTable,
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
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      seats: {
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
      schema: catalogSchema,
      freezeTableName: true
    }
  )

  Table.associate = function (models) {
    Table.hasMany(models.RestaurantTable, {
      as: 'restaurantTables',
      foreignKey: 'table_id',
      sourceKey: 'id'
    })

    Table.hasMany(models.RestaurantDiner, {
      as: 'restaurantDiners',
      foreignKey: 'table_id',
      sourceKey: 'id'
    })
  }

  return Table
}
