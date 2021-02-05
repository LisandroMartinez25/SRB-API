import errors from '../errors'
import logger from '../../logger'
import store from '../../db/models'
import validators from '../validators'

const className = 'RestaurantAPI'
const error = errors.createHandler(className)
const validator = validators.createHandler(['restaurant'], store, error)

export default class RestaurantAPI {
  async getAvailableRestaurants (req, res) {
    const functionName = 'getRestaurants'
    logger.info(`${className}/${functionName}`)
    
    try {
      console.log(req.body)
      const diners = await validator.restaurant.validateDiners(req.body.dinerIds)

      console.log(diners)

      const restaurants = await store.Restaurant.findAll({
        where: { active: true },
        include: [{
          as: 'restaurantTables',
          model: store.RestaurantTable,
          include: [{
            as: 'table',
            model: store.Table
          }]
        }, {
          as: 'restaurantEndorsements',
          model: store.RestaurantEndorsement,
          include: [{
            as: 'endorsement',
            model: store.Endorsement
          }]
        }]
      })

      res.send({ restaurants })
    } catch (err) {
      error(res, 'api_error', functionName, { message: err.message })
    }
  }
}
