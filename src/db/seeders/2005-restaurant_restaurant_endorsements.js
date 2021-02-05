'use strict'
const entities = require('../config/entities')
const restaurantSchema = entities.restaurant._schema
const restaurantRestaurantEndorsement = entities.restaurant.restaurantEndorsement
const restaurantRestaurant = entities.restaurant.restaurant
const catalogSchema = entities.catalog._schema
const catalogEndorsement = entities.catalog.endorsement

module.exports = {
  up: async (queryInterface, _) => {
    const endorsements = await queryInterface.sequelize.query(`SELECT id, code FROM ${catalogSchema}.${catalogEndorsement}`)
      .then(response => response[0])

    const restaurants = await queryInterface.sequelize.query(`SELECT id, index FROM ${restaurantSchema}.${restaurantRestaurant}`)
      .then(response => response[0])

    const restaurantEndorsementsData = [{
      restaurantId: 1,
      endorsementCodes: [
        { endorsementCode: 'gluten' }
      ]
    }, {
      restaurantId: 2,
      endorsementCodes: [
        { endorsementCode: 'vegetarian' },
        { endorsementCode: 'gluten' }
      ]
    }, {
      restaurantId: 3,
      endorsementCodes: [
        { endorsementCode: 'paleo' },
        { endorsementCode: 'gluten' }
      ]
    }, {
      restaurantId: 5,
      endorsementCodes: [
        { endorsementCode: 'vegan' },
        { endorsementCode: 'vegetarian' }
      ]
    }]

    const restaurantEndorsements = restaurantEndorsementsData.map(({ restaurantId, endorsementCodes }) => {
      const restaurant = restaurants.find(restaurant => restaurant.index === restaurantId)
      let index = 0
      return endorsementCodes.map(({ endorsementCode }) => {
        const endorsement = endorsements.find(endorsement => endorsement.code === endorsementCode)
        index++
        return { restaurant_id: restaurant.id, endorsement_id: endorsement.id, index }
      })
    }).reduce((a, b) => a.concat(b), [])

    return queryInterface.bulkInsert({ schema: restaurantSchema, tableName: restaurantRestaurantEndorsement }, restaurantEndorsements, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: restaurantSchema, tableName: restaurantRestaurantEndorsement }, null, {})
  }
}
