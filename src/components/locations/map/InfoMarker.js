import React from 'react'
// import { useTranslation } from 'react-i18next'

/** Components **/
import { useWindowWidth } from '@react-hook/window-size'

/** Material UI **/
import { Box, Typography } from '@mui/material'
import { ArrowRight } from '@mui/icons-material'

/** Google maps **/
import { Marker, InfoWindow } from '@react-google-maps/api'

/** Images **/
import selectedm23 from '../../../assets/images/clusters/selected.png'
import m23 from '../../../assets/images/clusters/m23.png'
import mOpen from '../../../assets/images/clusters/open.png'
import mCompleted from '../../../assets/images/clusters/completed.png'
import mInProgress from '../../../assets/images/clusters/in_progress.png'
import mNoWorkOrder from '../../../assets/images/clusters/no_work_order.png'
import mReturning from '../../../assets/images/clusters/returning.png'
import mIncomplete from '../../../assets/images/clusters/incomplete.png'
import mDispatched from '../../../assets/images/clusters/dispatched.png'
import mCanceled from '../../../assets/images/clusters/cancelled.png'
import mNoService from '../../../assets/images/clusters/no_service.png'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'

// Constants
import { mobileBreakpoint } from '../../../lib/Constants'

// Styles
import { infoMarkerStyles } from '../../../styles/classes/LocationsClasses'

export const InfoMarker = (props) => {
  const classes = infoMarkerStyles()
  const locationsStore = useSelector((state) => state.locations)
  const dispatch = useDispatch()
  const actualWidth = useWindowWidth()

  const index = props.index
  const site = props.site

  const handleClickLocation = (index, location) => {
    if (site.coordinates) {
      dispatch(locationsActions.showMapSiteView({
        coordinates: site.coordinates,
        zoom: 19,
        hideMarkers: true,
        selectedMarkerIndex: props.index
      }))
      dispatch(locationsActions.setSelectedSite(site))
      dispatch(locationsActions.setActiveInfoWindow(null))
      dispatch(locationsActions.showSiteViewPanel())
    }
  }
  return (<Marker
    visible={false}
    icon={props.enableCluster
      ? (locationsStore.selectedSite.id === index ? selectedm23 : m23)
      : (site.work_order_status === 'Unknown'
          ? mNoWorkOrder
          : site.work_order_status === 'open'
            ? mOpen
            : site.work_order_status === 'completed'
              ? mCompleted
              : site.work_order_status === 'returning'
                ? mReturning
                : site.work_order_status === 'canceled'
                  ? mCanceled
                  : site.work_order_status === 'in_progress'
                    ? mInProgress
                    : site.work_order_status === 'incomplete'
                      ? mIncomplete
                      : site.work_order_status === 'dispatched'
                        ? mDispatched
                        : site.work_order_status?.includes('no_service')
                          ? mNoService
                          : selectedm23)
    }
    {...props}
  >
    <InfoWindow
      position={site.coordinates}
      options={{
        disableAutoPan: false,
        pixelOffset: new window.google.maps.Size(actualWidth > mobileBreakpoint ? 107 : 0, -25),
        closeBoxURL: '',
        visible: true,
        enableEventPropagation: false
      }}
    >
      <Box display="flex" onClick={() => handleClickLocation(index, site)} >
        <Box className={classes.infoSiteWindow}>
          <Typography className={classes.font24} align='left'>
            {site.name}
          </Typography>
          <Typography className={classes.font10} align='left'>
            {site.address}, {site.city} {site.state} {site.zipcode}
          </Typography>
        </Box>
        <Box className={classes.arrowBox} >
          <ArrowRight className={classes.arrowStyle} />
        </Box>
      </Box>
    </InfoWindow>
  </Marker>)
}
