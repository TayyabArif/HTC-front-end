import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'

/** Redux **/
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../store/locations'

// Styles
import { locationCardStyles } from '../../styles/classes/LocationsClasses'

export const WorkOrderCard = (props) => {
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
    dispatch(locationsActions.showMapSiteView({
      coordinates: props.info.coordinates,
      zoom: 19,
      hideMarkers: true,
      selectedMarkerIndex: props.index
    }))
    dispatch(locationsActions.setSelectedSite(props.info))
    dispatch(locationsActions.setActiveInfoWindow(props.info.id))
  }

  const renderLocation = useMemo(() => {
    return (
      <Box className={'sitesCard'} pb={0.5} style={props.style} display="flex">
        <div>
            <Typography className={classes.serviceName}></Typography>
        </div>
        <Paper className={classes.locationTile} elevation={1}
             onClick={handleClickLocation}
          >
        <Box p={2}>
          <Typography className={classes.font16} align='left'>
            {props.info.name}
          </Typography>
          <Typography className={classes.font12} align='left'>
            {props.info.address}, {props.info.city} {props.info.state} {props.info.zipcode}
          </Typography>
          <Box hidden={!(locationsStore.activeTab === 'active_work_orders')}>
            <Grid container >
              <Grid item xs={12} sm={6}>
                <FiberManualRecord className={classes.activeWorkCircle}/>
                <Typography display={'inline'} className={classes.font12} align='left'>
                  {props.info.work_orders_summary.active > 0 ? props.info.work_orders_summary.active + ' ' + t('locations.locations_active_work') : `0 ${t('locations.locations_active_work')}` }
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {props.info.work_orders_summary.in_progress > 0 && (
                    <>
                      <FiberManualRecord className={classes.completedWork}/>
                      <Typography display={'inline'} className={classes.font12} align='left'>
                        {props.info.work_orders_summary.in_progress} {t('locations.locations_in_progress_work')}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }, [props.info, locationsStore.activeTab])

  return renderLocation
}
