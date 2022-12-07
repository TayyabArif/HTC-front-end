import { makeStyles } from '@mui/styles'

export const locationsStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: 0,
    margin: 0,
    maxWidth: 'unset',
    overflowY: 'hidden'
  },
  filters: {
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'unset !important'
  },
  dateFilter: {
    fontSize: '14px',
    fontWeight: '700',
    color: theme.colors.locations.dateFilter,
    textTransform: 'unset !important'
  },
  searchField: {
    padding: '10px'
  },
  legends: {
    borderRadius: 16,
    backgroundColor: theme.colors.locations.legendsBackground
  },
  grayLbls: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.locations.legendsLabels
  },
  activeWorkCircle: {
    position: 'relative',
    top: 2,
    color: theme.colors.locations.activeWork,
    width: '12px',
    height: '12px'
  },
  leftColumnSites: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    height: 'calc(100vh - 60px)',
    overflowY: 'overlay',
    backgroundColor: theme.colors.locations.filters.leftColumnBackground,
    padding: '0px'
  },
  leftColumnFilters: {
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    height: 'calc(100vh - 60px)',
    overflowY: 'overlay',
    backgroundColor: theme.colors.locations.filters.leftColumnBackground,
    padding: '19px'
  },
  leftColumnSiteView: {
    height: 'calc(100vh - 87px)',
    overflowY: 'hidden',
    backgroundColor: theme.colors.locations.filters.leftColumnBackground
  },
  searchBox: {
    width: '285px',
    marginLeft: '20px',
    '& input::placeholder': {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.textGray
    },
    '& input': {
      fontSize: 16,
      fontWeight: '400'
    }
  },
  searchBoxInput: {
    marginLeft: '-20px',
    width: 'auto'
  },
  clearAdornment: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.clearAdornment,
    cursor: 'pointer'
  },
  font10: {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'unset !important'
  },
  font12: {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'unset !important'
  },
  chipLabel: {
    fontSize: '12px',
    color: theme.colors.locations.filters.selectedChips
  },
  arrowButton: {
    marginTop: '10px',
    padding: 'unset'
  },
  drawerPaper: {
    marginTop: '60px',
    width: '360px',
    border: 'none'
  },
  tabs: {
    height: '46px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  gridFilters: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginTop: '10px',
      padding: '0px 10px'
    }
  },
  swipeable: {
    height: 'calc(50% - 56px)',
    overflow: 'visible'
  },
  mobileSitesIcon: {
    float: 'left',
    marginRight: '5px'
  },
  mobileSitesLabel: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '24px'
  },
  chip: {
    fontSize: '12px',
    height: '22px',
    borderRadius: '100px',
    padding: '4px 0px',
    backgroundColor: theme.colors.workOrders.chipBack,
    marginRight: '10px'
  },
  gmapBox: {
    height: 'calc(100vh - 60px)'
  },
  siteTab: {
    fontSize: '12px',
    fontWeight: '500'
  },
  siteTabs: {
    fontSize: '12px',
    fontWeight: '500'
  },
  menuIcon: {
    width: '27px'
  }
}))

export const mapStyles = makeStyles((theme) => ({
  markers: {
    '& .storemapper-iw-close': {
      display: 'none !important'
    },
    '& .gm-style-iw-c': {
      backgroundColor: '#FBFBFB !important'
    },
    '& .gm-style-iw-c > div': {
      overflow: 'hidden !important'
    },
    '& .gm-style-iw-c > button': {
      display: 'none !important'
    },
    '& .gm-style-iw-t::after': {
      display: 'none !important'
    },
    '& .gm-style-iw > button': {
      display: 'none !important'
    },
    '& .gm-style > img': {
      display: 'none !important'
    },
    '& .infoBox': {
      overflow: 'hidden !important',
      borderRadius: '8px'
    },
    '& .gm-style .gm-style-iw-t::after': {
      display: 'none !important'
    }
  },
  searchBar: {
    '& input::placeholder': {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.textGray
    },
    '& input': {
      fontSize: 14,
      fontWeight: '400',
      marginRight: '10px'
    }
  },
  searchBoxInput: {
    height: '58px !important',
    width: '94% !important',
    backgroundColor: `${theme.palette.primary.contrastText} !important`,
    borderRadius: '4px'
  },
  boxBox: {
    width: '100%'
  },
  toggleButton: {
    fontSize: '12px',
    width: '64px',
    fontWeight: '700',
    height: '58px',
    marginTop: '16px'
  },
  clearAdornment: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.clearAdornment,
    cursor: 'pointer'
  },
  logo: {
    height: '20px',
    margin: '0px auto'
  },
  mobileMapButton: {
    fontSize: '12px !important',
    width: '64px',
    fontWeight: '700',
    height: '58px',
    marginTop: '16px',
    padding: '0px 10px',
    textAlign: 'center',
    display: 'block',
    textTransform: 'none',
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.contrastText
  }
}))

export const infoMarkerStyles = makeStyles((theme) => ({
  font24: {
    [theme.breakpoints.down('md')]: {
      fontSize: 18.75
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24
    },
    fontWeight: '500',
    padding: '0px 0px',
    margin: '0px 0px'
  },
  font10: {
    [theme.breakpoints.down('md')]: {
      fontSize: 7.8
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 10
    },
    fontWeight: '700',
    color: theme.colors.sites.markers.locationAddress
  },
  font12: {
    fontSize: 12,
    fontWeight: '400'
  },
  infoWindowBox: {
    minHeight: 50,
    backgroundColor: theme.colors.infoWindowBackground,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      padding: '0px 10px 0px 0px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px 12px 0px 0px',
      width: '507px',
      minHeight: '236px'
    }
  },
  infoSiteWindow: {
    width: 'auto',
    minHeight: 70,
    cursor: 'pointer',
    padding: '10px 10px'
  },
  workStatus: {
    top: '0px !important',
    width: '17px',
    height: '17px'
  },
  workStatusTiles: {
    height: '40px',
    borderRadius: '8px'
  },
  nameAddress: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px',
      paddingTop: '0px',
      marginBottom: '10px'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '8px',
      paddingTop: '0px',
      marginBottom: '0px'
    }
  },
  counts: {
    paddingTop: '27px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  cardContainer: {
    padding: '0px 0px'
  },
  arrowStyle: {
    width: 22,
    height: 22,
    display: 'flex',
    marginRight: '5px',
    marginLeft: 'auto'
  },
  arrowGrid: {
    [theme.breakpoints.down('md')]: {
      padding: '10px 0px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0px'
    }
  },
  countsGrid: {
    paddingBottom: '20px !important'
  },
  icon: {
    marginRight: '10px',
    height: '28px',
    width: '28px'
  },
  gridIcons: {
    marginLeft: '5px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex'
    }
  },
  dateTypo: {
    fontSize: '12px',
    fontWeight: '400',
    margin: '5px 10px 0px 0px'
  }
}))

export const mapActionButtonsStyles = makeStyles((theme) => ({
  mapButtonsBox: {
    width: '20px',
    position: 'relative',
    top: '15px',
    left: '15px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  dropdowns: {
    marginLeft: 15
  },
  radio: {
    padding: '0px',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  menuItem: {
    fontSize: '12px'
  },
  menuTitle: {
    fontSize: '12px',
    fontWeight: 'bold'
  }
}))

export const mapCountersStyles = makeStyles((theme) => ({
  mapButtonsCounters: {
    position: 'relative',
    top: '15px',
    height: 'fit-content',
    width: '100%',
    marginLeft: '45px'
  },
  font12: {
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  activeWork: {
    position: 'relative',
    top: 4,
    color: theme.palette.primary.light,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  openedWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.open,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  inProgressWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.in_progress,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  returningWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.returning,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  completedWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.completed,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  incompleteWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.incomplete,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  canceledWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.canceled,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  dispatchedWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.dispatched,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  noServiceWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.no_service_required,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  noActivity: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.noActivity,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  noWorkOrder: {
    position: 'relative',
    top: 4,
    width: '17px',
    height: '17px',
    marginLeft: '10px'
  },
  gridItem: {
    marginRight: 5,
    height: 'auto',
    paddingBottom: 10
  },
  containerDiv: {
    display: 'flex',
    width: '100%'
  }
}))
