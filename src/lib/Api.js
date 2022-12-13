import { create } from 'apisauce'
import { store } from '../store'
import { refreshToken } from '../services/AuthService'
import { authActions } from '../store/signIn'

/* TODO: FIX CAMEL CASE */
/* eslint-disable camelcase */

/**
 * Create an api of FTC API
 *
 * @type {ApisauceInstance}
 */
const api = create({
  baseURL: process.env.REACT_APP_FTC_API_SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    PORTAL: 'CLIENT'
  },
  timeout: 30000
})

/**
 * Remove headers from API
 */
export const removeAuthorizationHeader = () => {
  api.deleteHeader('ORIGINATING-COMPANY-ID')
  api.deleteHeader('Authorization')
}

/**
 * Process response
 *
 * @param response
 * @returns {*}
 */
const processApiResponse = response => {
  if (!response.ok) {
    const title = `${response.status} - ${response.problem}`
    let message = `There was an error calling to FTC API: ${response.originalError}`

    if (response.data && response.data.error) {
      message = `${response.data.error.message}`
    }

    throw {
      name: title,
      message,
      code: response.status,
      details: response.data.error ?? null
    }
  }

  return response.data
}

/**
 * Performs a call to the BV API
 *
 * @param {string} type The REST method
 * @param {string} route The API URI
 * @param {object} params The parameters to be sent to the API
 * @param {number} attempt The attempt number
 *
 * @throws {object} Will throw an error if the access token could not be refreshed
 *
 * @returns {object} The API response data
 */
const callAPI = async (
  type,
  route,
  params = {},
  authorized = 1,
  attempt = 1
) => {
  const authStore = store.getState().auth
  let response
  if (authorized) {
    api.setHeader('Authorization', `Bearer ${authStore.token.access_token}`)
  }

  switch (type) {
    case 'POST':
      response = await api.post(route, params)
      break
    case 'PUT':
      response = await api.put(route, params)
      break
    case 'DELETE':
      response = await api.delete(route, params)
      break
    case 'GET':
      response = await api.get(route, params)
      break
    case 'PATCH':
      response = await api.patch(route, params)
      break
    default:
      throw {
        name: 'Method Not Allowed',
        message: 'Call type not supported',
        code: 405
      }
  }

  if (!response.ok) {
    if (response.status === 401 && authorized) {
      if (attempt === 1) {
        try {
          await refreshToken(authStore.token.refresh_token)
          return callAPI(type, route, params, authorized, 2)
        } catch (error) {
          return callAPI(type, route, params, authorized, 2)
        }
      } else {
        console.log('Unable to refresh token')
        store.dispatch(authActions.logout())
        store.dispatch(authActions.setForceLogout())
        return processApiResponse(response)
      }
    }
  }
  return processApiResponse(response)
}

/**
 * Send reset password request
 *
 * @param email
 * @returns {Promise<object>} The API response data
 */
export const resetPasswordRequest = async (email = '') => {
  return await callAPI('POST', '/users/forgotpassword', { email }, false)
}

/**
 * Get User Scopes
 *
 * @param email
 * @returns {Promise<object[]>} The API response data
 */
export const getUserScopes = async (email = '') => {
  return await callAPI('GET', '/api/users/scopes',
    new URLSearchParams({
      email
    }), 0)
}

/**
 * Get User
 *
 * @returns {Promise<object>} The API response data
 */
export const getUser = async () => {
  return await callAPI('GET', '/users/me')
}

/**
 * Validate access code
 *
 * @returns {Promise<object>} The API response data
 */
export const validateAccessCode = async id => {
  return await callAPI('GET', '/users/validateaccesscode', { id }, false)
}

export const workOrdersPortal = async (
  showAll = false,
  query = '',
  client_name = '',
  address = '',
  trades = '',
  service = '',
  wo_number = '',
  open_date = '',
  expiration_date = '',
  status = '',
  invoices = '',
  priority = '',
  external_id,
  sort = '',
  limit = 25,
  page = 1
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await callAPI(
      'GET',
      '/workorders/client',
      new URLSearchParams({
        showAll,
        query,
        client_name,
        address,
        trades,
        service,
        wo_number,
        open_date,
        expiration_date,
        status,
        invoices,
        priority,
        external_id,
        sort,
        limit,
        page,
        group_portal: true
      })
    )
  } catch (err) {
    throw err
  }
}

export const invoicesPortal = async (
  showAll = false,
  query = '',
  won = '',
  inStatus = '',
  client = '',
  location = '',
  invoiceNumber = '',
  amount = '',
  createDate = '',
  dueDate = '',
  sort = '',
  companyId = '',
  limit = 25,
  page = 1
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await callAPI(
      'GET',
      `/invoices/company/${companyId}`,
      new URLSearchParams({
        showAll,
        query,
        won,
        inStatus,
        client,
        location,
        invoiceNumber,
        amount,
        createDate,
        dueDate,
        sort,
        limit,
        page
      })
    )
  } catch (err) {
    throw err
  }
}

export const submitInvoicePortal = async (
  id = '',
  submit = false,
  body = {}
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await callAPI(
      'PUT',
      `/invoices/${id}/?` + new URLSearchParams({ submit }),
      { ...body },
      true
    )
  } catch (err) {
    throw err
  }
}

export const getInvoiceById = async (id = '') => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await callAPI('GET', `/invoices/${id}`, true)
  } catch (error) {
    throw error
  }
}

/*
 * Verify registration status
 *
 * @returns {Promise<boolean>} The API response data
 */
export const verifyRegistration = async (email) => {
  return await callAPI('GET', `/api/users/verify-registration/${email}`, {}, 0)
}

/**
 * Request access
 *
 * @param companyDomain
 * @param firstName
 * @param lastName
 * @param email
 * @returns {Promise<boolean>}
 */
export const requestAccess = async (companyDomain, firstName, lastName, email, companyName) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('POST', '/api/users/request-access',
    {
      company_domain: companyDomain,
      first_name: firstName,
      last_name: lastName,
      email,
      company_name: companyName
    }, 0)
}

/**
 * Update Account Settings
 *
 * @returns {Promise<object>} The API response data
 */
export const updateAccountSettings = async params => {
  const response = await callAPI('PUT', '/users/me', params, true)
  if (!response || response.status === 204) return true
  return response
}

/**
 * Create user
 *
 * @returns {Promise<object>} The API response data
 */
export const createUser = async (params, step) => {
  const response = await callAPI('POST', `/users?step=${step}`, params, false)
  if (!response || response.status === 204) return true
  return response
}

/**
 * Update User
 *
 * @returns {Promise<object>} The API response data
 */
export const updateUser = async (id, params) => {
  const response = await callAPI('PUT', `/users/${id}`, params, true)
  if (!response || response.status === 204) return true
  return response
}

/**
 * GET Trades list for current user
 * @returns Trades list
 */
export const getWorkOrderTrades = async () => {
  try {
    const response = await callAPI('GET', '/trades/wotrades')
    return response
  } catch {
    return false
  }
}

/**
 * GET Selected company
 * @returns Company
 */
export const getCompany = async id => {
  const response = await callAPI('GET', `/companies/${id}`)
  return response
}

/**
 * GET Company contact
 * @returns Contact
 */
export const getContactOffline = async id => {
  const response = await callAPI(
    'GET',
    `/company-contact-offline/${id}`,
    {},
    false
  )
  return response
}

/**
 * GET Selected company Profile
 * @returns CompanyProfile
 */
export const getCompanyProfile = async id => {
  const response = await callAPI('GET', `/companyProfile/${id}`)
  return response
}

/**
 * GET file from S3 bucket
 * @returns Buffer
 */
export const getCompanyFile = async key => {
  const encodedURI = encodeURIComponent(key)
  const response = await callAPI('GET', `/companyFileUploaded/${encodedURI}`)
  return response
}

/**
 * PUT Update selected company
 * @returns Company
 */
export const updateCompany = async (id, params) => {
  const response = await callAPI('PUT', `/companies/${id}`, params)
  return response
}

/**
 * PUT upload copany files
 * @returns string
 */
export const uploadCompanyFile = async (id, params) => {
  const response = await callAPI('PUT', `/companies/uploadFile/${id}`, params)
  return response
}

export const uploadRepair = async (repair, iframe = false) => {
  const selectedAPI = iframe ? callIframeAPI : callAPI
  // Ensure the id for the repair is always set
  if (!repair.id && repair._id) repair.id = repair._id
  let response
  if (!repair.id) {
    // SAVE
    response = await selectedAPI('POST', 'repairs', {
      date_created: repair.date_created,
      work_order_id: repair.work_order_id,
      user_id: repair.user_id,
      status: repair.status,
      type: repair.type,
      data: repair.data,
      sync_error: repair.sync_error,
      schema_version: 'v2'
    })
  } else {
    // UPDATE
    response = await selectedAPI('PUT', `repairs/${repair.id}`, {
      work_order_id: repair.work_order_id,
      user_id: repair.user_id,
      status: repair.status,
      data: repair.data,
      sync_error: repair.sync_error
    })
  }
  return response
}

/**
 * Get client users
 *
 * @param companyId
 * @returns {Promise<object[]>} The API response data
 */
export const getCompanyUsers = async (companyId = 0) => {
  return await callAPI('GET', `users/companyusers/${companyId}`)
}

/**
 * Download WO by id
 * @param {string} id
 * @returns WorkOrder
 */
export const getWoByIdWithAuth = async (iframe, id) => {
  const selectedAPI = iframe ? callIframeAPI : callAPI
  return await selectedAPI('GET', `workorders/data/${id}`)
}

/**
 * Create an api of FTC API for iframe
 * This API is needed to make sure credentials are not mixed up if a user has an already existing session
 *
 * @type {ApisauceInstance}
 */
const iframeApi = create({
  baseURL: process.env.REACT_APP_FTC_API_SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    sfsource: 'TRUE'
  },
  timeout: 30000
})

const callIframeAPI = async (type, route, params = {}) => {
  let response
  switch (type) {
    case 'POST':
      response = await iframeApi.post(route, params)
      break
    case 'PUT':
      response = await iframeApi.put(route, params)
      break
    case 'DELETE':
      response = await iframeApi.delete(route, params)
      break
    case 'GET':
      response = await iframeApi.get(route, params)
      break
    case 'PATCH':
      response = await iframeApi.patch(route, params)
      break
    default:
      throw {
        name: 'Method Not Allowed',
        message: 'Call type not supported',
        code: 405
      }
  }

  if (!response.ok) {
    if (response.status === 401) {
      console.log('Unable to refresh token')
      return processApiResponse(response)
    }
  }
  return processApiResponse(response)
}

/**
 * Get company roles
 *
 * @param companyId
 * @returns {Promise<object[]>} The API response data
 */
export const getRoles = async (companyId = 0) => {
  return await callAPI('GET', `roles/company/${companyId}`)
}

/**
 * Create Role with access scopes
 * @param name
 * @param workorders
 * @param sites
 * @param companySettings
 * @returns {Promise<object>} The API response data
 */
export const createRolWithScopes = async (
  name,
  workorders,
  sites,
  companySettings
) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('POST', '/roles', {
    name,
    workorders,
    sites,
    companySettings
  })
}

/**
 * Update Role with access scopes
 * @param id
 * @param name
 * @param workorders
 * @param sites
 * @param companySettings
 * @returns {Promise<object>} The API response data
 */
export const updateRolWithScopes = async (
  id,
  name,
  workorders,
  sites,
  companySettings
) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('PUT', `/roles/${id}`, {
    name,
    workorders,
    sites,
    companySettings
  })
}

/**
 * Delete Role with Scopes
 * @param id
 * @returns {Promise<boolean>} The API response data
 */
export const deleteRolWithScopes = async id => {
  return await callAPI('DELETE', `/roles/${id}`)
}

/**
 * GET Company Roles list
 * @returns Company Roles list
 */
export const getCompanyRoles = async companyId => {
  try {
    const response = await callAPI('GET', `/roles/company/${companyId}`)
    return response
  } catch {
    return false
  }
}

/**
 * Change user password
 * @param password
 * @returns {Promise<object>} The API response data
 */
export const changeUserPassword = async password => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('PUT', '/api/users/change-password', {
    password
  })
}

/*
 * GET Selected WorkOrder
 * @returns WorkOrder
 */
export const getWorkOrder = async id => {
  return await callAPI('GET', `/workorders/${id}`)
}

/**
 * Upload ETA
 * @param id id of the WO,
 * @param time eta time
 * @returns {boolean} true if the call was successful, false if it isn't
 */
export const uploadETA = async (id, time, iframe = false) => {
  const selectedAPI = iframe ? callIframeAPI : callAPI
  try {
    return await selectedAPI('POST', '/workorders/eta', {
      woId: id,
      eta: {
        time: time,
        confirmation: true,
        reason: null,
        updatedAt: ~~(Date.now() / 1000)
      }
    })
  } catch {
    return false
  }
}

/**
 * Check in/out from a WO
 * @param {object} woLog
 * @returns Created or updated log
 */
export const uploadWoLog = async (woLog, iframe = false) => {
  const selectedAPI = iframe ? callIframeAPI : callAPI
  let response = null
  if (woLog.type === 'checkIn') {
    response = await selectedAPI('POST', 'workorderlogs', {
      work_order_id: woLog.work_order_id,
      latitude: woLog.latitude,
      longitude: woLog.longitude,
      type: woLog.type,
      user_time_zone: woLog.user_time_zone,
      technicians_number: woLog.technicians_number,
      date_created: woLog.date_created,
      wo_log_id: woLog.wo_log_id,
      offline: false
    })
  } else {
    response = await selectedAPI('POST', 'workorderlogs', {
      work_order_id: woLog.work_order_id,
      latitude: woLog.latitude,
      longitude: woLog.longitude,
      type: woLog.type,
      wo_log_id: woLog.wo_log_id,
      return_visit: woLog.return_visit,
      user_time_zone: woLog.user_time_zone,
      date_created: woLog.date_created,
      status: woLog.status,
      offline: false,
      cancel_trip: woLog.cancel_trip
    })
  }
  return response
}
