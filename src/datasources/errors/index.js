import errors from './constants'
import logger from '../../logger'

const handler = {
  createHandler (module, lang = process.env.DEFAULT_LANG) {
    return function (res, code, sender = 'Default', values = {}) {
      let error = errors[code]

      if (!(error && error.code && error.message && error.log)) {
        error = errors.default
      }

      const message_lang = 'message_' + lang
      let user_message = (lang && error[message_lang]) ? error[message_lang] : error.message
      let log_message = error.log

      if (values) {
        const valuesLang = require(`./values/${lang || 'en'}`).values

        let key
        for (key in values) {
          const value = values[key]
          const $key = '$' + key.toUpperCase()
          const $value = getValueLang($key, value, valuesLang)
          user_message = user_message.replace($key, $value)
          log_message = log_message.replace($key, value)
        }
      }

      logger.error(`[${module}.${sender}] => ${log_message}`)

      return res.send({ message: user_message, error_code: error.code })
    }
  }
}

function getValueLang (key, value, list) {
  const valueList = list[key]
  if (!valueList) return value
  return valueList[value] || value
}

export default handler
