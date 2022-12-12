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
