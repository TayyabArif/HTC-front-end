import { useTranslation } from 'react-i18next'
import React, { useRef, useState, useEffect } from 'react'
import moment from 'moment'

/** Material UI **/
import { Box, Drawer, Grid, IconButton, InputAdornment, TextField, Container, Tabs, Tab, AppBar } from '@mui/material'
import { Menu, Clear, SortRounded, FilterAltOutlined } from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'

/** Redux **/
import { useSelector } from 'react-redux'

/** Components **/
import { GMap } from '../components/locations/map/GMap'
import { SearchResults } from '../components/locations/SearchResults'
import { WorkOrdersList } from '../components/locations/WorkOrdersList'
import { SiteSortMenu } from '../components/locations/SiteSortMenu'
import { SiteFiltersMenu } from '../components/locations/SiteFiltersMenu'

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
  const [tabValue, setTabValue] = useState('/work-orders')
  const [anchorSort, setAnchorSort] = useState(null)
  const isSortMenuOpen = Boolean(anchorSort)
  const [anchorFilters, setAnchorFilters] = useState(null)
  const isFiltersMenuOpen = Boolean(anchorFilters)
  const [sort, setSort] = useState({})
  const [filters, setFilters] = useState({})
  const theme = useTheme()

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
    searchField.current.value = ''
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
          <Tab classes={{ root: classes.midTab }} value="/proposals" label={t('locations.work_orders.proposals')} {...a11yProps('proposals')} />
          <Tab classes={{ root: classes.tab }} value="/invoices" label={t('locations.work_orders.invoices')} {...a11yProps('invoices')} />
          <IconButton className={classes.iconButton}>
            <SortRounded onClick={handleSortOpen} classes={{ root: isSortMenuOpen ? classes.sortIconSelected : classes.sortIcon }} />
          </IconButton>
          <SiteSortMenu
            isSortMenuOpen={isSortMenuOpen}
            handleSortClose={handleSortClose}
            anchorSort={anchorSort}
            sort={sort}
            setSort={setSort}
          />
          <IconButton className={classes.iconButton}>
            <FilterAltOutlined onClick={handleFiltersOpen} classes={{ root: isFiltersMenuOpen ? classes.filterIconSelected : classes.filterIcon }} />
          </IconButton>
          <SiteFiltersMenu
            isFiltersMenuOpen={isFiltersMenuOpen}
            handleFiltersClose={handleFiltersClose}
            anchorFilters={anchorFilters}
            filters={filters}
            setFilters={setFilters}
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

  const drawerBoxComponent = () => {
    return <Box data-testid={'search_section'} >
      <Box className={classes.leftColumnSites} >
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
                placeholder={locationsStore.showSiteViewPanel ? t('locations.work_orders.search_placeholder') : t('locations.search_placeholder')}
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
                <Menu className={classes.menuIcon} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" hidden={!locationsStore.showSiteViewPanel} >
          {tabs()}
        </Box>

        {/* RESULTS */}
        <Box hidden={locationsStore.showSiteViewPanel} container >
          <Grid item >
            <SearchResults sites={sitesResponse?.sites ?? []} activeTab={locationsStore.activeTab} />
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
