import moment from 'moment'
import { Globals } from '../values/globals'
import { valueNotExists } from './validations'

const weekendDays = [0, 6]

function getDate (date, timezone) {
  const d = date ? moment(date) : moment()
  return timezone ? d.tz(timezone) : d
}

function getDateOnly (date, timezone) {
  return getDate(date, timezone).format('YYYY-MM-DD')
}

function dateFormatter (date, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  return moment(date).format(format)
}

function plusDays (date, days, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  const dateTo = moment(date, format).add(days, 'days')
  return dateFormatter(dateTo, format)
}

function plusMinutes (date, minutes, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  const dateTo = moment(date, format).add(minutes, 'minutes')
  return dateFormatter(dateTo, format)
}

function getMonthDay (date) {
  return moment(date).date()
}

function getDiffDays (dateFrom, dateTo) {
  return moment(dateTo).diff(moment(dateFrom), 'days')
}

function getDiffYears (dateFrom, dateTo) {
  return moment(dateTo).diff(moment(dateFrom), 'years')
}

function getFirstDayOnMonth (date, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  return moment(date).startOf('month').format(format)
}

function getGraceDaysByStartDate (startDate, lastDay) {
  const monthDate = getMonthDay(startDate)
  return lastDay - monthDate
}

function getMonthNumberByString (date) {
  const month = moment(date).month() + 1
  return `${month > 9 ? '' : '0'}${month}`
}

function getNextWorkingDayIfIsWeekend (date, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  const weekendDay = moment(date).weekday()
  if (weekendDays.includes(weekendDay)) {
    return plusDays(date, weekendDay === 0 ? 1 : 2)
  }
  return date
}

function isDateEndOfMonth (date, format) {
  if (valueNotExists(format)) format = Globals.DATE_FORMAT
  const endOfMonth = (moment(date, format).endOf('month'))
  const isEndOfMonth = moment(date, format).date() >= endOfMonth.date()
  return isEndOfMonth
}

function isValidDateForProcessCloseday ({ startDate, endDate }, timezone) {
  const date = getDate(undefined, timezone)
  const day = parseInt(date.format('DD'))
  const year = date.format('YYYY')
  const month = date.format('MM')
  const daysInMonth = date.daysInMonth()

  startDate = valueNotExists(startDate)
    ? 1
    : startDate === Globals.FIRST_WORKING_DAY_PROP
      ? getFirstWorkingDayOnMonth({ year, month, timezone })
      : startDate

  endDate = valueNotExists(endDate)
    ? daysInMonth
    : endDate === Globals.LAST_WORKING_DAY_PROP
      ? getLastWorkingDayOnMonth({ year, month, daysInMonth, timezone })
      : endDate > daysInMonth
        ? daysInMonth
        : endDate

  return day > startDate && day <= endDate
}

function getFirstWorkingDayOnMonth ({ year, month, timezone }) {
  const firstDateOnMonth = getDate((year + '-' + month + '-01'), timezone)
  const dayOnWeek = firstDateOnMonth.day()
  const firstWorkingDate = dayOnWeek === 0
    ? firstDateOnMonth.add(1, 'days')
    : dayOnWeek === 6
      ? firstDateOnMonth.add(2, 'days')
      : firstDateOnMonth
  return parseInt(firstWorkingDate.format('DD'))
}

function getLastWorkingDayOnMonth ({ year, month, daysInMonth, timezone }) {
  const lastDateOnMonth = getDate((year + '-' + month + '-' + daysInMonth), timezone)
  const dayOnWeek = lastDateOnMonth.day()
  const lastWorkingDate = dayOnWeek === 0
    ? lastDateOnMonth.subtract(2, 'days')
    : dayOnWeek === 6
      ? lastDateOnMonth.subtract(1, 'days')
      : lastDateOnMonth
  return parseInt(lastWorkingDate.format('DD'))
}

function getDateSTPFormat ({ date, timezone }) {
  return parseInt(getDate(date, timezone).format('YYYYMMDD'))
}

function convertDateResponseSTPFormat ({ date, timezone }) {
  return getDate(date, timezone).format('YYYY-MM-DD') + 'T00:00:00Z'
}

export {
  getDate,
  getDateOnly,
  dateFormatter,
  plusDays,
  getMonthDay,
  getDiffDays,
  getFirstDayOnMonth,
  getGraceDaysByStartDate,
  getMonthNumberByString,
  getNextWorkingDayIfIsWeekend,
  isDateEndOfMonth,
  isValidDateForProcessCloseday,
  getDateSTPFormat,
  convertDateResponseSTPFormat,
  getDiffYears,
  plusMinutes
}
