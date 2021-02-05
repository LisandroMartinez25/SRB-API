import { valueNotExists } from './validations'
import { getNextIndex } from './objects'
import { clearTime, initDate } from './loan'
import { LevelMovementTypeCodes } from '../values/catalogs'

export async function findOrCreateCustomerLevel ({ customerIndex, financialCompanyId, validator, store, timezone }) {
  let customer = await validator.customer.getValidCustomer(customerIndex, financialCompanyId)

  let customerLevel = await store.ClmCustomerLevel.findOne({
    where: {
      customerId: customer.privateId,
      isCurrent: true,
      active: true
    }
  })

  if (valueNotExists(customerLevel)) {
    // @TODO Esta consulta debería ir en ClmRoadmapLevel y en el orden 1, del mismo modo validar el roadmap con el producto
    const [firstLevel, levelMovementType, index] = await Promise.all([
      store.ClmLevel.findOne({
        where: {
          index: 1,
          active: true
        }
      }),
      store.ClmLevelMovementType.findOne({
        where: {
          code: LevelMovementTypeCodes.LEVEL_UP,
          active: true
        }
      }),
      getNextIndex(store.ClmCustomerLevel, customer.privateId, 'customerId')
    ])

    customerLevel = await store.ClmCustomerLevel.create({
      index,
      customerId: customer.privateId,
      levelId: firstLevel.privateId,
      levelMovementTypeId: levelMovementType.privateId,
      date: clearTime(initDate(undefined, timezone)),
      current: true
    })
  }

  customer = customer.toJSON()
  customer.level = customerLevel.toJSON()

  return customer
}

export async function getFullNameCustomer ({ index = null, id = null, person = null, business = null, financialCompanyId, store }, applyBusiness = true) {
  if ((person === null || (applyBusiness && business === null && person === null)) && (index || id)) {
    const customer = await store.Customer.findOne({
      where: { [store.Sequelize.Op.or]: { id, index }, financialCompanyId, active: true },
      attributes: [],
      include: [
        { model: store.Person, as: 'person', attributes: ['firstName', 'secondName', 'lastName', 'secondLastName'] },
        { model: store.Business, as: 'business', attributes: ['name'], required: false }
      ]
    })
    person = customer.person
    business = customer.business
  }
  const caseGenerateName = applyBusiness ? business ? 1 : person ? 2 : 3 : person ? 2 : 3

  switch (caseGenerateName) {
    case 1:
      return business.name

    case 2:
      const fullName = []
      fullName.push(person.firstName)
      fullName.push(person.secondName ? person.secondName : '')
      fullName.push(person.lastName)
      fullName.push(person.lastName + ' ' + person.secondLastName ? person.secondLastName : '')
      return fullName.join(' ').replace('  ', ' ')

    case 3:
      return 'N/I'
  }
}
