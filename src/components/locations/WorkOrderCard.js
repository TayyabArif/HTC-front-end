import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Paper, Typography, useTheme } from '@mui/material'

/** Redux **/
import { useSelector/* , useDispatch */ } from 'react-redux'
// import { locationsActions } from '../../store/locations'

// Styles
import { woCardStyles } from '../../styles/classes/LocationsClasses'

export const WorkOrderCard = (props) => {
  const { info } = props
  const theme = useTheme()
  // const dispatch = useDispatch()
  const locationsStore = useSelector((state) => state.locations)
  const { t } = useTranslation()

  const styleProps = {
    activeWorkCircleColor: theme.colors.locations.noActivity
  }

  if (props.info?.work_orders_summary?.active > 0) {
    styleProps.activeWorkCircleColor = theme.palette.primary.light
  }

  const classes = woCardStyles(styleProps)

  const handleClickWo = () => {
    console.log(props.info)
    /* dispatch(locationsActions.showMapSiteView({
      coordinates: props.info.coordinates,
      zoom: 19,
      hideMarkers: true,
      selectedMarkerIndex: props.index
    }))
    dispatch(locationsActions.setSelectedSite(props.info))
    dispatch(locationsActions.setActiveInfoWindow(props.info.id)) */
  }

  const renderLocation = useMemo(() => {
    return (
      <Box className={'sitesCard'} pb={0.5} style={props.style} >
        <Paper className={classes.locationTile} elevation={1}
          onClick={handleClickWo}
        >
          <Box className={classes.serviceNameDiv}>
            <Typography className={classes.serviceName} >{info?.trade_name ? (info?.trade_name.length < 17 ? info?.trade_name : info?.trade_name.slice(0, 14) + '...') : ''}</Typography>
          </Box>
          <Box display="flex" width="100%">
            <Box flex={5}>
              <Typography className={classes.woNumber} display="inline" align='left'>
                WO# {info?.external_id}
              </Typography>
              <Typography className={classes.clientTracking} align='left'>
                {t('locations.work_orders.tracking')}# {info?.tracking}
              </Typography>
              <Typography className={classes.woType} align='left'>
                {info?.call_type}
              </Typography>
              <Typography className={classes.dateLabel} align='left'>
                {t('locations.work_orders.start_date')} {info?.start_date}
              </Typography>
              <Typography className={classes.woType} align='left'>
                {t('locations.work_orders.service_details')}: {info?.service_name}
              </Typography>
            </Box>
            <Box flex={3}>
              <Typography className={classes.woStatus} align='left'>
                {t(`work_orders.wo_states.${info?.status}`)}
              </Typography>
              <Typography className={classes.priority} align='left'>
                {t('locations.work_orders.priority')} {info?.priority}
              </Typography>
              <Typography className={classes.dateLabel} align='left'>
                {t('locations.work_orders.end_date')} {info?.end_date}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }, [info, locationsStore.activeTab])

  return renderLocation
}
