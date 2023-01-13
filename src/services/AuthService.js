import * as Auth from '../lib/Auth'
import * as Api from '../lib/Api'
import { authActions } from '../store/signIn'
import { store } from '../store'
import { decodeToken } from '../lib/Global'

/**
 * Call to login auth server endpoint
 *
 * @param username
 * @param password
 * @returns {Promise<void>}
 */
export const login = async (username, password, redirect = '/work-orders') => {
  try {
    const response = await Auth.login(username, password)
    store.dispatch(authActions.login(response))
    const tokenInfo = decodeToken(response.access_token)
    const user = await Api.getUser()

    if (!user.scopes?.name) {
      store.dispatch(authActions.logout())
      throw {
        name: 'Invalid user',
        error: 'There are no permissions for this user',
        code: 402
      }
    }

    store.dispatch(
      authActions.setUser({
        ...tokenInfo,
        userInfo: user
      })
    )

    // uncomment to redirect
    store.dispatch(
      authActions.setRedirect({
        redirect: redirect
      })
    )
    setTimeout(() => {
      store.dispatch(authActions.resetRedirect({}))
    }, 1000)
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
export const refreshToken = async refreshToken => {
  const response = await Auth.refreshToken(refreshToken)
  if (response) {
    store.dispatch(
      authActions.setToken({
        ...response
      })
    )
  }
}

/**
 * Check if the logged in user has authorization for specific scopes
 *
 * @param scopes
 * @returns {boolean}
 */
export const userHasAuthorization = scopes => {
  const request = scopes.split(':')
  const authStore = store.getState().auth
  const allowedScopes = authStore.user?.userInfo?.scopes
  if (request && request.length) {
    const requestedScope = allowedScopes?.permissions[request[0]]
    if (requestedScope && requestedScope[request[1]]) {
      return true
    }
  }

  return false
}

/**
 * Request reset password
 *
 * @param email
 * @returns {Promise<*>}
 */
export const requestResetPassword = async email => {
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
 * @param email
 * @returns {Promise<*>}
 */
export const resetPassword = async (
  selector,
  token,
  password,
  password2,
  apiToken
) => {
  try {
    const response = await Auth.resetPassword(
      selector,
      token,
      password,
      password2,
      apiToken
    )

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
