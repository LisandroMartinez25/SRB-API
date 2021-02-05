'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogTable = entities.catalog.table

module.exports = {
  up: async (queryInterface, _) => {
    const tableData = [
      {
        index: 1,
        code: '2',
        description: 'Table for 2',
        seats: 2
      },
      {
        index: 2,
        code: '4',
        description: 'Table for 4',
        seats: 4
      },
      {
        index: 3,
        code: '6',
        description: 'Table for 6',
        seats: 6
      }
    ]

    return queryInterface.bulkInsert({ schema: catalogSchema, tableName: catalogTable }, tableData, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: catalogSchema, tableName: catalogTable }, null, {})
  }
}
