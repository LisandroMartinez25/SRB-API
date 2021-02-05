import validators from '../validators'
import errors from '../errors'
import logger from '../../logger'

const className = 'RestaurantAPI'
const error = errors.createHandler(className)

export default class RestaurantAPI {
  async getRestaurants (req, res) {
    const functionName = 'getRestaurants'
    logger.info(`${className}/${functionName}`)

    try {
      res.send({ message: 'hola mundo' })
    } catch (err) {
      error(res, 'api_error', functionName, { message: err.message })
    }
  }
}
