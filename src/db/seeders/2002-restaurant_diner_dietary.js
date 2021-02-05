'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantDinerDietary = entities.restaurant.dinerDietary
const restaurantDiner = entities.restaurant.diner
const catalogSchema = entities.catalog._schema
const catalogDietary = entities.catalog.dietary

module.exports = {
  up: async (queryInterface, _) => {
    const dietaries = await queryInterface.sequelize.query(`SELECT id, code FROM ${catalogSchema}.${catalogDietary}`)
      .then(response => response[0])

    const diners = await queryInterface.sequelize.query(`SELECT id, index FROM ${restaurantSchema}.${restaurantDiner}`)
      .then(response => response[0])

    const dinerDietariesData = [{
      dinerId: 1,
      dietaryCodes: [{
        dietaryCode: 'vegetarian'
      }]
    }, {
      dinerId: 2,
      dietaryCodes: [
        { dietaryCode: 'vegetarian' },
        { dietaryCode: 'gluten' }
      ]
    }, {
      dinerId: 3,
      dietaryCodes: [
        { dietaryCode: 'gluten' }
      ]
    }, {
      dinerId: 4,
      dietaryCodes: [
        { dietaryCode: 'paleo' }
      ]
    }, {
      dinerId: 6,
      dietaryCodes: [
        { dietaryCode: 'vegan' }
      ]
    }]

    const dinerDietaries = dinerDietariesData.map(({ dinerId, dietaryCodes }) => {
      const diner = diners.find(diner => diner.index === dinerId)
      let index = 0
      return dietaryCodes.map(({ dietaryCode }) => {
        const dietary = dietaries.find(dietary => dietary.code === dietaryCode)
        index++
        return { diner_id: diner.id, dietary_id: dietary.id, index }
      })
    }).reduce((a, b) => a.concat(b), [])

    return queryInterface.bulkInsert({ schema: restaurantSchema, tableName: restaurantDinerDietary }, dinerDietaries, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: restaurantSchema, tableName: restaurantDinerDietary }, null, {})
  }
}
