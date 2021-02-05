export default class RestaurantValidator {
  constructor ({ store, error }) {
    this.store = store
    this.error = error
  }

  async validateDiners (dinerIds) {
    const functionName = 'validateDiners'

    const diners = this.store.Diner.findAll({
      where: { active: true, index: dinerIds }
    })

    if (diners.length < dinerIds.length) {
      this.error(res, 'input_invalid_values', functionName, { fields: 'dinerIds', values: dinerIds })
    }

    return diners
  }
}
