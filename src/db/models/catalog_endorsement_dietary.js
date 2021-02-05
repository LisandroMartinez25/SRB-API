'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogEndorsementDietary = entities.catalog.endorsementDietary

module.exports = (sequelize, DataTypes) => {
  const EndorsementDietary = sequelize.define(
    catalogEndorsementDietary,
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
      endorsementId: {
        field: 'dietary_id',
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
      schema: catalogSchema,
      freezeTableName: true
    }
  )

  EndorsementDietary.associate = function (models) {
    EndorsementDietary.belongsTo(models.Dietary, {
      as: 'dietary',
      foreignKey: 'dietary_id',
      sourceKey: 'id'
    })

    EndorsementDietary.belongsTo(models.Endorsement, {
      as: 'endorsement',
      foreignKey: 'endorsement_id',
      sourceKey: 'id'
    })
  }

  return EndorsementDietary
}
