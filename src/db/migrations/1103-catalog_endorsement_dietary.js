'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogeEndorsementDietary = entities.catalog.endorsementDietary
const catalogeDietary = entities.catalog.dietary
const catalogeEndorsement = entities.catalog.endorsement


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      catalogeEndorsementDietary,
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
        dietary_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: catalogSchema,
            tableName: catalogeDietary
          }
        },
        endorsement_id: {
          type: Sequelize.UUID,
          allowNull: false,
          model: {
            schema: catalogSchema,
            tableName: catalogeEndorsement
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
        schema: catalogSchema
      }
    )
  },

  down: (queryInterface, _) => {
    return queryInterface.dropTable({ tableName: catalogeEndorsementDietary, schema: catalogSchema })
  }
}
