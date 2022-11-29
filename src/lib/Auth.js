import { create } from 'apisauce'
import qs from 'qs'

/**
 * Create an api of auth server
 *
 * @type {ApisauceInstance}
 */
const auth = create({
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
const processApiResponse = response => {
  if (!response.ok) {
    const title = `${response.status} - ${response.problem}`
    let message = `There was an error calling to the Auth Server: ${response.originalError}`
    if (response.data) {
      if (typeof response.data === 'string') {
        message = `${response.data}`
      } else {
        if (response.data.error) {
          message = `${response.data.error_description}`
        }
      }
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
 * Performs a call to the Auth Server
 *
 * @param {string} type The REST method
 * @param {string} route The API URI
 * @param {object} params The parameters to be sent to the API
 *
 * @throws {object} Will throw an error if the access token could not be refreshed
 *
 * @returns {object} The API response data
 */
const callAuth = async (type, route, params = {}) => {
  let response
  switch (type) {
    case 'POST':
      response = await auth.post(route, params)
      break
    default:
      throw {
        name: 'Method Not Allowed',
        message: 'Call type not supported',
        code: 405
      }
  }

  return processApiResponse(response)
}

/**
 * Get an access token
 *
 * @param username
 * @param password
 * @param scope
 * @returns {Promise<*>}
 */
export const login = async (username, password) => {
  return await callAuth(
    'POST',
    '/oauth/token',
    qs.stringify({
      grant_type: 'password',
      client_id: process.env.REACT_APP_FTC_CLIENT_ID,
      client_secret: process.env.REACT_APP_FTC_CLIENT_SECRET,
      username: username,
      password: password,
      scope: 'users:read'
    })
  )
}

/**
 * Refresh token
 *
 * @param refreshToken
 * @returns {Promise<*>}
 */
export const refreshToken = async refreshToken => {
  return await callAuth(
    'POST',
    '/oauth/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.REACT_APP_FTC_CLIENT_ID,
      client_secret: process.env.REACT_APP_FTC_CLIENT_SECRET,
      refresh_token: refreshToken,
      scope: 'all'
    })
  )
}

/**
 * Reset Password
 *
 * @param selector
 * @param token
 * @param password
 * @param password2
 * @param apiToken
 * @returns {Promise<*>}
 */
export const resetPassword = async (
  selector,
  token,
  password,
  password2,
  apiToken
) => {
  return await callAuth(
    'POST',
    '/oauth/reset-password',
    new URLSearchParams({
      selector,
      token,
      password,
      password2,
      apiToken
    })
  )
}
