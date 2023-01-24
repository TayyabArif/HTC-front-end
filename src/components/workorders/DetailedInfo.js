// main components
import React, { useState, useEffect } from 'react'
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
import { WoDetails } from './WoDetails'
import { AuditTrail } from './AuditTrail'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { getWOstatus } from '../../lib/Global'
import { detailedInfoStyles } from '../../styles/classes/WorkOrdersClasses'

// Uncomment when needed
const iconStyle = {
  cursor: 'pointer'
}

function TabPanel (props) {
  const classes = detailedInfoStyles()
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
  const classes = detailedInfoStyles()
  const { t } = useTranslation()
  const { workOrder, handleClosePanel, viewMode } = props

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
          '',
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
            </>
          )}
        </div>
        <Grid style={{ opacity: ready ? 1 : 0.1 }} container>
          <Grid item xs={8} classes={{ root: classes.grid }}>
            <FormLabel
              component="legend"
              classes={{ root: classes.description }}
            >
              {(viewMode ? trips[0] : workOrder)?.category}
            </FormLabel>
          </Grid>
        </Grid>
        <Grid style={{ opacity: ready ? 1 : 0.1 }} container>
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
