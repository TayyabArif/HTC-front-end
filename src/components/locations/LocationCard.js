import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'

/** Redux **/
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../store/locations'

/** Styles **/
import { locationCardStyles } from '../../styles/classes/LocationsClasses'

/** Utils **/
import { locationAddressLimit, locationNameLimit } from '../../lib/Constants'
import { limitLabel } from '../../lib/Global'

export const LocationCard = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationsStore = useSelector((state) => state.locations)

  const styleProps = {
    activeWorkCircleColor: theme.colors.locations.noActivity
  }

  if (props.info.work_orders_summary.active > 0) {
    styleProps.activeWorkCircleColor = theme.palette.primary.light
  }

  const classes = locationCardStyles(styleProps)

  const handleClickLocation = () => {
    if (props.info.coordinates) {
      dispatch(locationsActions.showMapSiteView({
        coordinates: props.info.coordinates,
        zoom: 19,
        hideMarkers: true,
        selectedMarkerIndex: props.index
      }))
      dispatch(locationsActions.setSelectedSite(props.info))
      dispatch(locationsActions.setActiveInfoWindow(null))
      dispatch(locationsActions.showSiteViewPanel())
    }
  }

  const renderLocation = useMemo(() => {
    return (
      <Box className={'sitesCard'} pb={0.5} style={props.style}>
        <Paper
          className={classes.locationTile}
          elevation={0}
          onClick={handleClickLocation}>
          <Box p={2}>
            <Typography className={classes.font16} align='left'>
              {limitLabel(props.info.name, locationNameLimit)}
            </Typography>
            <Typography className={classes.locationName} align='left'>
              {limitLabel(`${props.info.address}, ${props.info.city}` +
                `${props.info.state} ${props.info.zipcode}`, locationAddressLimit)}
            </Typography>
            <Box hidden={!(locationsStore.activeTab === 'active_work_orders')}>
              <Grid container className={classes.locationStatus}>
                {(props.info.work_orders_summary.open +
                props.info.work_orders_summary.in_progress +
                props.info.work_orders_summary.completed) === 0 && (
                  <Grid item xs={6}>
                    <FiberManualRecord className={classes.noActivityWork} />
                    <Typography display={'inline'} className={classes.font12} align='left'>
                      {t('locations.locations_no_activity')}
                    </Typography>
                  </Grid>
                )}
                {props.info.work_orders_summary.open > 0 && (
                  <Grid item xs={6} >
                    <FiberManualRecord className={classes.openWork} />
                    <Typography display={'inline'} className={classes.font12} align='left'>
                      {props.info.work_orders_summary.open} {t('locations.locations_open_work')}
                    </Typography>
                  </Grid>
                )}
                {props.info.work_orders_summary.in_progress > 0 && (
                  <Grid item xs={6}>
                    <FiberManualRecord className={classes.inProgressWork} />
                    <Typography display={'inline'} className={classes.font12} align='left'>
                      {props.info.work_orders_summary.in_progress} {t('locations.locations_in_progress_work')}
                    </Typography>
                  </Grid>
                )}
                {/* TODO: commented for future use:
                 props.info.work_orders_summary.completed > 0 && (
                  <Grid item xs={12} sm={6}>
                    <FiberManualRecord className={classes.completedWork} />
                    <Typography display={'inline'} className={classes.font12} align='left'>
                      {props.info.work_orders_summary.open} {t('locations.locations_completed_work')}
                    </Typography>
                  </Grid>
                ) */}
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }, [props.info, locationsStore.activeTab])

  return renderLocation
}
