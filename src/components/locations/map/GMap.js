import React, { useEffect, useMemo, useState } from 'react'

/** Google maps **/
import { GoogleMap, LoadScript, MarkerClusterer } from '@react-google-maps/api'

/** Material UI **/
import { Box, CircularProgress, useTheme, Grid } from '@mui/material'
import { mapStylesGray } from '../../../styles/mui_custom_theme'

/** Components **/
import { MapActionButtons } from './MapActionButtons'
import { WeatherLegends } from './WeatherLegends'
import { WeatherPlayer } from './WeatherPlayer'

/* COMMENTED FOR FUTURE USE */
import { MapCounters } from './MapCounters'

import { OnlyMarker } from './OnlyMarker'
import { InfoMarker } from './InfoMarker'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'
import { filtersActions } from '../../../store/filters'
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
  const dispatch = useDispatch()
  const locationsStore = useSelector((state) => state.locations)
  const requestLoading = useSelector(state => state.loading.loading)
  const [mapType, setMapType] = useState('roadmap')
  const [weather, setWeather] = useState('off')
  const [mapStylesState, setMapStylesState] = useState(mapStylesGray)
  const [enableCluster, setEnableCluster] = useState(true)
  const [queryTime, setQueryTime] = useState(null)
  const [loading, setLoading] = useState(false)
  const [play, setPlay] = useState(false)

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
              queryTime={queryTime}
              play={play}
            />
            <Grid marginLeft={-1} container>
                <Grid align={'left'} item xs={12} >
                  <MapCounters searchResults={props.searchResults} date={props.date} hideLeftSection={props.hideLeftSection} />
                </Grid>
            </Grid>
          </Box>
          {!requestLoading && props.searchResults.sites?.length
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
                        enableCluster={true}
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
                      enableCluster={true}
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
          <WeatherLegends hidden={weather === 'off'} weather={weather} />
          <WeatherPlayer hidden={weather === 'off' || weather === 'temperature'} weather={weather} queryTime={queryTime} setQueryTime={setQueryTime}
            setForceReloadOverlay={props.setForceReloadOverlay} play={play} setPlay={setPlay} />
        </GoogleMap>
      </LoadScript>)
    }
  }, [requestLoading, locationsStore.activeInfoWindow, enableCluster, props.hideLeftSection, props.searchResults, locationsStore.map, map, mapType, weather, props.forceReloadOverlay, loading])

  return (renderMap ?? null)
}
