import regex from './regex'
import moment from 'moment'

export function valueExists (value) {
  return typeof value !== 'undefined' && value != null
}

export function valueNotExists (value) {
  return !valueExists(value)
}

export function valueIsString (value) {
  return typeof value === 'string'
}

export function valueIsNotString (value) {
  return !valueIsString(value)
}

export function valueIsNotEmptyString (value) {
  if (valueIsString(value) && value.length > 0) {
    let empty = false
    value.split('').forEach(s => {
      if (s !== ' ') empty = true
    })
    return empty
  }
  return false
}

export function valueIsEmptyString (value) {
  return !valueIsNotEmptyString(value)
}

export function valueIsNumber (value) {
  return typeof value === 'number'
}

export function valueIsNotNumber (value) {
  return !valueIsNumber(value)
}

export function valueIsPositiveNumber (value) {
  return valueIsNumber(value) && value > 0
}

export function valueIsPositiveNumberOrZero (value) {
  return valueIsNumber(value) && value >= 0
}

export function valueIsNegativeNumber (value) {
  return valueIsNumber(value) && value < 0
}

export function valueIsNegativeNumberOrZero (value) {
  return valueIsNumber(value) && value <= 0
}

export function valueIsOutOfRange (value, min, max) {
  return valueIsNotNumber(value) || (value < min || value > max)
}

export function valueIsTrue (value) {
  return valueExists(value) && value
}

export function valueIsFalse (value) {
  return !valueIsTrue(value)
}

export function valueIsNotEmptyArray (value) {
  return valueIsArray(value) && value.length > 0
}

export function valueIsEmptyArray (value) {
  return !valueIsNotEmptyArray(value)
}

export function valueIsArray (value) {
  return Array.isArray(value)
}

export function valueMatches (value, exp) {
  return regex[exp] ? regex[exp].test(value) : false
}

export function isValidDate (value, format = null) {
  if (valueNotExists(value)) return false
  return format
    ? moment(value, format, true).isValid()
    : moment(value).isValid()
}

export function isInvalidDate (value, format = null) {
  return !isValidDate(value, format)
}

export function isNumberInRange (value, min, max) {
  return value >= min && value <= max
}

export function duplicatedArrayItems (input) {
  return input.reduce((acc, el, i, arr) => {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc
  }, [])
}
