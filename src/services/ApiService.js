import * as Api from '../lib/Api'
import { loadingActions } from '../store/loading'
import { store } from '../store'
import { login } from './AuthService'

export const updateAccountSettings = async params => {
  store.dispatch(loadingActions.show())
  try {
    await Api.updateAccountSettings(params)
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error.message
  }
  store.dispatch(loadingActions.hide())
}

export const createClientUser = async (
  accessCode,
  firstName,
  lastName,
  email,
  phone,
  username,
  photoUrl,
  roles,
  role,
  password,
  avoidEmail = false
) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        role,
        phone,
        photo_url: photoUrl,
        username,
        password
      },
      '1st'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details[0]) {
      if (error.details.details[0].path.includes('email')) {
        throw error.details?.details[0].message
      }
      throw `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
      }`
    }
    throw error.message
  }

  try {
    await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        phone,
        photo_url: photoUrl,
        username,
        password
      },
      '2nd'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
      }`
    }
    throw error.message
  }

  let newUser = null
  try {
    newUser = await Api.createUser(
      {
        company_id: accessCode,
        firstName,
        lastName,
        email,
        roles,
        phone,
        photo_url: photoUrl,
        username,
        password,
        avoidEmail
      },
      'final'
    )
  } catch (error) {
    store.dispatch(loadingActions.hide())
    if (error.details?.details && error.details?.details) {
      throw `${error.details?.details[0].path.substring(1)} ${
          error.details?.details[0].message
      }`
    }
    throw error.message
  }

  store.dispatch(loadingActions.hide())
  return newUser
}

export const updateClientUser = async (id, params) => {
  store.dispatch(loadingActions.show())
  try {
    await Api.updateUser(id, params)
  } catch (error) {
    store.dispatch(loadingActions.hide())
    throw error
  }
  store.dispatch(loadingActions.hide())
}

export const getCompanyRoles = async companyId => {
  store.dispatch(loadingActions.show())
  try {
    const companyRoles = await Api.getCompanyRoles(companyId)
    store.dispatch(loadingActions.hide())
    return companyRoles
  } catch (e) {
    store.dispatch(loadingActions.hide())
    throw e
  }
}
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
