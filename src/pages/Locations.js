import { useTranslation } from 'react-i18next'
import React, { useRef, useState, useEffect } from 'react'
import moment from 'moment'

/** Material UI **/
import { Box, Button, Drawer, Grid, IconButton, InputAdornment, TextField, Container } from '@mui/material'
import { Menu, Clear } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../store/locations'

/** Components **/
import { GMap } from '../components/locations/map/GMap'
// TODO: SiteView component
// import { SiteView } from '../components/locations/siteView/SiteView'
import { StyledSiteViewTab, StyledSiteViewTabs } from '../styles/mui_custom_components'

/** Services **/
import { userHasAuthorization } from '../services/AuthService'
import ReactGA from 'react-ga4'

// Constants
import { useWindowWidth } from '@react-hook/window-size'

// Styles
import { locationsStyles } from '../styles/classes/LocationsClasses'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, width }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 360,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const Locations = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = locationsStyles()
  const [hideLeftSection, setHideLeftSection] = useState(false)
  const [date, setDate] = useState('today')
  const [dateStart, setDateStart] = useState(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss Z'))
  const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD HH:mm:ss Z'))
  const searchField = useRef('')
  const locationsStore = useSelector((state) => state.locations)
  const clientStore = useSelector(state => state.auth.client)
  const [sitesResponse, setSitesResponse] = useState(null)
  const actualWidth = useWindowWidth()
  const [actualWoTab, setActualWoTab] = useState('work_orders')
  const [forceReloadOverlay, setForceReloadOverlay] = useState(null)

  useEffect(() => {
    setSitesResponse({ meta: { current_page: 1, next_page: null, prev_page: null, total_pages: 1, total_count: 1, total_result: 1, active_work_orders: 0, completed_work_orders: 0, open_work_orders: 0, total_proposals: 0, returning_work_orders: 0, canceled_work_orders: 0, incomplete_work_orders: 1, dispatched_work_orders: 0, no_service_work_orders: 0, no_activity_work_orders: 0, active_sites: 0, no_activity_sites: 1 }, sites: [{ id: 15599, client_id: 111, name: 'Home Depot 2221', address: '1310 E 41ST STREET', state: 'Kansas', city: 'HAYS', zipcode: '67601', trades: 'Snow', work_orders_summary: { active: 0, in_progress: 0, completed: 0, open: 0, returning: 0, canceled: 0, incomplete: 1, no_activity: 0, dispatched: 0, no_service: 0 }, proposals: 0, coordinates: { lat: 38.89917, lng: -99.31294 } }] })
  }, [])

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
    searchField.current.value = ''
  }

  const handleShowFilterClick = () => {
    dispatch(locationsActions.showAdvancedFilters())

    ReactGA.event({
      category: 'show',
      action: 'show_site_reporting_filters'
    })
  }

  const handleClearFilters = async () => {
    searchField.current.value = ''
    dispatch(locationsActions.setAdvancedFiltersSelected(null))
    dispatch(locationsActions.setAdvancedFiltersParams(null))
    dispatch(locationsActions.reloadResponse())
  }

  const changeSitesTab = (event, newValue) => {
    dispatch(locationsActions.setActiveTab(newValue))
    dispatch(locationsActions.reloadResponse())
    dispatch(locationsActions.setActiveInfoWindow(null))
  }

  const drawerBoxComponent = () => {
    return <Box data-testid={'search_section'} >
      <Box className={classes.leftColumnSites} hidden={!locationsStore.showSearch} >
        <Grid container alignItems='center' className={classes.gridFilters}>
          <Grid item xs={11}>
            <Box pr={1}>
              <TextField
                className={classes.searchBox}
                inputRef={searchField}
                size='small'
                disabled={userHasAuthorization('masquerade:write') && !clientStore}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='search'
                placeholder={t('sites.search_placeholder')}
                autoComplete='off'
                name='search'
                onChange={(e) => console.log(e.target.value)}
                InputProps={{
                  endAdornment: (
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
                <Menu className={classes.menuIcon}/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Grid container className={classes.tabs} >
          <StyledSiteViewTabs classes={{ root: classes.siteTabs }} variant={'fullWidth'}
            value={locationsStore.activeTab}
            onChange={changeSitesTab}>
            <StyledSiteViewTab classes={{ root: classes.siteTab }} value={'active_work_orders'} label={t('sites.active_work_orders')} />
            <StyledSiteViewTab classes={{ root: classes.siteTab }} value={'all_sites'} label={t('sites.all_sites')} />
          </StyledSiteViewTabs>
        </Grid>
        {/* CLEAR ADVANCED FILTER BUTTONS */}
        <Box hidden={!locationsStore.advancedFiltersSelected}>
          <Box ml={2} mr={2}>
            <Grid container justifyContent='flex-end'>
              <Grid item align='left' xs={6}>
                <Button onClick={handleClearFilters} className={classes.font12} size='small' color='primary'>
                  {t('sites.filters.clear_filters')}
                </Button>
              </Grid>
              <Grid item align='right' xs={6}>
                <Button onClick={handleShowFilterClick} className={classes.font12} size='small' color='primary'>
                    {t('sites.filters.return_advanced_filters')}
                </Button>
              </Grid>
            </Grid>
          </Box>
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
            searchValue={searchField}
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
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </Box>
      </Main>
    </Container>
  )
}

export default Locations
