'use strict'
const entities = require('../config/entities')
const catalogSchema = entities.catalog._schema
const catalogEndorsementDietary = entities.catalog.endorsementDietary
const catalogEndorsement = entities.catalog.endorsement
const catalogDietary = entities.catalog.dietary

module.exports = {
  up: async (queryInterface, _) => {
    const endorsements = await queryInterface.sequelize.query(`SELECT id, code FROM ${catalogSchema}.${catalogEndorsement}`)
      .then(response => response[0])
    const dietaries = await queryInterface.sequelize.query(`SELECT id, code FROM ${catalogSchema}.${catalogDietary}`)
      .then(response => response[0])

    const endorsementDietaryData = [
      {
        endorsementsCode: 'gluten',
        dietaryCodes: [
          { dietaryCode: 'gluten' }
        ]
      },
      {
        endorsementsCode: 'vegetarian',
        dietaryCodes: [
          { dietaryCode: 'vegetarian' }
        ]
      },
      {
        endorsementsCode: 'paleo',
        dietaryCodes: [
          { dietaryCode: 'paleo' }
        ]
      },
      {
        endorsementsCode: 'vegan',
        dietaryCodes: [
          { dietaryCode: 'vegan' }
        ]
      }
    ]

    const endorsementDietaries = endorsementDietaryData.map(({ endorsementsCode, dietaryCodes }) => {
      const endorsement = endorsements.find(endorsement => endorsement.code === endorsementsCode)
      let index = 0
      return dietaryCodes.map(({ dietaryCode }) => {
        const dietary = dietaries.find(dietary => dietary.code === dietaryCode)
        index++
        return { endorsement_id: endorsement.id, dietary_id: dietary.id, index }
      })
    }).reduce((a, b) => a.concat(b), [])

    return queryInterface.bulkInsert({ schema: catalogSchema, tableName: catalogEndorsementDietary }, endorsementDietaries, {})
  },

  down: (queryInterface, _) => {
    return queryInterface.bulkDelete({ schema: catalogSchema, tableName: catalogEndorsementDietary }, null, {})
  }
}
