import codes from './codes'

export const catalog = Object.freeze({
  errors:
  {
    auth_invalid_login: {
      code: codes.unauthenticated,
      message: 'The username or password are incorrect',
      message_es: 'Usuario o contraseña inválidos',
      log: 'Invalid credentials: email=$EMAIL'
    },
    auth_acces_denied: {
      code: codes.forbidden,
      message: 'The user has not acces to service $SERVICE',
      message_es: 'El usuario no tiene acceso al servicio $SERVICE',
      log: 'Acces denied: user=$USER, userType=$USERTYPE, service=$SERVICE'
    },
    auth_invalid_token: {
      code: codes.forbidden,
      message: 'Authentication data is invalid or has expired',
      message_es: 'Los datos de autenticación son inválidos o han expirado',
      log: 'Invaild token'
    },
    auth_user_not_actived: {
      code: codes.user_for_activate,
      message: 'User not activated',
      message_es: 'Usuario no activado',
      log: 'User not activated: email=$EMAIL, userId=$USERID '
    }
  }
})
