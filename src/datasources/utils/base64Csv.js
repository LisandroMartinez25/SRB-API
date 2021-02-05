
import { Globals } from '../values/globals'
import { month, isActive, Type } from '../values/files'
import { dateFormatter } from './date'

export function getBase64Csv (tableValues, lang, propertiesMap, headers) {
  const reportToString = tableValues.reduce((string, row) => {
    const values = []
    for (let [key, value] of propertiesMap.entries()) {
      values.push(getValidValue(row[key], value, lang))
    }
    string += values.join(',') + '\n'
    return string
  }, '')
  const buf = Buffer.from(`${removeUtf8Characters(headers)}\n${removeUtf8Characters(reportToString)}`)
  return buf.toString(Globals.ENCODING_BASE64)
}

function getValidValue (value, type, lang) {
  if (typeof value !== 'undefined' && value != null) {
    if (type === Type.STRING) {
      return '"' + value + '"'
    }
    if (type === Type.DATE) {
      return dateFormatter(value)
    }
    if (type === Type.CURRENCY) {
      return '"' + new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value) + '"'
    }
    if (type === Type.MONTH) {
      return getMonthName(value, lang)
    }
    if (type === Type.BOOLEAN) {
      return value ? isActive.TRUE[lang] : isActive.FALSE[lang]
    }
    if (type === Type.DATE_DD_MONTH_YYYY) {
      const dateArr = dateFormatter(value, 'DD-MM-YYYY').split('-')
      const month = getMonthName(Number(dateArr[1]), lang)
      dateArr.splice(1, 1, month.toLowerCase())
      return dateArr.join('-')
    }
    return value
  }
  return ''
}

function getMonthName (monthNumber, lang) {
  switch (monthNumber) {
    case 1: return month.ONE[lang]
    case 2: return month.TWO[lang]
    case 3: return month.THREE[lang]
    case 4: return month.FOUR[lang]
    case 5: return month.FIVE[lang]
    case 6: return month.SIX[lang]
    case 7: return month.SEVEN[lang]
    case 8: return month.EIGHT[lang]
    case 9: return month.NINE[lang]
    case 10: return month.TEN[lang]
    case 11: return month.ELEVEN[lang]
    case 12: return month.TWELVE[lang]
  }
}

function removeUtf8Characters (value) {
  return value
    .replace(/á/gi, 'a')
    .replace(/é/gi, 'e')
    .replace(/í/gi, 'i')
    .replace(/ó/gi, 'o')
    .replace(/ú/gi, 'u')
    .replace(/ú/gi, 'u')
    .replace(/ü/gi, 'u')
    .replace(/ñ/gi, 'n')
    .replace(/Á/gi, 'A')
    .replace(/É/gi, 'E')
    .replace(/Í/gi, 'I')
    .replace(/Ó/gi, 'O')
    .replace(/Ú/gi, 'U')
    .replace(/Ü/gi, 'U')
    .replace(/Ñ/gi, 'N')
}
