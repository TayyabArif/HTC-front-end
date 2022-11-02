import decode from 'jwt-decode'

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
