import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'
import moment from 'moment'

/** Material UI **/
import { Box, Drawer, Grid, IconButton, InputAdornment, TextField, Container, Tabs, Tab, AppBar, Badge } from '@mui/material'
import { Menu, Clear, SortRounded, ArrowBackIos } from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'

/** Redux **/
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../store/locations'

/** Components **/
import { GMap } from '../components/locations/map/GMap'
import { SearchResults } from '../components/locations/SearchResults'
import { WorkOrdersList } from '../components/locations/WorkOrdersList'
import { SiteSortMenu } from '../components/locations/SiteSortMenu'
import { SiteFiltersMenu } from '../components/locations/SiteFiltersMenu'

/** Services **/
import { getLocations, callLocationApi } from '../services/ApiService'

// Constants
import { useWindowWidth } from '@react-hook/window-size'
import { locationsPerPage } from '../lib/Constants'

// Styles
import { locationsStyles } from '../styles/classes/LocationsClasses'

// Icon
import { MapFilterIcon } from '../assets/icons/MapFilterIcon'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 430,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

// hardcoded data
const workOrdersData = {
  meta: {
    current_page: 1,
    next_page: 2,
    prev_page: null,
    total_pages: 4,
    total_count: 82,
    total_result: 25,
    total_open: 6,
    total_active: 0,
    total_completed: 63,
    total_returning: 0,
    total_canceled: 0,
    total_incomplete: 10,
    total_dispatched: 3,
    total_no_service: 0,
    active_work_orders: 0,
    completed_work_orders: 0,
    open_work_orders: 0,
    returning_work_orders: 0,
    canceled_work_orders: 0,
    incomplete_work_orders: 0
  },
  work_orders: [
    {
      id: 1408437,
      external_id: '01633230',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '34235',
      priority: 'High'
    },
    {
      id: 1390386,
      external_id: '01611484',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '21312',
      priority: 'Low'
    },
    {
      id: 1383885,
      external_id: '01604982',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '87567',
      priority: 'High'
    },
    {
      id: 1374619,
      external_id: '01595446',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '56457',
      priority: 'High'
    },
    {
      id: 1362376,
      external_id: '01583186',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '4365',
      priority: 'Low'
    },
    {
      id: 1351803,
      external_id: '01554304',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '675634',
      priority: 'High'
    },
    {
      id: 1342612,
      external_id: '01545657',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '343345',
      priority: 'Low'
    },
    {
      id: 1339606,
      external_id: '01541339',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '34534',
      priority: 'Low'
    },
    {
      id: 1313443,
      external_id: '01520101',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'dispatched',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '1234',
      priority: 'High'
    },
    {
      id: 1328422,
      external_id: '01501616',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'dispatched',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '465456',
      priority: 'High'
    },
    {
      id: 1307446,
      external_id: '01490192',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '947375',
      priority: 'Low'
    },
    {
      id: 1296617,
      external_id: '01479306',
      trade_name: 'Land',
      service_name: null,
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '46346',
      priority: 'Low'
    },
    {
      id: 1289921,
      external_id: '01472442',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '35346',
      priority: 'Low'
    },
    {
      id: 1289796,
      external_id: '01472163',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '235346',
      priority: 'Low'
    },
    {
      id: 1284368,
      external_id: '01467342',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '453464',
      priority: 'Low'
    },
    {
      id: 1265316,
      external_id: '01461934',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '35467457',
      priority: 'High'
    },
    {
      id: 1269713,
      external_id: '01451478',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'incomplete',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '46454',
      priority: 'High'
    },
    {
      id: 1247730,
      external_id: '01440613',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'open',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '987959',
      priority: 'Low'
    },
    {
      id: 1239442,
      external_id: '01432499',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'dispatched',
      start_date: '02/22/22 5:00 PM',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '66754',
      priority: 'Low'
    },
    {
      id: 1225902,
      external_id: '01418762',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-09-10T12:56:39.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '767567',
      priority: 'High'
    },
    {
      id: 1216174,
      external_id: '01408972',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-09-03T17:26:55.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '45353',
      priority: 'Low'
    },
    {
      id: 1207229,
      external_id: '01400012',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-08-27T13:41:24.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '45645',
      priority: 'High'
    },
    {
      id: 1154710,
      external_id: '01347490',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-08-20T11:38:07.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '234235',
      priority: 'High'
    },
    {
      id: 416631,
      external_id: '01329724',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-08-13T15:09:50.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '567457',
      priority: 'High'
    },
    {
      id: 404607,
      external_id: '01317582',
      trade_name: 'Land',
      service_name: 'Landscape Maintenance',
      call_type: 'Maintenance',
      status: 'completed',
      start_date: '2022-08-06T14:11:33.000Z',
      end_date: '02/22/22 6:00 PM',
      site_name: 'Starbucks 8425',
      city: 'Jacksonville',
      state: 'Florida',
      pon: null,
      address: '9661 San Jose Blvd',
      tracking: '46457',
      priority: 'Low'
    }
  ]
}

function a11yProps (index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

function TabPanel (props) {
  const { children, index, value } = props

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3} style={{ padding: '0px 0px', marginTop: '10px' }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const Locations = () => {
  const { t } = useTranslation()
  const classes = locationsStyles()
  const dispatch = useDispatch()
  const [hideLeftSection, setHideLeftSection] = useState(false)
  const [date, setDate] = useState('today')
  const [dateStart, setDateStart] = useState(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss Z'))
  const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD HH:mm:ss Z'))
  const locationsStore = useSelector((state) => state.locations)
  const userStore = useSelector(state => state.auth.user)
  const [sitesResponse, setSitesResponse] = useState(null)
  const actualWidth = useWindowWidth()
  const [actualWoTab, setActualWoTab] = useState('work_orders')
  const [forceReloadOverlay, setForceReloadOverlay] = useState(null)
  const [tabValue, setTabValue] = useState('/work-orders')
  const [anchorSort, setAnchorSort] = useState(null)
  const isSortMenuOpen = Boolean(anchorSort)
  const [anchorFilters, setAnchorFilters] = useState(null)
  const isFiltersMenuOpen = Boolean(anchorFilters)
  const theme = useTheme()
  const [searchValue, setSearch] = useState('')
  const [invisibleFilterBadge, setFilterInvisible] = useState(true)
  const [invisibleSortBadge, setSortInvisible] = useState(true)
  const [page, setPage] = useState(1)
  const [siteListing, setSiteListing] = useState([])

  useEffect(() => {
    const timer1 = setTimeout(() => handleGetLocations(), 500)
    return () => {
      clearTimeout(timer1)
    }
  }, [page, userStore.clientId, searchValue, locationsStore.locationFilters])

  useEffect(() => {
    setPage(1)
  }, [searchValue, locationsStore.locationFilters])

  useEffect(() => {
    handleGetCatalogs()
  }, [])

  const handleGetLocations = async () => {
    try {
      const filters = locationsStore.locationFilters
      const response = await getLocations(
        /* userStore.clientId, */
        '6387d20204d14b5d5eb80eb9',
        page,
        locationsPerPage,
        null,
        searchValue,
        filters.dateRange,
        filters.dateFrom,
        filters.dateTo,
        filters.status === 'all' ? '' : filters.status,
        filters.state === 'all' ? '' : filters.state,
        filters.city === 'all' ? '' : filters.city)
      setSitesResponse(response)
      if (page === 1) {
        setSiteListing(response.sites)
      } else {
        setSiteListing(prevList => [...prevList, ...response.sites])
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetCatalogs = async () => {
    const statesData = await callLocationApi('POST', '/states', {
      country: 'United States'
    })
    if (!statesData.error) {
      const finalStates = []
      finalStates.push({
        id: 'all',
        name: ''
      })
      statesData.data.states.forEach(state => {
        finalStates.push({
          id: state.state_code,
          name: state.name
        })
      })
      dispatch(locationsActions.setStatesOptions(finalStates))
    }
  }

  const dateOptions = [
    {
      id: 'today',
      name: t('sites.filters.date.today')
    },
    {
      id: 'last_2_days',
      name: t('sites.filters.date.last_2_days')
    },
    {
      id: 'last_3_days',
      name: t('sites.filters.date.last_3_days')
    },
    {
      id: 'last_week',
      name: t('sites.filters.date.last_week')
    },
    {
      id: 'last_2_weeks',
      name: t('sites.filters.date.last_2_weeks')
    },
    {
      id: 'custom',
      name: t('sites.filters.date.custom')
    }
  ]

  const handleClearSearchBox = async (event) => {
    setSearch('')
  }

  const handleFiltersOpen = (event) => {
    setAnchorFilters(event.currentTarget)
  }
  const handleFiltersClose = (event) => {
    setAnchorFilters(null)
  }

  const handleSortOpen = (event) => {
    setAnchorSort(event.currentTarget)
  }
  const handleSortClose = (event) => {
    setAnchorSort(null)
  }

  const tabs = () => (
    <Container
      data-testid={'wo_info_component'}
      role="presentation"
      className={classes.tabContainer}
    >
      <AppBar position="static" elevation={0} classes={{ root: classes.appBar }} >
        <Tabs value={tabValue} onChange={handleChangeTab} aria-label="simple tabs example" variant="fullWidth"
          classes={{ root: classes.tabs }}
          TabIndicatorProps={{
            style: {
              background: theme.colors.iconBlue,
              height: '3px',
              borderRadius: '4px',
              width: 'calc(100% / 3 - 100% / 6)',
              marginLeft: 'calc(100% / 19)'
            }
          }}
          style={{ zIndex: 1000 }} >
          <Tab classes={{ root: classes.tab }} value="/work-orders" label={t('locations.work_orders.work_orders')} {...a11yProps('work-orders')} />
          {/* TODO: uncomment when tabs content is designed
           <Tab classes={{ root: classes.midTab }} value="/proposals" label={t('locations.work_orders.proposals')} {...a11yProps('proposals')} />
          <Tab classes={{ root: classes.tab }} value="/invoices" label={t('locations.work_orders.invoices')} {...a11yProps('invoices')} /> */}
          <IconButton className={classes.iconButton}>
            <Badge color="error" variant="dot" invisible={invisibleSortBadge} classes={{ root: classes.badgeSort }}>
              <SortRounded onClick={handleSortOpen} classes={{ root: isSortMenuOpen ? classes.sortIconSelected : classes.sortIcon }} />
            </Badge>
          </IconButton>
          <SiteSortMenu
            isSortMenuOpen={isSortMenuOpen}
            handleSortClose={handleSortClose}
            anchorSort={anchorSort}
            setInvisible={setSortInvisible}
          />
          <IconButton onClick={handleFiltersOpen} className={classes.iconButton}>
            <Badge color="error" variant="dot" invisible={invisibleFilterBadge} classes={{ root: classes.badge }}>
              <MapFilterIcon color={isFiltersMenuOpen ? '#2F80ED' : '#333333'}/>
            </Badge>
          </IconButton>
          <SiteFiltersMenu
            isFiltersMenuOpen={isFiltersMenuOpen}
            handleFiltersClose={handleFiltersClose}
            anchorFilters={anchorFilters}
            setInvisible={setFilterInvisible}
          />
        </Tabs>
      </AppBar>
      <TabPanel classes={{ root: classes.tabPanel }} index="/work-orders" value={tabValue}>
        <WorkOrdersList workOrders={workOrdersData?.work_orders ?? []} />
      </TabPanel>
      <TabPanel classes={{ root: classes.tabPanel }} index="/proposals" value={tabValue}>
        { }
      </TabPanel>
      <TabPanel classes={{ root: classes.tabPanel }} index="/invoices" value={tabValue}>
        { }
      </TabPanel>
    </Container>
  )

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
  }

  const backSiteView = () => {
    dispatch(locationsActions.showMapSiteView({
      coordinates: {
        lat: 40.175472,
        lng: -101.466083
      },
      zoom: 5,
      hideMarkers: false,
      selectedMarkerIndex: null
    }))
    dispatch(locationsActions.setSelectedSite(null))
    dispatch(locationsActions.setActiveInfoWindow(null))
    dispatch(locationsActions.hideSiteViewPanel())
  }

  const drawerBoxComponent = () => {
    return <Box data-testid={'search_section'} >
      <Box className={classes.leftColumnSites} >
        <Grid container alignItems='center' className={classes.gridFilters}>
          <Grid item xs={11}>
            <Box display="flex" pr={1}>
              {locationsStore.selectedSite && <IconButton className={classes.backButton} onClick={backSiteView}>
                <ArrowBackIos className={classes.backIcon} />
              </IconButton>}
              <TextField
                className={classes.searchBox}
                value={searchValue}
                size='small'
                disabled={false}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='search'
                placeholder={locationsStore.showSiteViewPanel && locationsStore.selectedSite ? t('locations.work_orders.search_placeholder') : t('locations.search_placeholder')}
                autoComplete='off'
                name='search'
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  endAdornment: (searchValue !== '' &&
                    <InputAdornment
                      position='end'
                      onClick={handleClearSearchBox}
                    >
                      <Clear className={classes.clearAdornment} />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.searchBoxInput
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box>
              <IconButton
                onClick={() => {
                  setHideLeftSection(true)
                }}
                className={classes.arrowButton}>
                <Menu className={classes.menuIcon} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box display={locationsStore.showSiteViewPanel && locationsStore.selectedSite !== null ? 'flex' : 'none'} >
          {tabs()}
        </Box>

        {/* RESULTS */}
        <Box display={locationsStore.showSiteViewPanel && locationsStore.selectedSite !== null ? 'none' : 'inline'} container >
          <Grid item >
            <SearchResults sites={siteListing} activeTab={locationsStore.activeTab} setTablePage={setPage} />
          </Grid>
        </Box>
      </Box>

    </Box>
  }

  return (
    <Container className={classes.mainContainer}>
      <Drawer
        id="left-drawer"
        key="left-drawer"
        anchor={'left'}
        open={!hideLeftSection}
        classes={{ paper: classes.drawerPaper }}
        variant="persistent"
      >
        {drawerBoxComponent()}
      </Drawer>
      <Main open={!hideLeftSection} width={actualWidth} data-testid={'sites_page'}>
        <Box data-testid={'google_maps'} bgcolor={'grey'} className={classes.gmapBox}>
          <GMap
            setHideLeftSection={setHideLeftSection}
            hideLeftSection={hideLeftSection}
            searchResults={sitesResponse}
            date={date}
            searchValue={searchValue}
            handleClearSearchBox={handleClearSearchBox}
            actualWoTab={actualWoTab}
            setActualWoTab={setActualWoTab}
            screen="sites"
            dateOptions={dateOptions}
            selectedDate={date}
            setSelectedDate={setDate}
            setDateStart={setDateStart}
            setDateEnd={setDateEnd}
            forceReloadOverlay={forceReloadOverlay}
            setForceReloadOverlay={setForceReloadOverlay}
            siteListing={siteListing}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </Box>
      </Main>
    </Container>
  )
}

export default Locations
