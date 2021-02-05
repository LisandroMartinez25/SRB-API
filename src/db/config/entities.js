const entities = Object.freeze({
  catalog: {
    _schema: 'catalog',
    
  },
  leaderfy: {
    _schema: 'leaderfy',
   
  },
  defaults: {
    uuid: 'uuid_generate_v4',
    date: 'now'
  }
})

module.exports = entities
