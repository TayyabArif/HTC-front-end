// main components
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { ActivitiesCard } from './ActivitiesCard'
import { PhotoReel } from './PhotoReel'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

// mui components
import {
  FormLabel,
  Grid,
  Box,
  AppBar,
  Tab,
  Tabs,
  Drawer
} from '@mui/material'
import { statusColors } from '../../styles/mui_custom_theme'
import { getWorkOrder, workOrdersPortal } from '../../lib/Api'
import { navBarHeaderHeight } from '../../lib/Constants'
import { WoDetails } from './WoDetails'
import { AuditTrail } from './AuditTrail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom'
import { getWOstatus } from '../../lib/Global'

const useStyles = makeStyles(theme => ({
  presentation: {
    marginBottom: '0px',
    marginTop: '19px',
    overflowY: 'auto'
  },
  loading: {
    justifyItems: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '200px',
    paddingTop: '100px',
    fontSize: '16px'
  },
  drawerPaper: {
    maxHeight: `calc(100% - calc(${navBarHeaderHeight + ' + 12px'}))`,
    marginTop: navBarHeaderHeight,
    width: '360px',
    borderRadius: '8px',
    overflow: 'auto',
    overflowX: 'hidden',
    zIndex: 1500,
    boxSizing: 'content-box',
    marginRight: '19px',
    marginBottom: '20px',
    display: 'flex'
  },
  midTab: {
    minWidth: '50px',
    width: 'auto',
    minHeight: 25,
    maxHeight: '25px',
    height: '30px',
    fontSize: '12px',
    color: theme.colors.text,
    textTransform: 'none',
    backgroundColor: theme.colors.backdropColor,
    borderLeft: `1px solid ${theme.colors.workOrders.downloadIcon}`,
    borderRight: `1px solid ${theme.colors.workOrders.downloadIcon}`
  },
  tab: {
    minWidth: '50px',
    width: 'auto',
    minHeight: 25,
    maxHeight: '25px',
    height: 'auto',
    fontSize: '12px',
    color: theme.colors.text,
    textTransform: 'none',
    backgroundColor: theme.colors.backdropColor
  },
  tabs: {
    backgroundColor: 'white',
    minHeight: 25,
    maxHeight: '34px',
    height: '20px',
    margin: '0px 30px',
    '& .Mui-selected': {
      color: theme.palette.primary.light
    },
    zIndex: 1000
  },
  tabPanel: {
    '& .MuiBox-root': {
      padding: '0px'
    },
    padding: '0px 0px',
    marginTop: '10px'
  },
  title: {
    padding: '12px 0px',
    marginLeft: 'auto',
    marginRight: '15px',
    color: theme.colors.backdropColor,
    fontSize: '14px',
    fontWeight: '500'
  },
  appBar: {
    backgroundColor: theme.colors.backdropColor
  },
  description: {
    padding: '1px 0px',
    marginLeft: '23px',
    color: theme.colors.workOrders.tab.description,
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '2px'
  },
  drawerHeader: {
    display: 'flex',
    height: '60px',
    minHeight: '60px',
    alignItems: 'center',
    margin: '0 20px'
  },
  open: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.open,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  in_progress: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.in_progress,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  completed: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.completed,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  cancelled: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.grey,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  expired: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.declined,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  woNoStatus: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.text,
    flex: 1,
    maxWidth: '100px'
  },
  wonum: {
    padding: '1px 0px',
    marginLeft: '19px',
    color: theme.colors.workOrders.tab.wonum,
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '2px'
  },
  duedate: {
    padding: '3px 0px',
    marginLeft: '21px',
    color: theme.colors.workOrders.tab.wonum,
    fontSize: '12px',
    fontWeight: '500'
  },
  icon: {
    marginRight: '10px',
    height: '28px',
    width: '28px'
  },
  grid: {
    display: 'flex',
    marginTop: 'auto',
    padding: '0px 0px !important',
    margin: '0px 0px'
  },
  closeIcon: {
    marginRight: '5px',
    marginBottom: '10px'
  },
  invoiceLink: {
    color: theme.colors.iconBlue,
    marginLeft: '5px',
    fontSize: '12px',
    display: 'flex',
    flex: 1
  },
  openInvoice: {
    marginRight: '5px',
    fontSize: '15px',
    marginBottom: '8px'
  },
  invoiceIcon: {
    fontSize: '15px',
    marginBottom: '8px',
    marginRight: '10px'
  }
}))

// Uncomment when needed
const iconStyle = {
  cursor: 'pointer'
}

function TabPanel (props) {
  const classes = useStyles()
  const { children, index, value } = props

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3} className={classes.tabPanel}>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

export const DetailedInfo = props => {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [tabValue, setTabValue] = useState('/activities')
  const [trips, setTrips] = useState([])
  const [photos, setPhotos] = useState([])
  const [photoIndex, setPhotoIndex] = useState(-1)
  const classes = useStyles()
  const { t } = useTranslation()
  const { workOrder, handleClosePanel, viewMode } = props
  const history = useHistory()

  useEffect(() => {
    showWO()
  }, [workOrder])

  const showWO = async () => {
    if (workOrder) {
      try {
        setOpen(true)
        setReady(false)
        let wo = null
        // Retrieve WO data if there's no external id but there's a customer po
        if (!workOrder.external_id && workOrder.customer_po) {
          wo = await getWorkOrder(workOrder.id)
        }
        const info = await workOrdersPortal(
          true,
          '',
          '',
          '',
          '',
          '',
          workOrder?.external_id ?? wo?.external_id,
          '',
          '',
          'open,in_progress,completed,cancelled,expired',
          '',
          'trip_d',
          30,
          1
        )
        setTrips(info.locations)
        setReady(true)
      } catch (err) {
        console.error(err)
      }
    } else {
      setOpen(false)
      setReady(false)
      setTrips([])
    }
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleClose = () => {
    setOpen(false)
    handleClosePanel()
    setTabValue('/activities')
  }

  const cleanClose = () => {
    setPhotos([])
    setPhotoIndex(-1)
  }

  const tabs = () => (
    <div hidden={!ready} role="presentation" className={classes.presentation}>
      <AppBar
        position="static"
        elevation={0}
        classes={{ root: classes.appBar }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="simple tabs example"
          variant="fullWidth"
          classes={{ root: classes.tabs }}
          TabIndicatorProps={{
            style: {
              background: statusColors.open,
              height: '3px',
              borderRadius: '4px',
              width: '20%',
              marginLeft: '7%'
            }
          }}
        >
          <Tab
            className={classes.tab}
            value="/activities"
            label={t('work_orders.activities')}
            {...a11yProps('activities')}
          />
          <Tab
            className={classes.midTab}
            value="/audit"
            label={t('work_orders.audit')}
            {...a11yProps('audit')}
          />
          <Tab
            className={classes.tab}
            value="/details"
            label={t('work_orders.details')}
            {...a11yProps('details')}
          />
        </Tabs>
      </AppBar>
      <TabPanel
        classes={{ root: classes.tabPanel }}
        index="/audit"
        value={tabValue}
      >
        <AuditTrail workOrders={trips} />
      </TabPanel>
      <TabPanel
        classes={{ root: classes.tabPanel }}
        index="/activities"
        value={tabValue}
      >
        {tabActivities()}
      </TabPanel>
      <TabPanel
        classes={{ root: classes.tabPanel }}
        index="/details"
        value={tabValue}
      >
        <WoDetails workOrder={viewMode ? trips[0] : workOrder} />
      </TabPanel>
    </div>
  )

  const tabActivities = () => (
    <div>
      {trips &&
        trips.length > 0 &&
        trips.map((obj, ind) => (
          <ActivitiesCard
            key={ind}
            data={obj}
            index={ind}
            length={trips.length}
            photosFtc={obj.ftc?.photos ?? []}
            setPhotos={setPhotos}
            setPhotoIndex={setPhotoIndex}
            updateWoData={data => {
              obj = data
              if (obj.id === workOrder.id) {
                workOrder.status = 'completed'
                workOrder.invoice = data.invoice
              }
            }}
            setReady={setReady}
            setMessage={setLoadingMessage}
          />
        ))}
    </div>
  )

  const handleClick = () => {
    history.push({
      pathname: 'createInvoice',
      search: '?id=' + workOrder.invoice.id
    })
  }

  return (
    <div>
      {workOrder && (
        <PhotoReel
          photos={photos}
          index={photoIndex}
          cleanClose={cleanClose}
          woInfo={workOrder}
          style={{ zIndex: 1500 }}
        />
      )}
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={open}
        onClose={viewMode ? null : handleClose}
        classes={{ paper: classes.drawerPaper }}
        disableAutoFocus
        variant={viewMode ? 'persistent' : 'temporary'}
      >
        <div className={classes.drawerHeader}>
          {viewMode && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={iconStyle}
              className={classes.closeIcon}
              onClick={handleClose}
            />
          )}
          <FormLabel
            component="legend"
            className={
              (viewMode ? trips[0] : workOrder)?.status
                ? classes[getWOstatus(viewMode ? trips[0] : workOrder)]
                : classes.woNoStatus
            }
          >
            {(viewMode ? trips[0] : workOrder)?.status
              ? t(
                  `work_orders.wo_states.${getWOstatus(
                    viewMode ? trips[0] : workOrder
                  )}`
              )
              : t('work_orders.wo_states.no_status')}
          </FormLabel>
          {workOrder?.invoice?.id && (
            <>
              <FontAwesomeIcon
                className={classes.invoiceIcon}
                icon={['far', 'arrow-right-from-line']}
              />
              {/* Uncomment when needed */}
              <Link
                className={classes.invoiceLink}
                onClick={() => handleClick()}
              >
                <FontAwesomeIcon
                  className={classes.openInvoice}
                  icon={['far', 'file-invoice-dollar']}
                />
                {t('work_orders.open_invoice')}
              </Link>
            </>
          )}
        </div>
        <Grid style={{ opacity: ready ? 1 : 0.1 }} container spacing={1}>
          <Grid item xs={8} classes={{ root: classes.grid }}>
            <FormLabel
              component="legend"
              classes={{ root: classes.description }}
            >
              {(viewMode ? trips[0] : workOrder)?.category}
            </FormLabel>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={12}>
            <FormLabel component="legend" classes={{ root: classes.wonum }}>
              {t('general.labels.wo')}{' '}
              {(viewMode ? trips[0] : workOrder)?.customer_po ??
                (viewMode ? trips[0] : workOrder)?.external_id}
            </FormLabel>
            <FormLabel component="legend" classes={{ root: classes.duedate }}>
              {t('work_orders.due')}
              {': '}
              {moment(
                new Date(
                  (viewMode ? trips[0] : workOrder)?.expiration_date * 1000
                )
              ).format('MM/DD/YYYY hh:ss A')}
            </FormLabel>
          </Grid>
        </Grid>
        <FormLabel
          style={{ display: ready ? 'none' : 'block' }}
          classes={{ root: classes.loading }}
        >
          {(loadingMessage ?? t('general.labels.loading')) + '\n'}
          <Spin
            indicator={<LoadingOutlined spin />}
            style={{ display: ready ? 'none' : 'block' }}
          />
        </FormLabel>
        {tabs()}
      </Drawer>
    </div>
  )
}
