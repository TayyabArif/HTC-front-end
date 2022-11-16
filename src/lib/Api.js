import { create } from 'apisauce'
import { store } from '../store'
import { authActions } from '../store/signIn'

/* TODO: FIX CAMEL CASE */
/* eslint-disable camelcase */

/**
 * Create an api of BV API
 *
 * @type {ApisauceInstance}
 */
const api = create({
  baseURL: process.env.REACT_APP_FTC_OAUTH_SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 30000
})

/**
 * Process response
 *
 * @param response
 * @returns {*}
 */
const processApiResponse = (response) => {
  if (!response.ok) {
    const title = `${response.status} - ${response.problem}`
    let message = `There was an error calling to BV API: ${response.originalError}`

    if (response.data && response.data.error) {
      message = `${response.data.error.message}`
    }

    throw {
      name: title,
      message,
      code: response.status
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
const callAPI = async (type, route, params = {}, authorized = 1, attempt = 1) => {
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
        store.dispatch(authActions.setRefreshTokenFlag(1))
        return await delayCallApi(type, route, params, authorized, 2, 1000, 1)
      } else {
        console.info('Unable to get the information after the second attempt')
        return processApiResponse(response)
      }
    } else {
      return processApiResponse(response)
    }
  } else {
    return processApiResponse(response)
  }
}

const delayCallApi = async (type, route, params, authorized, attempt, delay, delayAttempt) => {
  return new Promise(resolve => {
    setTimeout(async () => {
      const prevToken = store.getState().auth.prevToken
      const token = store.getState().auth.token.access_token
      if (prevToken !== token || delayAttempt === 3) {
        const response = await callAPI(type, route, params, authorized, attempt)
        resolve(response)
      } else {
        const response = await delayCallApi(type, route, params, authorized, 2, 1000, delayAttempt + 1)
        resolve(response)
      }
    }, delay)
  })
}

/**
 * Send reset password request
 *
 * @param email
 * @returns {Promise<object>} The API response data
 */
export const resetPasswordRequest = async (email = '') => {
  return await callAPI('GET', '/api/users/request-password-reset',
    new URLSearchParams({
      email
    }), 0)
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
export const getUser = async (id) => {
  return await callAPI('GET', `/api/users/${id}`)
}

/**
 * Complete registration
 *
 * @param email
 * @param password
 * @param invitationToken
 * @returns {Promise<boolean>}
 */
export const completeRegistration = async (email, password, invitationToken) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('POST', '/api/users/complete-registration',
    {
      email,
      password,
      invitation_token: invitationToken
    }, 0)
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
 * Change Account User Info
 * @param password
 * @param names
 * @returns {Promise<object>} The API response data
 */
export const changeAccount = async (attachments, password, name) => {
  api.setHeader('Content-Type', 'multipart/form-data;boundary="boundary"')
  const searchParams = new URLSearchParams({
    password,
    name
  })
  return await callAPI('POST', `/api/users/account-info?${searchParams.toString()}`, attachments)
}

/**
 * Change user password
 * @param password
 * @returns {Promise<object>} The API response data
 */
export const changeUserPasswordName = async (password, name) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('PUT', '/api/users/change-password-name',
    {
      password,
      name
    }
  )
}

/**
 * Send Notification
 * @param option
 * @param clientId
 * @param extraInfo
 * @returns {Promise<object>} The API response data
 */
export const sendNotification = async (
  option,
  clientId,
  userId,
  extraInfo
) => {
  api.setHeader('Content-Type', 'application/json')
  return await callAPI('POST', '/api/notifications/send',
    {
      option,
      clientId,
      userId,
      extraInfo
    }
  )
}
