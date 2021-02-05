import codes from './codes'

export const catalog = Object.freeze({
  errors:
  {
    api_error: {
      code: codes.api_error,
      message: 'An error ocurred, try again later',
      message_es: 'Ha ocurrido un error, intente nuevamente más tarde',
      log: 'API error: $MESSAGE'
    },
    default: {
      code: codes.error,
      message: 'Error',
      log: 'Unknown error'
    }
  }
})
