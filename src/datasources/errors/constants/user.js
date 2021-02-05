import codes from './codes'

export const catalog = Object.freeze({
  errors:
  {
    email_registered: {
      code: codes.invalid_data,
      message: 'Email already registered',
      message_es: 'Correo ya registrado',
      log: 'Email already registered: email=$EMAIL'
    },
    must_be_adult: {
      code: codes.invalid_data,
      message: 'Must be adult for user this app',
      message_es: 'Debes ser mayor de edad para usar esta app',
      log: 'Must be adult: email=$EMAIL'
    },
    user_not_found: {
      code: codes.object_not_found,
      message: 'User width id = $ID, not found',
      message_es: 'Usuario con el id = $ID no encontrado',
      log: 'User width id = $ID, not found'
    },
    user_email_not_found: {
      code: codes.object_not_found,
      message: 'User width id = $ID, not found',
      message_es: 'Usuario con el email = $EMAIL no encontrado',
      log: 'User width email = $EMAIL, not found'
    },
    restricted_user: {
      code: codes.invalid_data,
      message: 'Restricted user',
      message_es: 'Usuario restringido',
      log: 'Restricted user, id = $ID, userId = $USERID'
    },
    invalid_email_code: {
      code: codes.invalid_data,
      message: 'Your code is invalid or has expired',
      message_es: 'Tu código no es válido o ha caducado',
      log: 'Code invalid or expired userId = $USERID'
    },
    invalid_password_code: {
      code: codes.invalid_data,
      message: 'Your code is invalid or has expired',
      message_es: 'Tu código no es válido o ha caducado',
      log: 'Code invalid or expired userId = $USERID'
    },
    user_actived: {
      code: codes.invalid_data,
      message: 'User already activated',
      message_es: 'Usuario ya activado',
      log: 'User already activated userId = $USERID'
    }
  }
})
