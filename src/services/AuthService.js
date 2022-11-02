import * as Auth from '../lib/Auth'
import * as Api from '../lib/Api'
import { getClient, sendNotification } from '../lib/Api'
import { authActions } from '../store/signIn'
import { store } from '../store'
import { convertToSlug, decodeToken } from '../lib/Global'
import { loadingActions } from '../store/loading'
import ReactGA from 'react-ga4'

/**
 * Call to login auth server endpoint
 *
 * @param username
 * @param password
 * @returns {Promise<void>}
 */
export const login = async (username, password) => {
  try {
    const userScopes = await Api.getUserScopes(username)

    let scopeParam = []
    if (userScopes && userScopes.length) {
      scopeParam = userScopes.map((item) => item.scope)
    }
    const response = await Auth.login(username, password, scopeParam.join(' '))
    if (response) {
      store.dispatch(authActions.login(response))
      const tokenInfo = decodeToken(response.access_token)
      const user = await Api.getUser(tokenInfo.userId)

      ReactGA.event({
        category: 'request',
        action: 'sign_in_request'
      })

      getClient(user.client_id).then(response => {
        ReactGA.event({
          category: 'request',
          action: `${convertToSlug(response.organization_name)}_activity`,
          label: `Sign in of user attached to client ${response.organization_name}`
        })
        store.dispatch(authActions.setClientInfo(response))
      }).catch(e => {
        console.error(e)
      })

      store.dispatch(authActions.setUser({
        ...tokenInfo,
        userInfo: user
      }))

      if (!userHasAuthorization('masquerade:write')) {
        sendNotification('client_log_in', user.client_id, user.id).catch(e => {
          console.error(e)
        })
      }
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Call to refresh token endpoint
 *
 * @param refreshToken
 * @returns {Promise<void>}
 */
export const refreshToken = async (refreshToken) => {
  const response = await Auth.refreshToken(refreshToken)
  if (response) {
    store.dispatch(authActions.setToken(
      {
        ...response
      }
    ))
  }
}

/**
 * Check if the logged in user has authorization for specific scopes
 *
 * @param scopes
 * @returns {boolean}
 */
export const userHasAuthorization = (scopes) => {
  const authStore = store.getState().auth
  const allowedScopes = authStore.user.scopes.split(' ')

  const found = scopes
    .split(' ')
    .every((scope) => allowedScopes.includes(scope))

  if (found) {
    return true
  }
  return false
}

/**
 * Request reset password
 *
 * @param email
 * @returns {Promise<*>}
 */
export const requestResetPassword = async (email) => {
  try {
    const response = await Api.resetPasswordRequest(email)

    if (response) {
      return response
    } else {
      return { status: false }
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Reset password
 *
 * @param selector
 * @param token
 * @param password
 * @param password2
 * @param apiToken
 * @returns {Promise<*>}
 */
export const resetPassword = async (selector, token, password, password2, apiToken) => {
  try {
    const response = await Auth.resetPassword(selector, token, password, password2, apiToken)

    if (response) {
      return response
    } else {
      return { status: false }
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

/**
 * Call to complete registration auth server endpoint
 *
 * @param email
 * @param password
 * @returns {Promise<void>}
 */
export const completeRegistration = async (email, password, invitationToken) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.completeRegistration(email, password, invitationToken)
    await login(email, password)
    store.dispatch(loadingActions.hide())
  } catch (e) {
    store.dispatch(loadingActions.hide())
    throw e
  }
}
