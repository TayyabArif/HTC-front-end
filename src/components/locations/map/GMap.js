import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/** Google maps **/
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'

/** Material UI **/
import { Box, CircularProgress, useTheme, OutlinedInput, IconButton, InputAdornment, Button, Grid } from '@mui/material'
import { SearchOutlined, ArrowBackIosOutlined, Clear } from '@mui/icons-material'
import { mapStylesGray, iconSearch } from '../../../styles/mui_custom_theme'

/** Components **/
import { MapActionButtons } from './MapActionButtons'
import workIcon from '../../../assets/icons/work_icon.svg'

/* COMMENTED FOR FUTURE USE */
import { MapCounters } from './MapCounters'

import { OnlyMarker } from './OnlyMarker'
import { InfoMarker } from './InfoMarker'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'
import { filtersActions } from '../../../store/filters'
import { userHasAuthorization } from '../../../services/AuthService'
// TODO: create api endpoints for the page
// import { getSiteWorkOrders, getSiteProposals } from '../../../services/ApiService'

// Styles
import { mapStyles } from '../../../styles/classes/LocationsClasses'

/* Utils */
import { mobileBreakpoint } from '../../../lib/Constants'
import { useWindowWidth } from '@react-hook/window-size'

export const GMap = (props) => {
  const classes = mapStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const woSearch = useRef('')
  const locationsStore = useSelector((state) => state.locations)
  const clientStore = useSelector(state => state.auth.client)
  const requestLoading = useSelector(state => state.loading.loading)
  const [mapType, setMapType] = useState('roadmap')
  const [weather, setWeather] = useState('off')
  const [mapStylesState, setMapStylesState] = useState(mapStylesGray)
  const [enableCluster, setEnableCluster] = useState(true)
  const [loading, setLoading] = useState(false)

  const wWidth = useWindowWidth()

  useEffect(() => {
    setEnableCluster(locationsStore.activeTab === 'all_sites')
  }, [locationsStore.activeTab])

  const handlerSearchBtnClick = () => {
    props.setHideLeftSection(!props.hideLeftSection)
  }
  const [map, setMap] = useState(null)
  const getMapInstance = (mapInstance) => {
    setMap(mapInstance)
    mapInstance.setMapTypeId('terrain')
  }

  const handleSearchChange = (event) => {
    if (!locationsStore.showSiteViewPanel) {
      props.setSearchTerm(event.target.value)
    }
  }

  const handleKeyUpSearch = (event) => {
    if (locationsStore.showSiteViewPanel) {
      if (event.key === 'Enter') {
        switch (props.actualWoTab) {
          case 'proposals':
            // TODO: get location proposals
            changeStatesProposals([], {}, {}, true)
            /* updateProposalUsedParams(locationsStore.selectedSite.id, 1, 25, woSearch.current.value)
            getSiteProposals(locationsStore.selectedSite.id, 1, 25, woSearch.current.value).then(response => {
              ReactGA.event({
                category: 'search',
                action: 'site_view_search'
              })
              if (response) {
                changeStatesProposals(response.proposals, response.meta, response.meta, true)
              }
            }).catch(e => {
              console.error(e)
            }) */
            break
          default:
            // TODO: get locations work orders
            changeStates([], {}, {}, false, true)
            /* getSiteWorkOrders(locationsStore.selectedSite.id, 1, 25, woSearch.current.value).then(response => {
              ReactGA.event({
                category: 'search',
                action: 'site_view_search'
              })
              if (response) {
                changeStates(response.work_orders, response.meta, response.meta, false, true)
              }
            }).catch(e => {
              console.error(e)
            }) */
            break
        }
      }
    }
  }

  const changeStates = (workOrders, meta, metaFilters, advancedSearchApplied, resetChipFilters) => {
    dispatch(locationsActions.setWorkOrders(workOrders))
    dispatch(locationsActions.setWorkOrdersMeta(meta))
    metaFilters && dispatch(locationsActions.setWorkOrdersMetaFilters(metaFilters))
  }

  const changeStatesProposals = (proposals, meta, metaFilters, resetChipFilters) => {
    dispatch(locationsActions.setProposals(proposals))
    dispatch(locationsActions.setProposalsMeta(meta))
    metaFilters && dispatch(locationsActions.setProposalsMetaFilters(metaFilters))
    dispatch(locationsActions.setResetChipFilters(resetChipFilters))
  }

  const handleClearSearchBox = (event) => {
    woSearch.current.value = ''
    if (!locationsStore.advancedSearchAppliedFlag) {
      // TODO: get locations work orders
      changeStates([], {}, {}, false, true)
    }
  }

  const handleCloseSiteView = () => {
    dispatch(locationsActions.setActiveInfoWindow(null))
    dispatch(locationsActions.showSearch())
    dispatch(locationsActions.showMapSiteView({
      coordinates: {
        lat: 40.175472,
        lng: -101.466083
      },
      zoom: wWidth > mobileBreakpoint ? 5 : 3,
      hideMarkers: false,
      selectedMarkerIndex: null
    }))
  }

  const handleActiveTab = () => {
    if (locationsStore.showSiteViewPanel) {
      switch (props.actualWoTab) {
        case 'work_orders':
          props.setActualWoTab('site_details')
          break
        case 'site_details':
          props.setActualWoTab('proposals')
          break
        case 'proposals':
          props.setActualWoTab('work_orders')
          break
      }
      props.setHideLeftSection(!props.hideLeftSection)
    } else {
      dispatch(locationsActions.showMapSiteView({
        coordinates: {
          lat: 40.175472,
          lng: -101.466083
        },
        zoom: wWidth > mobileBreakpoint ? 5 : 3,
        hideMarkers: false,
        selectedMarkerIndex: null
      }))
      dispatch(filtersActions.handleMobileDrawer(false))
      dispatch(locationsActions.setActiveInfoWindow(null))
      dispatch(locationsActions.setSelectedSite(null))
      dispatch(locationsActions.setAdvancedFiltersSelected(null))
      dispatch(locationsActions.setAdvancedFiltersParams(null))
      dispatch(locationsActions.setSiteExceptionReport(null))
      dispatch(locationsActions.setSiteExceptionReportParams(null))
      dispatch(locationsActions.setActiveTab(locationsStore.activeTab === 'active_work_orders' ? 'all_sites' : 'active_work_orders'))
      dispatch(locationsActions.reloadResponse())
    }
  }

  const showLabel = () => {
    if (locationsStore.showSiteViewPanel) {
      switch (props.actualWoTab) {
        case 'work_orders':
          return t('sites.work')
        case 'site_details':
          return t('sites.details')
        case 'proposals':
          return t('sites.proposals')
      }
    } else {
      if (locationsStore.activeTab === 'active_work_orders') {
        return t('sites.active')
      } else {
        return t('sites.all')
      }
    }
  }

  const renderMap = useMemo(() => {
    if (props.searchResults) {
      return (<LoadScript
        id={props.screen + '-map'}
        key={props.screen + '-map'}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          id={props.screen + '-map'}
          key={props.screen + '-map'}
          options={{
            fullscreenControl: false,
            styles: mapStylesState,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            minZoom: 3,
            gestureHandling: 'greedy'
          }}
          mapContainerClassName={classes.markers}
          mapContainerStyle={{ height: wWidth <= mobileBreakpoint ? 'calc(100vh - 78px)' : 'calc(100vh - 60px)', width: '100%', overflowY: 'hidden' }}
          center={locationsStore.map.center}
          zoom={locationsStore.map.zoom}
          onLoad={(map) => getMapInstance(map)}
          onClick={() => {
            dispatch(locationsActions.setActiveInfoWindow(null))
            dispatch(filtersActions.setWoSiteFilter(null))
          }}
          onZoomChanged={() => {
            if (!map) return
            dispatch(locationsActions.resetZoomAndCenter({
              zoom: map.zoom,
              center: {
                lat: map.center.lat(),
                lng: map.center.lng()
              }
            }))
          }}
          mapTypeId={mapType === 'satellite' ? 'satellite' : 'terrain'}
        >
          {/* Had to use inline styles otherwise the style does not work inside google map component */}
          <Box hidden={!loading} style={{
            position: 'absolute',
            top: '50%',
            right: '50%'
          }}>
            <CircularProgress color="inherit" />
          </Box>
          <Box display={'flex'}>
            <MapActionButtons
              handlerSearchBtnClick={handlerSearchBtnClick}
              hideLeftSection={props.hideLeftSection}
              mapType={mapType}
              setMapType={setMapType}
              setMapStylesState={setMapStylesState}
              weather={weather}
              setWeather={setWeather}
              map={map}
              forceReloadOverlay={props.forceReloadOverlay}
              setLoading={setLoading}
            />
            { wWidth > mobileBreakpoint
              ? <Grid marginLeft={-1} container>
                <Grid align={'left'} item xs={12} sm={4} md={6} lg={8} xl={9} >
                  <MapCounters searchResults={props.searchResults} date={props.date} />
                </Grid>
              </Grid>
              : <Box hidden={window.location.pathname.includes('/work-orders') || window.location.pathname.includes('/proposals')} style={{ width: '100%' }} >
                <Box style={{
                  display: 'flex',
                  padding: '0px 10px 0px 7px'
                }} >
                  {(locationsStore.showSiteViewPanel && <IconButton
                    onClick={handleCloseSiteView}
                    style={{
                      color: theme.colors.workOrders.tab.wonum,
                      marginTop: '13px',
                      marginRight: '5px',
                      padding: 'unset'
                    }}>
                    <ArrowBackIosOutlined />
                  </IconButton>)}
                  <OutlinedInput
                    inputRef={locationsStore.showSiteViewPanel ? woSearch : props.searchValue}
                    size='small'
                    disabled={(userHasAuthorization('masquerade:write') && !clientStore) || props.actualWoTab === 'site_details'}
                    onKeyUp={handleKeyUpSearch}
                    fullWidth
                    required
                    id='search'
                    autoComplete="off"
                    placeholder={locationsStore.showSiteViewPanel ? t('sites.mobile_work') : t('sites.mobile_placeholder')}
                    name='search'
                    onChange={handleSearchChange}
                    startAdornment={<SearchOutlined style={iconSearch} />}
                    endAdornment={locationsStore.showSiteViewPanel
                      ? <InputAdornment
                      position='end'
                      onClick={handleClearSearchBox}
                    >
                      <Clear className={classes.clearAdornment}/>
                    </InputAdornment>
                      : null}
                      // inline style to solve map classes overlapping
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      marginRight: '10px',
                      backgroundColor: `${theme.palette.primary.contrastText}`,
                      borderRadius: '4px',
                      height: '58px',
                      marginTop: '16px',
                      marginLeft: locationsStore.showSiteViewPanel ? '0px' : '8px'
                    }}
                  />
                  <Box
                    position='end'
                  >
                    <Button onClick={() => handleActiveTab()} style={{
                      fontSize: '12px',
                      width: '64px',
                      fontWeight: '700',
                      height: '58px',
                      marginTop: '16px',
                      padding: '0px 10px',
                      textAlign: 'center',
                      display: 'block',
                      textTransform: 'none',
                      color: theme.palette.primary.light,
                      backgroundColor: theme.palette.primary.contrastText
                    }} classes={{ root: classes.mobileMapButton }} >
                      {locationsStore.showSiteViewPanel && <img className={classes.logo} src={workIcon} />}
                      {showLabel()}
                    </Button>
                  </Box>
                </Box>
              </Box>
            }

          </Box>
          {enableCluster && !requestLoading && props.searchResults.sites?.length
            ? <MarkerClusterer
              styles={[
                {
                  textColor: theme.colors.locations.clustersTextColor,
                  height: 40,
                  url: '/icons/m40.png',
                  width: 40
                },
                {
                  textColor: theme.colors.locations.clustersTextColor,
                  height: 70,
                  url: '/icons/m70.png',
                  width: 70
                },
                {
                  textColor: theme.colors.locations.clustersTextColor,
                  height: 100,
                  url: '/icons/m100.png',
                  width: 100
                },
                {
                  textColor: theme.colors.locations.clustersTextColor,
                  height: 175,
                  url: '/icons/m175.png',
                  width: 175
                },
                {
                  textColor: theme.colors.locations.clustersTextColor,
                  height: 250,
                  url: '/icons/m250.png',
                  width: 250
                }
              ]
              }
              onClick={() => {
                dispatch(locationsActions.setActiveInfoWindow(null))
              }}
            >
              {
                (clusterer) => props.searchResults.sites.map((site, index) => {
                  // if site level view is active, only show the corresponding marker
                  if (locationsStore.selectedSite && locationsStore.showSiteViewPanel) {
                    if (locationsStore.selectedSite.id === site.id) {
                      return <OnlyMarker
                      key={index}
                      index={site.id}
                      position={site.coordinates}
                      clusterer={clusterer}
                      site={site}
                      enableCluster={enableCluster}
                    />
                    } else {
                      return null
                    }
                  } else {
                    return <OnlyMarker
                    key={index}
                    index={site.id}
                    position={site.coordinates}
                    clusterer={clusterer}
                    site={site}
                    enableCluster={enableCluster}
                  />
                  }
                })
              }
            </MarkerClusterer>
            : !requestLoading && props.searchResults.sites.map((site, index) => {
                return (
                <OnlyMarker
                  key={index}
                  index={site.id}
                  position={site.coordinates}
                  site={site}
                />)
              }
              )
          }
          {locationsStore.activeInfoWindow && props.searchResults.sites.find(site => locationsStore.activeInfoWindow === site.id) &&
            (<InfoMarker
              key={props.screen + 'infomarker'}
              index={locationsStore.activeInfoWindow}
              position={props.searchResults.sites.find(site => locationsStore.activeInfoWindow === site.id).coordinates}
              site={props.searchResults.sites.find(site => locationsStore.activeInfoWindow === site.id)}
              actualWoTab={props.actualWoTab}
              setActualWoTab={props.setActualWoTab}
              map={map}
              dateStart={props.dateStart}
              dateEnd={props.dateEnd}
              selectedDate={props.selectedDate}
            />)}
        </GoogleMap>
      </LoadScript>)
    }
  }, [requestLoading, locationsStore.activeInfoWindow, enableCluster, props.hideLeftSection, props.searchResults, locationsStore.map, map, mapType, weather, props.forceReloadOverlay, loading])

  return (renderMap ?? null)
}
