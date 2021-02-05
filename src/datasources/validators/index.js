
import RestaurantValidator from './RestaurantValidator'

const handler = {
  createHandler (modules, store, error) {
    let validators = {}

    for (let m in modules) {
      const mod = modules[m]
      switch (mod) {
        case 'restaurant':
          validators.restaurant = new RestaurantValidator({ store, error })
          break
      }
    }
    return validators
  }
}

export default handler
