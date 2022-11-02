import { createSlice } from '@reduxjs/toolkit'

const initialServiceState = {
  openModal: false,
  snackbar: false,
  snackmessage: null
}

/**
 * Create a slice of reducer for auth
 *
 * @type {Slice<{user: null, token: null}, {logout(*): void, login(*, *): void}, string>}
 */
const serviceSlice = createSlice({
  name: 'services',
  initialState: initialServiceState,
  reducers: {
    showRequestService (state) {
      state.openModal = true
    },
    hideRequestService (state) {
      state.openModal = false
    },
    showSnack (state) {
      state.snackbar = true
    },
    hideSnack (state) {
      state.snackbar = false
    },
    setSnackMessage (state, action) {
      state.snackmessage = action.payload
    },
    cleanSnackMessage (state) {
      state.snackmessage = null
    }
  }
})

export const serviceActions = serviceSlice.actions

export default serviceSlice.reducer
