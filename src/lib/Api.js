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
    if (authStore?.user?.userInfo) {
      api.setHeader(
        'ORIGINATING-COMPANY-ID',
        authStore.user.userInfo.originating_company
      )
    }
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
export const getUser = async (iframe = false) => {
  if (iframe) return await callIframeAPI('GET', '/users/me')
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
