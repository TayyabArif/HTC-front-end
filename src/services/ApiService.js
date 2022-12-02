import * as Api from '../lib/Api'
import { loadingActions } from '../store/loading'
import { login } from './AuthService'
import { store } from '../store'

export const createUser = async (
  accessCode,
  firstName,
  lastName,
  email,
  title,
  username,
  password
) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        role: title,
        username,
        password
      },
      '1st'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details[0]) {
      if (error.details.details[0].path.includes('email')) {
        throw { type: 'email', message: error.details?.details[0].message }
      }
      throw {
        message: `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
        }`
      }
    }
    throw { type: 'email', message: error.message }
  }

  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        role: title,
        username,
        password
      },
      '2nd'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw {
        message: `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
        }`
      }
    }
    throw { type: 'username', message: error.message }
  }

  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        role: title,
        username,
        password
      },
      'final'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw {
        message: `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
        }`
      }
    }
    throw { message: error.message }
  }

  // Login Process
  await login(email, password)
  store.dispatch(loadingActions.hide())
}

export const createClientUser = async (
  accessCode,
  firstName,
  lastName,
  email,
  phone,
  username,
  photoUrl,
  roles,
  role,
  password,
  employeeId,
  avoidEmail = false
) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        role,
        phone,
        photo_url: photoUrl,
        username,
        password,
        employee_id: employeeId
      },
      '1st'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details[0]) {
      if (error.details.details[0].path.includes('email')) {
        throw error.details?.details[0].message
      }
      throw `${error.details?.details[0].path.substring(1)} ${
        error.details?.details[0].message
      }`
    }
    throw error.message
  }

  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        phone,
        photo_url: photoUrl,
        username,
        password,
        employee_id: employeeId
      },
      '2nd'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw `${error.details?.details[0].path.substring(1)} ${
        error.details?.details[0].message
      }`
    }
    throw error.message
  }

  let newUser = null
  try {
    newUser = await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        phone,
        photo_url: photoUrl,
        username,
        password,
        employee_id: employeeId,
        avoid_email: avoidEmail
      },
      'final'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw `${error.details?.details[0].path.substring(1)} ${
        error.details?.details[0].message
      }`
    }
    throw error.message
  }

  store.dispatch(loadingActions.hide())
  return newUser
}

export const updateCompany = async (id, params) => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.updateCompany(id, params)
    store.dispatch(loadingActions.hide())
    return response
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error.message
  }
}

export const uploadCompanyFile = async (id, params) => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.uploadCompanyFile(id, params)
    store.dispatch(loadingActions.hide())
    return response
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error.message
  }
}

export const updateAccountSettings = async params => {
  store.dispatch(loadingActions.show())
  try {
    await Api.updateAccountSettings(params)
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error.message
  }
  store.dispatch(loadingActions.hide())
}

export const updateClientUser = async (id, params) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.updateUser(id, params)
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error
  }
  store.dispatch(loadingActions.hide())
}

export const getCompanyRoles = async companyId => {
  store.dispatch(loadingActions.show())
  try {
    const companyRoles = await Api.getCompanyRoles(companyId)
    store.dispatch(loadingActions.hide())
    return companyRoles
  } catch (e) {
    store.dispatch(loadingActions.hide())
    throw e
  }
}

export const workOrdersPortal = async (
  showAll,
  search,
  clientName,
  siteName,
  trades,
  service,
  woNumber,
  openDate,
  dueDate,
  status,
  invoices,
  priority,
  externalId,
  sort,
  perPage,
  page
) => {
  const tradeString = trades.split('|').join(',')
  const statusString = status
    ? status.split('|').join(',')
    : 'open,in_progress,completed,cancelled,expired'
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await Api.workOrdersPortal(
      showAll,
      search,
      clientName,
      siteName,
      tradeString,
      service,
      woNumber,
      openDate,
      dueDate,
      statusString,
      invoices,
      priority,
      externalId,
      sort,
      perPage,
      page
    )
    if (response) {
      return { status: true, content: response }
    } else {
      return { status: false, content: null }
    }
  } catch (err) {
    throw err
  }
}

export const invoicesPortal = async (
  showAll,
  search,
  won,
  inStatus,
  client,
  location,
  invoiceNumber,
  amount,
  createDate,
  dueDate,
  sort,
  companyId,
  perPage,
  page
) => {
  try {
    const response = await Api.invoicesPortal(
      showAll,
      search,
      won,
      inStatus,
      client,
      location,
      invoiceNumber,
      amount,
      createDate,
      dueDate,
      sort,
      companyId,
      perPage,
      page
    )
    if (response) {
      return { status: true, content: response }
    } else {
      return { status: false, content: null }
    }
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const submitInvoice = async (id, body, submitted) => {
  try {
    const response = await Api.submitInvoicePortal(id, submitted, body)
    if (response) {
      return { status: true, content: response }
    } else {
      return { status: false, content: null }
    }
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const getInvoice = async id => {
  try {
    const response = await Api.getInvoiceById(id)
    if (response) {
      return { status: true, content: response }
    } else {
      return { status: false, content: null }
    }
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error
  }
}

export const getSitesAdvancedFiltersInfo = async () => {
  store.dispatch(loadingActions.show())
  try {
    const advancedFilters = await Api.getWorkOrderTrades()
    advancedFilters.services = [].concat.apply(
      [],
      advancedFilters.trades.map(item => item.trade_services)
    )
    store.dispatch(loadingActions.hide())
    return advancedFilters
  } catch (e) {
    store.dispatch(loadingActions.hide())
    throw e
  }
}

export const getCompany = async id => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.getCompany(id)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}
export const getContactOffline = async id => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.getContactOffline(id)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const getCompanyProfile = async id => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.getCompanyProfile(id)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const getCompanyFile = async s3Key => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.getCompanyFile(s3Key)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const getCompanyUsers = async companyId => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.getCompanyUsers(companyId)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const createRolWithScopes = async (
  name,
  workorders,
  sites,
  companySettings
) => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.createRolWithScopes(
      name,
      workorders === 'yes',
      sites === 'yes',
      companySettings === 'yes'
    )
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const updateRolWithScopes = async (
  id,
  name,
  workorders,
  sites,
  companySettings
) => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.updateRolWithScopes(
      id,
      name,
      workorders === 'yes',
      sites === 'yes',
      companySettings === 'yes'
    )
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const deleteRolWithScopes = async id => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.deleteRolWithScopes(id)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const changeUserPassword = async password => {
  store.dispatch(loadingActions.show())
  try {
    const response = await Api.changeUserPassword(password)
    store.dispatch(loadingActions.hide())
    return response
  } catch (err) {
    store.dispatch(loadingActions.hide())
    throw err
  }
}

export const createLog = async (
  logType,
  woId,
  userData,
  logData,
  iframe = false
) => {
  const timeZone = ''
  const woLog = {}
  woLog.latitude = '0'
  woLog.longitude = '0'
  woLog.type = logType
  woLog.offline = false
  if (logType === 'checkOut') {
    woLog.work_order_id = woId
    woLog.status = 'complete'
    woLog.id = logData.id
    woLog.user_time_zone = logData.timeZone
    woLog.date_created = logData.date_created
    woLog.wo_log_id = logData.id
    const response = await Api.uploadWoLog(woLog, iframe)
    return response
  } else {
    woLog.work_order_id = woId
    woLog.user_time_zone = timeZone
    woLog.technicians_number = 0
    woLog.date_created = Math.round(Date.now() / 1000)
    woLog.user_id = userData.id
    woLog.technician_name = userData.firstName + userData.lastName
    woLog.status = 'complete'

    const response = await Api.uploadWoLog(woLog, iframe)
    return response
  }
}
