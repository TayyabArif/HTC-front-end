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
export const login = async (username, password) => {
  try {
    const response = await Auth.login(username, password)
    store.dispatch(authActions.login(response))
    const tokenInfo = decodeToken(response.access_token)
    const user = await Api.getUser(tokenInfo.userId)

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
  } catch (e) {
    console.error(e)
    throw e
  }
}
