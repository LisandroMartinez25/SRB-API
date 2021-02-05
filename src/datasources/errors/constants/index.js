import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'

const catalogs = []
const basename = path.basename(__filename)

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  })
  .forEach(file => {
    const catalog = require(`./${file}`).catalog
    catalogs.push(catalog)
  })

const errors = merge(...catalogs).errors
export default errors
