'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogEndorsement = entities.catalog.endorsement

module.exports = {
  up: async (queryInterface, _) => {
    const endorsementData = [
      {
        index: 1,
        code: 'gluten',
        description: 'Gluten Free Options'
      },
      {
        index: 2,
        code: 'vegetarian',
        description: 'Vegetarian-Friendly'
      },
      {
        index: 3,
        code: 'paleo',
        description: 'Paleo-friendly'
      },
      {
        index: 4,
        code: 'vegan',
        description: 'Vegan-Friendly'
      }
    ]

    return queryInterface.bulkInsert({ schema: catalogSchema, tableName: catalogEndorsement }, endorsementData, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: catalogSchema, tableName: catalogEndorsement }, null, {})
  }
}
