import { create, CancelToken } from 'apisauce'

const source = CancelToken.source()
/**
 * Create an api of NOAA NWS Radar Api
 *
 * @type {ApisauceInstance}
 */
const api = create({
  baseURL: process.env.REACT_APP_MAP_RADAR_SERVICE,
  cancelToken: source.token,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
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
    let message = `There was an error calling to NOAA Radar Service: ${response.originalError}`

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
const callAPI = async (type, route, params = {}, attempt = 1) => {
  let response
  const timeout = 30000

  switch (type) {
  case 'GET':
    setTimeout(() => { source.cancel('Operation canceled.') }, timeout)
    response = await api.get(route, params)
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
      if (attempt === 1) {
        return callAPI(type, route, params, 2)
      } else {
        return processApiResponse(response)
      }
    }
  }
  return processApiResponse(response)
}

/**
 * Get Capabilities
 *
 * @param layer
 * @param subLayer
 * @returns {Promise<object>}
 */

export const getCapabilities = async (
  layer,
  subLayer
) => {
  return await callAPI('GET', `/${layer}/${subLayer}/ows`,
    new URLSearchParams({
      service: 'WMS',
      version: '1.1.1',
      request: 'GetCapabilities'
    }))
}
