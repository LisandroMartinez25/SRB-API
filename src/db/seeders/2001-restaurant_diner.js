'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantDiner = entities.restaurant.diner

module.exports = {
  up: async (queryInterface, _) => {
    const dinerData = [{
      index: 1,
      name: 'Michael',
      last_name: '',
      home_location: '19.4153107,-99.1804722'
    }, {
      index: 2,
      name: 'George Michael',
      last_name: '',
      home_location: '19.4058242,-99.1671942'
    }, {
      index: 3,
      name: 'Lucile',
      last_name: '',
      home_location: '19.3634215,-99.1769323'
    }, {
      index: 4,
      name: 'Gob',
      last_name: '',
      home_location: '19.3318331,-99.2078983'
    }, {
      index: 5,
      name: 'Tobias',
      last_name: '',
      home_location: '19.4384214,-99.2036906'
    }, {
      index: 6,
      name: 'Maeby',
      last_name: '',
      home_location: '19.4349474,-99.1419256'
    }]

    return queryInterface.bulkInsert({ schema: restaurantSchema, tableName: restaurantDiner }, dinerData, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: restaurantSchema, tableName: restaurantDiner }, null, {})
  }
}
