import { valueNotExists } from './validations'
import upperFirst from 'lodash/upperFirst'
const defaultPagination = {
  totalPages: 1,
  validPage: false,
  previousPage: null,
  nextPage: null,
  pageNumber: 1,
  perPage: 1,
  total: 0
}

const defaultRequestPagination = {
  perPage: 10,
  page: 1,
  offset: 0
}

export function getPagination (total, pageNumber, perPage) {
  if (total < 1 || pageNumber < 1 || perPage < 1) {
    return defaultPagination
  }

  const totalPages = Math.ceil(total / perPage)
  const validPage = pageNumber <= totalPages
  const previousPage = validPage ? (pageNumber === 1 ? null : pageNumber - 1) : null
  const nextPage = validPage ? (pageNumber === totalPages ? null : pageNumber + 1) : null

  const pagination = {
    totalPages,
    validPage,
    previousPage,
    nextPage,
    pageNumber,
    perPage,
    total
  }

  return pagination
}

export function getRequestPagination (requestPagination) {
  if (valueNotExists(requestPagination)) return defaultRequestPagination

  const perPage = requestPagination.perPage || 10
  const page = requestPagination.pageNumber || 1
  const offset = perPage * (page - 1)

  return { page, perPage, offset }
}

export function getRequestOrder (order, store, modelToSearch) {
  if (valueNotExists(order) || !Object.keys(order).length) return [['createdAt', 'ASC']]
  return Object.keys(order).reduce((result, key) => {
    if (typeof order[key] === 'object') {
      const as = modelToSearch.associations[key] ? modelToSearch.associations[key].as : null
      const model = store[upperFirst(key)]
      Object.keys(order[key]).forEach(elem =>
        result.push([as ? { model, as } : model, elem, order[key][elem]])
      )
    } else {
      result.push([key, order[key]])
    }
    return result
  }, [])
}

export function getRequestFilter (filters) {
  if (!filters) return null
  const result = {}
  Object.keys(filters).forEach(f => {
    const filter = {}
    Object.keys(filters[f]).forEach(k => {
      if (k === 'id') {
        filter.index = filters[f][k]
      } else {
        filter[k] = filters[f][k]
      }
    })
    result[f] = filter
  })
  return result
}
