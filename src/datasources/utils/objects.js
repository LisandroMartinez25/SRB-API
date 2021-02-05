import { valueNotExists } from './validations'

const INDEX_INC = 1

async function getNextIndex (model, value, column, transaction = null) {
  const where = {}
  if (column) {
    where[column] = value
  }
  const order = [['index', 'DESC']]

  const last = await model.findOne({ where, order, transaction })
  return (last ? last.index : 0) + INDEX_INC
}

async function changeIdToIndex (object) {
  if (valueNotExists(object)) return object
  return { ...object.toJSON(), id: object.index }
}

async function changeIdToIndexList (objects) {
  if (valueNotExists(objects)) return objects
  return objects.map(object => changeIdToIndex(object))
}

export {
  getNextIndex,
  changeIdToIndex,
  changeIdToIndexList
}
