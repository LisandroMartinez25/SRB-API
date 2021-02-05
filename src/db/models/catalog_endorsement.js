'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogEndorsement = entities.catalog.endorsement

module.exports = (sequelize, DataTypes) => {
  const Endorsement = sequelize.define(
    catalogEndorsement,
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

  Endorsement.associate = function (models) {
    Endorsement.hasMany(models.EndorsementDietary, {
      as: 'endorsementDietaries',
      foreignKey: 'endorsement_id',
      sourceKey: 'id'
    })

    Endorsement.hasMany(models.RestaurantEndorsement, {
      as: 'restaurantEndorsements',
      foreignKey: 'endorsement_id',
      sourceKey: 'id'
    })
  }

  return Endorsement
}
