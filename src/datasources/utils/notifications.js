export function replaceVariablesString (title, message, variables) {
  let template = { title, message }
  for (let key in variables) {
    const $key = '$' + key.toUpperCase()
    template.title = template.title.replace($key, variables[key])
    template.message = template.message.replace($key, variables[key])
  }
  return template
}

export async function getUserNotificatioList (notificationCompany, financialCompanyId, store) {
  let usersList = []
  let rolList = []
  if (notificationCompany && notificationCompany.notificationSubscriptions) {
    await notificationCompany.notificationSubscriptions.forEach(subscription => {
      if (subscription.userId) usersList.push(subscription.userId)
      if (subscription.roleId) rolList.push(subscription.roleId)
    })
  }
  if (rolList.length > 0) rolList = await getUserListByRole(rolList, financialCompanyId, store)
  usersList = usersList.concat(rolList)
  return usersList
}

async function getUserListByRole (roleList, financialCompanyId, store) {
  const companyUsersByRole = await store.FinancialCompanyUser.findAll({
    where: {
      financialCompanyId,
      roleId: roleList,
      active: true,
      enabled: true
    },
    attributes: ['userId']
  })
  let usersList = []
  companyUsersByRole.forEach(companyUser => {
    usersList.push(companyUser.userId)
  })
  return usersList
}
