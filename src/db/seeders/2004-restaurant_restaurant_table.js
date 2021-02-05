'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantTable = entities.restaurant.restaurantTable
const restaurantRestaurant = entities.restaurant.restaurant
const catalogSchema = entities.catalog._schema
const catalogTable = entities.catalog.table

module.exports = {
  up: async (queryInterface, _) => {
    const tables = await queryInterface.sequelize.query(`SELECT id, code FROM ${catalogSchema}.${catalogTable}`)
      .then(response => response[0])

    const restaurants = await queryInterface.sequelize.query(`SELECT id, index FROM ${restaurantSchema}.${restaurantRestaurant}`)
      .then(response => response[0])

    const restaurantTablesData = [{
      restaurantId: 1,
      tablesData: [
        { tableCode: '2', noTables: 4 },
        { tableCode: '4', noTables: 2 },
        { tableCode: '6', noTables: 1 }
      ]
    }, {
      restaurantId: 2,
      tablesData: [
        { tableCode: '2', noTables: 3 },
        { tableCode: '4', noTables: 2 },
        { tableCode: '6', noTables: 0 }
      ]
    }, {
      restaurantId: 3,
      tablesData: [
        { tableCode: '2', noTables: 4 },
        { tableCode: '4', noTables: 2 },
        { tableCode: '6', noTables: 1 }
      ]
    }, {
      restaurantId: 4,
      tablesData: [
        { tableCode: '2', noTables: 5 },
        { tableCode: '4', noTables: 5 },
        { tableCode: '6', noTables: 5 }
      ]
    }, {
      restaurantId: 5,
      tablesData: [
        { tableCode: '2', noTables: 2 },
        { tableCode: '4', noTables: 0 },
        { tableCode: '6', noTables: 0 }
      ]
    }]

    const restaurantTables = restaurantTablesData.map(({ restaurantId, tablesData }) => {
      const restaurant = restaurants.find(restaurant => restaurant.index === restaurantId)
      let index = 0
      return tablesData.map(({ tableCode, noTables }) => {
        const table = tables.find(table => table.code === tableCode)
        index++
        return { restaurant_id: restaurant.id, table_id: table.id, index, tables: noTables }
      })
    }).reduce((a, b) => a.concat(b), [])

    return queryInterface.bulkInsert({ schema: restaurantSchema, tableName: restaurantRestaurantTable }, restaurantTables, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: restaurantSchema, tableName: restaurantRestaurantTable }, null, {})
  }
}
