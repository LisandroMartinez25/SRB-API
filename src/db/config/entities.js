const entities = Object.freeze({
  catalog: {
    _schema: 'catalog',
    endorsement: 'endorsement',
    dietary: 'dietary',
    endorsementDietary: 'endorsement_dietary',
    table: 'table'
  },
  restaurant: {
    _schema: 'restaurant',
   diner: 'diner',
   dinerDietary: 'diner_dietary',
   restaurant: 'restaurant',
   restaurantTable: 'restaurant_table',
   restaurantEndorsement: 'restaurant_endorsement',
   restaurantDiner: 'restaurant_diner'
  },
  defaults: {
    uuid: 'uuid_generate_v4',
    date: 'now'
  }
})

module.exports = entities
