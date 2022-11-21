import decode from 'jwt-decode'
import _ from 'lodash'
import { companyProfileFiles } from './Constants'

export const decodeToken = token => {
  try {
    return decode(token)
  } catch (error) {
    throw {
      name: 'Token Error',
      message: error.message,
      code: 5000
    }
  }
}

export const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '')
}

export const validateEmail = (email) => {
  /* eslint-disable-next-line */
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 *
 * @param {Array} zipCodesList array of zip codes object
 * @returns The number of selected zip codes
 */
export const getSelectedZiCodesNumber = zipCodesList => {
  let zipCodesLength = 0
  for (const item of zipCodesList) {
    if (item.selected) zipCodesLength++
  }
  return zipCodesLength
}

export const getBase64 = (file, callback) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    callback(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

/**
 * vendor onboarding mandatory fields validation
 * @param {Object} fields mandatory fields
 * @param {Object} data company profile information
 * @returns true validation passed else return false
 */
export const profileMandatoryValidation = (fields, data) => {
  const mandatoryValidation =
    fields &&
    Object.keys(fields).map(key => {
      // check fields with a particular structure
      if (
        key === 'address' &&
        (_.isEmpty(data?.address) || data[key]?.address?.length === 0)
      ) {
        return false
      }
      if (key === 'country' && data[key]?.length === 0) {
        return false
      }
      if (key === 'states_registered' && data[key]?.length === 0) {
        return false
      }
      if (key === 'states_registered' && data[key]?.length > 0) {
        let stateValidation = true
        const states = data?.states_registered
        states?.forEach(register => {
          if (!register.state) {
            stateValidation = false
          }
        })
        return stateValidation
      }
      if (companyProfileFiles.includes(key) && !data[key].url) {
        return false
      }
      if (key === 'coi_policy') {
        return data?.coi?.coi_policy.length !== 0
      }
      if (key === 'comp_policy') {
        return data?.comp?.comp_policy.length !== 0
      }
      if (key === 'coi_date') {
        if (Number(data?.coi?.coi_month) === 0) return false
        if (Number(data?.coi?.coi_year) === 0) return false
        return true
      }
      if (key === 'comp_date') {
        if (Number(data?.comp?.comp_month) === 0) return false
        if (Number(data?.comp?.comp_year) === 0) return false
        return true
      }
      if (key.match(/^bank_.*/)) {
        if (!data?.bank[key]) {
          return false
        } else {
          return true
        }
      }
      if (key.match(/^q_.*/)) {
        if (!data?.insurance_questions[key]) {
          return false
        } else {
          return true
        }
      }
      // check other fields
      if (!data[key]) {
        return false
      } else {
        return true
      }
    })
  const response =
    typeof mandatoryValidation === 'undefined'
      ? false
      : !mandatoryValidation?.includes(false)
  return response
}
