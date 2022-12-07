import React from 'react'
import { useTranslation } from 'react-i18next'

/** Components **/
import { WorkStatusIndicator } from '../../WorkStatusIndicator'
import { useWindowWidth } from '@react-hook/window-size'

/** Material UI **/
import { Box, Grid, Paper, Typography, useTheme, Icon } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'

/** Google maps **/
import { Marker, InfoWindow } from '@react-google-maps/api'

/** Images **/
import selectedm23 from '../../../assets/images/clusters/selectedm23.png'
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
import landIcon from '../../../assets/icons/landicon.svg'
import snowIcon from '../../../assets/icons/snowicon.svg'
import sweepIcon from '../../../assets/icons/sweepicon.svg'
import specialIcon from '../../../assets/icons/specialicon.svg'
import otherIcon from '../../../assets/icons/otherservice.svg'
import enhancementIcon from '../../../assets/icons/enhancementicon.svg'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'
import { filtersActions } from '../../../store/filters'
import ReactGA from 'react-ga4'

// Constants
import { mobileBreakpoint } from '../../../lib/Constants'

// Styles
import { infoMarkerStyles } from '../../../styles/classes/LocationsClasses'

export const InfoMarker = (props) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const classes = infoMarkerStyles()
  const locationsStore = useSelector((state) => state.locations)
  const dispatch = useDispatch()
  const actualWidth = useWindowWidth()

  const handleClickLocation = (index, location) => {
    if (window.location.pathname.includes('/work-orders') || window.location.pathname.includes('/proposals')) {
      dispatch(locationsActions.setActiveInfoWindow(null))
      dispatch(filtersActions.setWoSiteFilter(location))
      dispatch(filtersActions.handleMobileDrawer(true))
    } else if (locationsStore.selectedSite.id !== index || !locationsStore.showSiteViewPanel) {
      dispatch(locationsActions.setLastState({
        coordinates: {
          lat: props.map?.center.lat(),
          lng: props.map?.center.lng()
        },
        zoom: props.map?.zoom
      }))
      dispatch(locationsActions.showSiteViewPanel())
      props.setActualWoTab('work_orders')
      ReactGA.event({
        category: 'show',
        action: 'show_site_view'
      })
      dispatch(filtersActions.handleMobileDrawer(true))
    }
  }

  const index = props.index
  const site = props.site

  return (<Marker
      icon={ props.enableCluster
        ? (locationsStore.setActiveInfoWindow === index ? selectedm23 : m23)
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
        {locationsStore.activeTab === 'active_work_orders'
          ? <InfoWindow
          position={site.coordinates}
          options={{
            disableAutoPan: false,
            pixelOffset: new window.google.maps.Size(actualWidth > mobileBreakpoint ? 240 : 0, -15),
            closeBoxURL: '',
            enableEventPropagation: true
          }}
        >
          <Box data-testid={'infomarker'} p={1} pt={2} className={classes.infoWindowBox}
            onClick={() => handleClickLocation(index, site)}
          >
            <Grid container className={classes.gridIcons} >
              <Grid item xs={8}>
                {site.trades.includes('Snow')
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={snowIcon} />
                </Icon>
                  : null}
                {site.trades.includes('Land')
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={landIcon} />
                </Icon>
                  : null}
                {site.trades.includes('Sweep')
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={sweepIcon} />
                </Icon>
                  : null}
                {site.trades.includes('Special')
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={specialIcon} />
                </Icon>
                  : null}
                {site.trades.includes('Enhancement')
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={enhancementIcon} />
                </Icon>
                  : null}
                {!site.trades
                  ? <Icon>
                  <img alt={''} className={classes.icon} src={otherIcon} />
                </Icon>
                  : null}
              </Grid>
              <Grid alignItems="flex-end" item xs={4}>
                <Typography className={classes.dateTypo} align='right' >
                  {t('sites.filters.date.' + props.selectedDate)}
                </Typography>
              </Grid>
            </Grid>
            <Box pt={1} classes={{ root: classes.nameAddress }} >
              <Grid container>
                <Grid item xs={window.location.pathname.includes('/work-orders') ? 12 : 11}>
                  <Typography className={classes.font24} align='left'>
                    {site.name}
                  </Typography>
                  <Typography className={classes.font10} align='left'>
                    {site.address}, {site.city} {site.state} {site.zipcode}
                  </Typography>
                </Grid>
                <Grid hidden={window.location.pathname.includes('/work-orders')} item xs={1} className={classes.arrowGrid} >
                  <ArrowForward className={classes.arrowStyle} />
                </Grid>
              </Grid>
            </Box>
            <Box pt={4} classes={{ root: classes.counts }} >
              <Grid container spacing={1} className={classes.countsGrid} >
                <Grid item xs={4} >
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.open} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.open}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.open')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.dispatched} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.dispatched}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.dispatched')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.in_progress} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.in_progress}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.in_progress')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.returning} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.returning}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.returning')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.completed} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.completed}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.completed')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.canceled} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.canceled}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.canceled')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.no_service_required} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.no_service}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.no_service_required')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0}>
                    <Grid className={classes.workStatusTiles} container alignItems={'center'}>
                      <Grid align={'center'} item xs={3}>
                        <WorkStatusIndicator className={classes.workStatus} color={theme.colors.sites.workOrderColors.incomplete} />
                      </Grid>
                      <Grid align={'center'} item xs={3}>
                        <Typography component={'span'} className={classes.font12}>
                          {site.work_orders_summary.incomplete}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography component={'span'} className={classes.font12}>
                          {t('sites.markers.incomplete')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </InfoWindow>
          : <InfoWindow
        position={site.coordinates}
        options={{
          disableAutoPan: false,
          pixelOffset: new window.google.maps.Size(actualWidth > mobileBreakpoint ? 140 : 0, -15),
          closeBoxURL: '',
          visible: true,
          enableEventPropagation: false
        }}
      >
        <Box className={classes.infoSiteWindow}
        onClick={() => handleClickLocation(index, site)}
        >
            <Grid container>
              <Grid item xs={11}>
                <Typography className={classes.font24} align='left'>
                  {site.name}
                </Typography>
                <Typography className={classes.font10} align='left'>
                  {site.address}, {site.city} {site.state} {site.zipcode}
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.arrowGrid} >
                <ArrowForward className={classes.arrowStyle} />
              </Grid>
            </Grid>
          <Box>
          </Box>
        </Box>
      </InfoWindow>}
    </Marker>)
}
