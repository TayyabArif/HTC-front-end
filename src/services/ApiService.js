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
  await login(email, password, '/')
  store.dispatch(loadingActions.hide())
}
