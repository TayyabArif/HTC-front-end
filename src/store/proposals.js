import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isRedirecting: false,
  siteId: null,
  coordinates: null
}

const slice = createSlice({
  name: 'proposals',
  initialState: initialState,
  reducers: {
    setIsRedirecting (state, action) {
      state.isRedirecting = action.payload
    },
    setSiteId (state, action) {
      state.siteId = action.payload
    }
  }
})

export const proposalsActions = slice.actions

export default slice.reducer
