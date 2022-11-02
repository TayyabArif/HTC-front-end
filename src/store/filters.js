import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFiltersEnabled: null,
  isFiltersVisible: false,
  mobileDrawerVisible: false,
  clearAdvancedSearch: false,
  clearProposalSearch: false,
  woSiteFilter: null
}

const slice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    toggleFiltersVisible (state) {
      state.isFiltersVisible = !state.isFiltersVisible
    },
    showFilters (state) {
      state.isFiltersVisible = true
    },
    hideFilters (state) {
      state.isFiltersVisible = false
    },
    enableFilters (state) {
      state.isFiltersEnabled = true
    },
    disableFilters (state) {
      state.isFiltersEnabled = false
    },
    handleMobileDrawer (state, action) {
      state.mobileDrawerVisible = action.payload
    },
    handleClearAdvancedSearch (state, action) {
      state.clearAdvancedSearch = action.payload
    },
    handleClearProposalSearch (state, action) {
      state.clearProposalSearch = action.payload
    },
    setWoSiteFilter (state, action) {
      state.woSiteFilter = action.payload
    }
  }
})

export const filtersActions = slice.actions

export default slice.reducer
