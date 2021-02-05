'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogDietary = entities.catalog.dietary

module.exports = {
  up: async (queryInterface, _) => {
    const endorsementData = [
      {
        index: 1,
        code: 'gluten',
        description: 'Gluten-Free'
      },
      {
        index: 2,
        code: 'vegetarian',
        description: 'Vegetarian'
      },
      {
        index: 3,
        code: 'paleo',
        description: 'Paleo'
      },
      {
        index: 4,
        code: 'vegan',
        description: 'Vegan'
      }
    ]

    return queryInterface.bulkInsert({ schema: catalogSchema, tableName: catalogDietary }, endorsementData, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: catalogSchema, tableName: catalogDietary }, null, {})
  }
}
