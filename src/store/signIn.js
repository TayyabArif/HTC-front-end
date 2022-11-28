import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
  token: null,
  user: null,
  client: null,
  request: true,
  changedEmail: null,
  clientInfo: null,
  masqueradeClientInfo: null,
  refreshTokenFlag: 0,
  prevToken: null,
  email: null
}

/**
 * Create a slice of reducer for auth
 *
 * @type {Slice<{user: null, token: null}, {logout(*): void, login(*, *): void}, string>}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login (state, action) {
      state.token = action.payload
    },
    logout (state) {
      state.token = null
      state.user = null
      state.client = null
      state.request = true
      state.clientInfo = null
      state.masqueradeClientInfo = null
      state.refreshTokenFlag = 0
    },
    setToken (state, action) {
      state.token = action.payload
    },
    setUser (state, action) {
      state.user = action.payload
    },
    setRemember (state, action) {
      state.email = action.payload
    },
    removeRemember (state) {
      state.email = null
    },
    setClient (state, action) {
      state.client = action.payload
    },
    removeClient (state) {
      state.client = null
    },
    requestSuccess (state) {
      state.request = true
    },
    requestError (state) {
      state.request = false
    },
    setChangedEmail (state, action) {
      state.changedEmail = action.payload
    },
    setClientInfo (state, action) {
      state.clientInfo = action.payload
    },
    setMasqueradeClientInfo (state, action) {
      state.masqueradeClientInfo = action.payload
    },
    setRefreshTokenFlag (state, action) {
      state.refreshTokenFlag = action.payload
    },
    setPrevToken (state, action) {
      state.prevToken = action.payload
    }
  }
})

export const authActions = authSlice.actions

export default authSlice.reducer
