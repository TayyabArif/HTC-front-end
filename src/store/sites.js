import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showSearch: true,
  showAdvancedFilters: false,
  showSiteViewPanel: false,
  advancedFiltersSelected: null,
  siteExceptionReport: null,
  advancedFiltersParams: null,
  siteExceptionReportParams: null,
  activeInfoWindow: null,
  activeTab: 'active_work_orders',
  reloadResponse: 0,
  map: {
    center: {
      lat: 40.175472,
      lng: -101.466083
    },
    zoom: 5,
    hideMarkers: false,
    selectedMarkerIndex: null
  },
  selectedSite: null,
  workOrders: null,
  workOrdersMeta: null,
  workOrdersMetaFilters: null,
  proposals: null,
  proposalsMeta: null,
  proposalsMetaFilters: null,
  advancedSearchAppliedFlag: false,
  resetChipFilters: false,
  appliedParams: {
    siteId: 0,
    page: 1,
    perPage: 25,
    search: '',
    workOrderStatus: '',
    workOrderNumber: '',
    startDateWorkOrderRange: '',
    endDateWorkOrderRange: '',
    creationDate: '',
    expirationDate: '',
    callTypes: '',
    priority: '',
    trades: ''
  },
  proposalAppliedParams: {
    siteId: 0,
    page: 1,
    perPage: 25,
    search: '',
    proposalStatus: '',
    proposalNumber: '',
    startDateProposalRange: '',
    endDateProposalRange: '',
    creationDate: ''
  },
  workOrderTab: 'work_orders',
  siteViewLastState: null
}

const slice = createSlice({
  name: 'sites',
  initialState: initialState,
  reducers: {
    showSearch (state) {
      state.showSearch = true
      state.showAdvancedFilters = false
      state.showSiteViewPanel = false
    },
    showAdvancedFilters (state) {
      state.showSearch = false
      state.showAdvancedFilters = true
    },
    setAdvancedFiltersSelected (state, action) {
      state.advancedFiltersSelected = action.payload
    },
    setSiteExceptionReport (state, action) {
      state.siteExceptionReport = action.payload
    },
    setAdvancedFiltersParams (state, action) {
      state.advancedFiltersParams = action.payload
    },
    setSiteExceptionReportParams (state, action) {
      state.siteExceptionReportParams = action.payload
    },
    setActiveInfoWindow (state, action) {
      state.activeInfoWindow = action.payload
    },
    showMapSiteView (state, action) {
      state.map.center = action.payload.coordinates
      state.map.zoom = action.payload.zoom
      state.map.hideMarkers = action.payload.hideMarkers
      state.map.selectedMarkerIndex = action.payload.selectedMarkerIndex
    },
    resetZoomAndCenter (state, action) {
      state.map.center = action.payload.center
      state.map.zoom = action.payload.zoom
    },
    showSiteViewPanel (state) {
      state.showSearch = false
      state.showSiteViewPanel = true
    },
    setSelectedSite (state, action) {
      state.selectedSite = action.payload
    },
    reloadResponse (state, action) {
      state.reloadResponse = state.reloadResponse + 1
    },
    setActiveTab (state, action) {
      state.activeTab = action.payload
    },
    setWorkOrders (state, action) {
      state.workOrders = action.payload
    },
    setWorkOrdersMeta (state, action) {
      state.workOrdersMeta = action.payload
    },
    setWorkOrdersMetaFilters (state, action) {
      state.workOrdersMetaFilters = action.payload
    },
    setProposals (state, action) {
      state.proposals = action.payload
    },
    setProposalsMeta (state, action) {
      state.proposalsMeta = action.payload
    },
    setProposalsMetaFilters (state, action) {
      state.proposalsMetaFilters = action.payload
    },
    setAdvancedSearchAppliedFlag (state, action) {
      state.advancedSearchAppliedFlag = action.payload
    },
    setResetChipFilters (state, action) {
      state.resetChipFilters = action.payload
    },
    setAppliedParams (state, action) {
      state.appliedParams = action.payload
    },
    setProposalAppliedParams (state, action) {
      state.proposalAppliedParams = action.payload
    },
    setWorkOrderTab (state, action) {
      state.workOrderTab = action.payload
    },
    setLastState (state, action) {
      state.siteViewLastState = action.payload
    }
  }
})

export const sitesActions = slice.actions

export default slice.reducer
