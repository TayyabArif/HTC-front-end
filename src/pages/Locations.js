import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'
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
import { SearchResults } from '../components/locations/SearchResults'
// TODO: SiteView component
// import { SiteView } from '../components/locations/siteView/SiteView'

/** Services **/
import { userHasAuthorization } from '../services/AuthService'

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
const locationsData = {
  meta: {
    current_page: 1,
    next_page: null,
    prev_page: null,
    total_pages: 1,
    total_count: 673,
    total_result: 673,
    active_work_orders: 839,
    completed_work_orders: 3499,
    open_work_orders: 515,
    total_proposals: 0,
    returning_work_orders: 4,
    canceled_work_orders: 231,
    incomplete_work_orders: 546,
    dispatched_work_orders: 315,
    no_service_work_orders: 99,
    no_activity_work_orders: 0,
    active_sites: 522,
    no_activity_sites: 151
  },
  sites: [
    {
      id: 820,
      client_id: 23,
      name: 'Starbucks 9859',
      address: '4170 N Oakland',
      state: 'Wisconsin',
      city: 'Shorewood',
      zipcode: '53211',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 1,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 3,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 43.09338,
        lng: -87.88721
      }
    },
    {
      id: 1538,
      client_id: 23,
      name: 'Starbucks 2323',
      address: '28832 Waukegan Road',
      state: 'Illinois',
      city: 'Lake Bluff',
      zipcode: '60044',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 3,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 2,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 42.28094,
        lng: -87.87987
      }
    },
    {
      id: 2433,
      client_id: 23,
      name: 'Starbucks 18014',
      address: '1200 S Naper Blvd',
      state: 'Illinois',
      city: 'Naperville',
      zipcode: '60540',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 6,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 41.7516,
        lng: -88.11479
      }
    },
    {
      id: 2435,
      client_id: 23,
      name: 'Starbucks 2567',
      address: '18051 Harwood Ave',
      state: 'Illinois',
      city: 'Homewood',
      zipcode: '60430',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 6,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 41.56133,
        lng: -87.66765
      }
    },
    {
      id: 2758,
      client_id: 23,
      name: 'Starbucks 10502',
      address: '780 Nautica Drive',
      state: 'Florida',
      city: 'Jacksonville',
      zipcode: '32218',
      trades: 'Land',
      work_orders_summary: {
        active: 3,
        in_progress: 1,
        completed: 4,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 30.479979,
        lng: -81.638163
      }
    },
    {
      id: 2760,
      client_id: 23,
      name: 'Starbucks 302',
      address: '4634 26th Avenue NE',
      state: 'Washington',
      city: 'Seattle',
      zipcode: '98105',
      trades: 'Land',
      work_orders_summary: {
        active: 1,
        in_progress: 0,
        completed: 7,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.66263,
        lng: -122.29968
      }
    },
    {
      id: 2767,
      client_id: 23,
      name: 'Starbucks 11115',
      address: '16330 St. Rd. 54',
      state: 'Florida',
      city: 'Odessa',
      zipcode: '33556',
      trades: 'Land',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 1,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 28.188048,
        lng: -82.545732
      }
    },
    {
      id: 2769,
      client_id: 23,
      name: 'Starbucks 15732',
      address: '10002 N. Dale Mabry Hwy',
      state: 'Florida',
      city: 'Tampa',
      zipcode: '33618',
      trades: 'Land',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 1,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 28.040503,
        lng: -82.50535
      }
    },
    {
      id: 2883,
      client_id: 23,
      name: 'Starbucks 15748',
      address: '22850 Allen Rd',
      state: 'Michigan',
      city: 'Woodhaven',
      zipcode: '48183',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 7,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 42.14108,
        lng: -83.22658
      }
    },
    {
      id: 2885,
      client_id: 23,
      name: 'Starbucks 8586',
      address: '2519 Aloma Ave',
      state: 'Florida',
      city: 'Winter Park',
      zipcode: '32792',
      trades: 'Land',
      work_orders_summary: {
        active: 1,
        in_progress: 0,
        completed: 5,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 28.60196,
        lng: -81.31946
      }
    },
    {
      id: 3142,
      client_id: 23,
      name: 'Starbucks 389',
      address: '7100 E Greenlake Drive N',
      state: 'Washington',
      city: 'Seattle',
      zipcode: '98115',
      trades: 'Land',
      work_orders_summary: {
        active: 1,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 1,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.67999,
        lng: -122.32539
      }
    },
    {
      id: 3144,
      client_id: 23,
      name: 'Starbucks 417',
      address: '7737 SW Capitol Highway',
      state: 'Oregon',
      city: 'Portland',
      zipcode: '97219',
      trades: 'Land',
      work_orders_summary: {
        active: 1,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 45.46864,
        lng: -122.71144
      }
    },
    {
      id: 3146,
      client_id: 23,
      name: 'Starbucks 441',
      address: '61535 South Highway 97',
      state: 'Oregon',
      city: 'Bend',
      zipcode: '97702',
      trades: 'Snow|Land',
      work_orders_summary: {
        active: 0,
        in_progress: 0,
        completed: 6,
        open: 0,
        returning: 0,
        canceled: 0,
        incomplete: 4,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 44.011,
        lng: -121.32183
      }
    },
    {
      id: 3151,
      client_id: 23,
      name: 'Starbucks 3202',
      address: '6501 California Ave',
      state: 'Washington',
      city: 'Seattle',
      zipcode: '98136',
      trades: 'Land',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.54469,
        lng: -122.38744
      }
    },
    {
      id: 3153,
      client_id: 23,
      name: 'Starbucks 3278',
      address: '42 Bellevue Way NE',
      state: 'Washington',
      city: 'Bellevue',
      zipcode: '98004',
      trades: 'Land',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.61062,
        lng: -122.20067
      }
    },
    {
      id: 3160,
      client_id: 23,
      name: 'Starbucks 3702',
      address: '4000 East Madison St',
      state: 'Washington',
      city: 'Seattle',
      zipcode: '98112',
      trades: 'Land',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 0,
        incomplete: 0,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.63413,
        lng: -122.2808
      }
    },
    {
      id: 3162,
      client_id: 23,
      name: 'Starbucks 11156',
      address: '8223 Steilacoom Blvd, Lakewood',
      state: 'Washington',
      city: 'Lakewood',
      zipcode: '98498',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 2,
        in_progress: 0,
        completed: 6,
        open: 1,
        returning: 0,
        canceled: 1,
        incomplete: 2,
        no_activity: 0,
        dispatched: 1,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 47.18006,
        lng: -122.54735
      }
    },
    {
      id: 3169,
      client_id: 23,
      name: 'Starbucks 14041',
      address: '3623 SE Powell',
      state: 'Oregon',
      city: 'Portland',
      zipcode: '97202',
      trades: 'Land|Snow',
      work_orders_summary: {
        active: 1,
        in_progress: 0,
        completed: 8,
        open: 1,
        returning: 0,
        canceled: 1,
        incomplete: 0,
        no_activity: 0,
        dispatched: 0,
        no_service: 0
      },
      proposals: 0,
      coordinates: {
        lat: 45.49736,
        lng: -122.62571
      }
    }
  ]
}

const Locations = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = locationsStyles()
  const [hideLeftSection, setHideLeftSection] = useState(false)
  const [date, setDate] = useState('today')
  const [dateStart, setDateStart] = useState(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss Z'))
  const [dateEnd, setDateEnd] = useState(moment().format('YYYY-MM-DD HH:mm:ss Z'))
  const locationsStore = useSelector((state) => state.locations)
  const clientStore = useSelector(state => state.auth.client)
  const [sitesResponse, setSitesResponse] = useState(null)
  const actualWidth = useWindowWidth()
  const [actualWoTab, setActualWoTab] = useState('work_orders')
  const [forceReloadOverlay, setForceReloadOverlay] = useState(null)
  const [searchValue, setSearch] = useState('')

  useEffect(() => {
    setSitesResponse(locationsData)
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
    setSearch('')
  }

  const handleShowFilterClick = () => {
    dispatch(locationsActions.showAdvancedFilters())
  }

  const handleClearFilters = async () => {
    setSearch('')
    dispatch(locationsActions.setAdvancedFiltersSelected(null))
    dispatch(locationsActions.setAdvancedFiltersParams(null))
    dispatch(locationsActions.reloadResponse())
  }

  const drawerBoxComponent = () => {
    return <Box data-testid={'search_section'} >
      <Box className={classes.leftColumnSites} hidden={!locationsStore.showSearch} >
        <Grid container alignItems='center' className={classes.gridFilters}>
          <Grid item xs={11}>
            <Box pr={1}>
              <TextField
                className={classes.searchBox}
                value={searchValue}
                size='small'
                disabled={userHasAuthorization('masquerade:write') && !clientStore}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='search'
                placeholder={t('locations.search_placeholder')}
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
                <Menu className={classes.menuIcon}/>
              </IconButton>
            </Box>
          </Grid>
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

        {/* RESULTS */}
        <Grid container >
          <Grid item xs={12}>
            <SearchResults sites={sitesResponse?.sites ?? []} activeTab={locationsStore.activeTab}/>
          </Grid>
        </Grid>
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
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </Box>
      </Main>
    </Container>
  )
}

export default Locations
