
async function countBankAccountMovementRelatedMovements (store, bankAccountId) {
  const query = `select sum(movements.count) as count from (
    select count(*) from financial.customer_movement_detail as CMD
    where CMD.bank_account_movement_id = '${bankAccountId}' AND CMD.is_active = true
    UNION
    select count(*) from financial.debit_movement as DM
    where DM.bank_account_movement_id = '${bankAccountId}' AND DM.is_active = true
    UNION
    select count(*) from financial.payment as PY
    where PY.bank_account_movement_id = '${bankAccountId}' AND PY.is_active = true
    ) as movements;`
  const result = await store.sequelize.query(query, { type: store.sequelize.QueryTypes.SELECT })
  return parseInt(result[0].count)
}

async function getBankAccountMovementRelatedMovements (store, bankAccountId, limit, offset) {
  let query = `select CMD.created_at as createdAt, CMD.amount, cmt.code as type, (case when CU.business_id IS NOT NULL THEN business.name else concat(person.first_name,' ',person.last_name,' ',person.second_last_name) end) as relatedTo from financial.customer_movement_detail as CMD
      JOIN financial.customer_movement as CM on CM.id = CMD.customer_movement_id
      JOIN financial.customer as CU on CU.id = CM.customer_id
      JOIN financial.person as person on person.id = CU.person_id
      JOIN "catalog".collector_movement_type CMT on CMT.id = CMD.collector_movement_type_id 
      LEFT JOIN financial.business as business on business.id = CU.business_id
    where CMD.bank_account_movement_id = '${bankAccountId}' AND CMD.is_active = true
    UNION
    select DM.created_at as createdAt, DM.amount,'debit_movement' as type, (case when CU.business_id IS NOT NULL THEN business.name else concat(person.first_name,' ',person.last_name,' ',person.second_last_name) end) as relatedTo from financial.debit_movement as DM
      JOIN financial.customer as CU on CU.id = DM.customer_id
      JOIN financial.person as person on person.id = CU.person_id
      LEFT JOIN financial.business as business on business.id = CU.business_id
    where DM.bank_account_movement_id = '${bankAccountId}' AND DM.is_active = true
    UNION
    select PY.created_at as createdAt, PY.amount, 'payment' as type, CT.folio as relatedTo  from financial.payment as PY 
      JOIN financial.contract as CT on CT.id = PY.contract_id 
    where PY.bank_account_movement_id = '${bankAccountId}' AND PY.is_active = true
  ORDER BY createdAt DESC
  LIMIT ${limit}
  OFFSET ${offset};`

  return await store.sequelize.query(query, { type: store.sequelize.QueryTypes.SELECT })
}

export {
  countBankAccountMovementRelatedMovements,
  getBankAccountMovementRelatedMovements
}
