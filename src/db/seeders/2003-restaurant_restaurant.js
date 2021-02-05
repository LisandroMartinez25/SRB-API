'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurant = entities.restaurant.restaurant

module.exports = {
  up: async (queryInterface, _) => {
    const restaurantData = [{
      index: 1,
      name: 'Lardo',
      location: '19.3568875,-99.1585988'
    }, {
      index: 2,
      name: 'Panadería Rosetta',
      location: '19.4198963,-99.1627271'
    }, {
      index: 3,
      name: 'Tetetlán',
      location: '19.3587562,-99.1899352'
    }, {
      index: 4,
      name: 'Falling Piano Brewing Co',
      location: '19.4118236,-99.1621248'
    }, {
      index: 5,
      name: 'u.to.pi.a',
      location: '19.4150349,-99.1747443'
    }]

    return queryInterface.bulkInsert({ schema: restaurantSchema, tableName: restaurantRestaurant }, restaurantData, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: restaurantSchema, tableName: restaurantRestaurant }, null, {})
  }
}
