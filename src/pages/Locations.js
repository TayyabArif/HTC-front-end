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
import { DetailedInfo } from '../components/workorders/DetailedInfo'

/** Services **/
import { getLocations, callLocationApi, getSitesAdvancedFiltersInfo, getLocationCallTypes } from '../services/ApiService'

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
  const [hasMore, setHasMore] = useState(true)

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
      if (!locationsStore.showSiteViewPanel && !locationsStore.selectedSite) {
        const filters = locationsStore.locationFilters
        const response = await getLocations(
          userStore.userInfo.company_id ?? userStore.userInfo.companyId,
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
        setHasMore(response.sites.length === locationsPerPage)
        if (page === 1) {
          setSiteListing(response.sites)
        } else {
          setSiteListing(prevList => [...prevList, ...response.sites])
        }
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
    const filters = await getSitesAdvancedFiltersInfo()
    const callTypesRes = await getLocationCallTypes('all')
    filters.trades.forEach(trade => {
      trade.id = trade.name
    })
    filters.services.forEach(service => {
      service.id = service.name
    })
    const callTypes = []
    callTypesRes.forEach(callType => {
      if (callType && callType !== '') {
        callTypes.push({
          id: callType
        })
      }
    })
    dispatch(locationsActions.setTradesOptions([{ id: 'all' }, ...filters.trades]))
    dispatch(locationsActions.setServicesOptions([{ id: 'all' }, ...filters.services]))
    dispatch(locationsActions.setCallTypeOptions([{ id: 'all' }, ...callTypes]))
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
              <MapFilterIcon color={isFiltersMenuOpen ? '#2F80ED' : '#333333'} />
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
        <WorkOrdersList searchValue={searchValue} />
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

  const handleClosePanel = () => {
    dispatch(locationsActions.setSelectedWorkOrder(null))
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
            <SearchResults sites={siteListing} activeTab={locationsStore.activeTab} setTablePage={setPage} actualPage={page} hasMore={hasMore} />
          </Grid>
        </Box>
      </Box>

    </Box>
  }

  return (
    <Container className={classes.mainContainer}>
      <DetailedInfo workOrder={locationsStore.selectedWorkOrder} handleClosePanel={handleClosePanel} />
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
