
import CustomerValidator from './CustomerValidator'

const handler = {
  createHandler (modules, store, error) {
    let validators = {}

    for (let m in modules) {
      const mod = modules[m]
      switch (mod) {
        case 'customer':
          validators.customer = new CustomerValidator({ store, error })
          break
      }
    }
    return validators
  }
}

export default handler
