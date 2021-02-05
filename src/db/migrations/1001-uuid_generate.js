'use strict'
const uuidExtName = 'uuid-ossp'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const uuidExtEnable = `CREATE EXTENSION IF NOT EXISTS "${uuidExtName}";`
    return queryInterface.sequelize.query(uuidExtEnable)
  },

  down: (queryInterface, _) => {
    const uuidExtDisable = `DROP EXTENSION IF EXISTS "${uuidExtName}";`
    return queryInterface.sequelize.query(uuidExtDisable)
  }
}
