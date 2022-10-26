import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false
}

/**
 * Create loading slice to show and hide a loader overlay
 *
 * @type {Slice<{loading: boolean}, {hide(*): void, show(*): void}, string>}
 */
const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialState,
  reducers: {
    show (state) {
      state.loading = true
    },
    hide (state) {
      state.loading = false
    }
  }
})

export const loadingActions = loadingSlice.actions

export default loadingSlice.reducer
