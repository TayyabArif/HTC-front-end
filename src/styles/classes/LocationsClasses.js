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
    height: 'calc(100vh - 100px)',
    overflowY: 'overlay',
    backgroundColor: theme.colors.profile.borders,
    padding: '0px'
  },
  searchBox: {
    width: '345px',
    marginLeft: '20px',
    '& input::placeholder': {
      fontSize: 16,
      fontWeight: '400',
      color: theme.colors.textGray,
      borderRadius: '8px'
    },
    '& input': {
      fontSize: 16,
      fontWeight: '400'
    }
  },
  searchBoxInput: {
    marginLeft: '-20px',
    width: 'auto',
    border: `1px solid ${theme.colors.profile.borders}`,
    borderRadius: '8px',
    backgroundColor: 'white'
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
    marginTop: '100px',
    width: '430px',
    border: 'none'
  },
  gridFilters: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
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
    height: 'calc(100vh - 100px)'
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
  },
  midTab: {
    minWidth: '50px',
    padding: 0,
    width: 'auto',
    minHeight: 20,
    maxHeight: '30px',
    height: '30px',
    fontSize: '14px',
    color: theme.colors.gray,
    textTransform: 'none',
    backgroundColor: theme.colors.signInButton.background,
    fontWeight: '400'
  },
  tab: {
    minWidth: '50px',
    padding: 0,
    width: '82px',
    minHeight: 20,
    maxHeight: '30px',
    height: 'auto',
    fontSize: '14px',
    color: theme.colors.gray,
    textTransform: 'none',
    backgroundColor: theme.colors.signInButton.background,
    fontWeight: '400',
    marginRight: '230px' // TODO: remove when the rest of tabs appear
  },
  tabs: {
    backgroundColor: theme.colors.signInButton.background,
    minHeight: 20,
    maxHeight: '34px',
    height: '40px',
    margin: '0px 10px',
    fontSize: '14px',
    color: theme.colors.gray,
    fontWeight: '400',
    '& .Mui-selected': {
      color: theme.palette.primary.light,
      fontWeight: 'bold'
    }
  },
  tabPanel: {
    '& .MuiBox-root': {
      maxWidth: 'unset',
      padding: '0px'
    }
  },
  appBar: {
    backgroundColor: theme.colors.signInButton.background
  },
  iconButton: {
    height: '35px',
    width: '35px'
  },
  filterIcon: {
    color: theme.colors.gray,
    width: '25px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  sortIcon: {
    color: theme.colors.gray,
    width: '25px',
    marginRight: '4px',
    cursor: 'pointer'
  },
  filterIconSelected: {
    color: theme.palette.primary.light,
    width: '25px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  sortIconSelected: {
    color: theme.palette.primary.light,
    width: '25px',
    marginRight: '4px',
    cursor: 'pointer'
  },
  tabContainer: {
    margin: 0,
    padding: 0,
    width: '100%',
    cursor: 'pointer'
  },
  backIcon: {
    width: '20px',
    height: '20px'
  },
  backButton: {
    marginTop: '23px',
    width: '25px',
    height: '25px'
  },
  badge: {
    position: 'fixed',
    '& .MuiBadge-badge': {
      position: 'absolute',
      color: theme.colors.invoiceColors.red_error,
      width: '7px',
      height: '7px',
      right: '-5px',
      top: '3px'
    }
  },
  badgeSort: {
    position: 'fixed',
    '& .MuiBadge-badge': {
      position: 'absolute',
      color: theme.colors.invoiceColors.red_error,
      width: '7px',
      height: '7px',
      right: '3px',
      top: '3px'
    }
  }
}))

export const mapStyles = makeStyles((theme) => ({
  markers: {
    '& .storemapper-iw-close': {
      display: 'none !important'
    },
    '& .gm-style-iw-c': {
      backgroundColor: `${theme.colors.infoWindowBackground} !important`
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
    },
    '& .gm-style .gm-style-iw-tc': {
      transform: 'translateX(-120px)'
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
    color: theme.colors.locations.markers.locationAddress
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
    minWidth: '220px',
    width: 'auto',
    minHeight: 70,
    cursor: 'pointer',
    padding: '10px 0px 22px 10px'
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
    width: 32,
    height: 32,
    display: 'flex',
    color: theme.colors.textButton,
    marginTop: '60%',
    cursor: 'pointer'
  },
  arrowBox: {
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
    top: '73px',
    left: '15px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  mapButtonsBoxSiteLevel: {
    width: '20px',
    position: 'relative',
    top: '5px',
    left: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  hiddenButtonsBox: {
    width: '20px',
    position: 'relative',
    top: '15px',
    left: '15px',
    marginTop: '15px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline'
    }
  },
  hiddenButtonsBoxSiteLevel: {
    width: '20px',
    position: 'relative',
    top: '0px',
    left: '10px',
    marginTop: '5px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex'
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
    fontSize: '12px',
    borderBottom: `1px solid ${theme.colors.profile.borders}`,
    width: '176px',
    height: '40px',
    '&:focus': {
      backgroundColor: 'unset'
    }
  },
  menuTitle: {
    fontSize: '14px',
    fontWeight: '500'
  },
  checkIcon: {
    marginLeft: 'auto',
    color: theme.colors.locations.checkIcon,
    width: '18px',
    height: '18px'
  },
  menuLabel: {
    fontSize: '12px',
    fontWeight: '400'
  },
  badge: {
    '& .MuiBadge-badge': {
      color: theme.colors.invoiceColors.red_error,
      width: '11px',
      height: '11px',
      right: '-6px',
      top: '-2px'
    }
  }
}))

export const mapCountersStyles = makeStyles((theme) => ({
  mapButtonsCounters: {
    position: 'relative',
    top: '15px',
    height: 'fit-content',
    width: '100%'
  },
  font12: {
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  font14: {
    fontSize: 14,
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
    color: theme.colors.locations.inProgressWork,
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
    color: theme.colors.workOrderColors.completed,
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
  },
  hiddenContainerDiv: {
    marginLeft: '60px',
    display: 'flex',
    width: '100%'
  },
  gridCounter: {
    width: 'min-content'
  },
  rangeLabel: {
    marginTop: '3px',
    fontSize: '9px',
    fontStyle: 'italic',
    fontWeight: '400',
    color: theme.colors.gray
  }
}))

export const searchResultsStyles = makeStyles((theme) => ({
  font12: {
    fontSize: 12,
    fontWeight: '500'
  },
  noMasquerade: {
    display: 'flex'
  },
  mobileList: {
    overflowY: 'auto',
    minHeight: '140px',
    margin: '10px',
    height: 'calc(100vh - 250px)',
    [theme.breakpoints.up('md')]: {
      padding: '0px 12px',
      margin: 0
    },
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
}))

export const locationCardStyles = makeStyles((theme) => ({
  font16: {
    fontSize: 16,
    fontWeight: '500'
  },
  font12: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.locations.locationAddress
  },
  activeWorkCircle: (props) => ({
    position: 'relative',
    top: 4,
    color: props.activeWorkCircleColor,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  }),
  completedWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.workOrderColors.completed,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  },
  noActivityWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.workOrderColors.declined,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  },
  openWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.workOrderColors.open,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  },
  inProgressWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.completed,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  },
  locationTile: {
    cursor: 'pointer',
    height: '100%',
    margin: '3px 11px'
  }
}))

export const mapFiltersStyles = makeStyles((theme) => ({
  mainDropdown: {
    marginLeft: 15,
    padding: '15px',
    borderRadius: '8px',
    minWidth: '280px'
  },
  radio: {
    padding: '0px',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  filterLabel: {
    fontSize: '12px',
    '&:focus': {
      backgroundColor: 'unset'
    },
    padding: '8px 8px 4px 8px'
  },
  filterDrop: {
    fontSize: '12px',
    '&:focus': {
      backgroundColor: 'unset'
    },
    padding: '0px 8px 8px 8px'
  },
  menuItem: {
    fontSize: '12px',
    borderBottom: `1px solid ${theme.colors.profile.borders}`,
    width: '176px',
    height: '40px',
    '&:focus': {
      backgroundColor: 'unset'
    }
  },
  menuTitle: {
    fontSize: '14px',
    fontWeight: '500',
    '&:focus': {
      backgroundColor: 'unset'
    }
  },
  menuLabel: {
    fontSize: '12px',
    fontWeight: '400'
  },
  dateLabel: {
    color: theme.colors.gray,
    fontSize: 12,
    fontWeight: '400'
  },
  arrowIcon: {
    marginLeft: 'auto'
  },
  dropdowns: {
    marginLeft: 15
  },
  muiPaper: {
    borderRadius: '12px',
    marginLeft: '15px',
    maxHeight: '400px'
  },
  checkIcon: {
    marginLeft: 'auto',
    color: theme.colors.locations.checkIcon,
    width: '18px',
    height: '18px'
  }
}))

export const weatherLegendsStyles = makeStyles((theme) => ({
  mapButtonsCounters: {
    position: 'relative',
    top: '15px',
    left: '70px',
    height: 'fit-content'
  },
  font12: {
    fontSize: 12,
    fontWeight: 500
  },
  font8: {
    fontSize: 8,
    fontWeight: 500
  },
  legendsContainer: {
    width: '440px',
    position: 'absolute',
    bottom: '24px',
    left: '15px',
    overflow: 'hidden',
    transformOrigin: 'left bottom 0px'
  },
  legendsContainerMinimized: {
    position: 'absolute',
    bottom: '24px',
    left: '15px',
    overflow: 'hidden'
  },
  mapWeatherLegendsBoxMinimized: {
    width: '135px',
    position: 'absolute',
    bottom: '0px',
    left: '0px'
  },
  legendHide: {
    color: theme.colors.text,
    fontSize: 22
  },
  legendHideContainer: {
    padding: '0px'
  },
  legendIndividualColorBox: {
    width: '100%',
    height: 7
  },
  legendIndividualLabelBox: {
    width: '100%',
    fontSize: 8,
    color: theme.colors.map.legendsLabels,
    textAlign: 'center'
  },
  gridContainer: {
    width: '100%'
  }
}))

export const weatherPlayerStyles = makeStyles((theme) => ({
  font12: {
    fontSize: 12,
    fontWeight: 500
  },
  playerContainer: {
    height: '142px',
    width: '350px',
    position: 'absolute',
    bottom: '20px',
    right: '15px',
    overflow: 'hidden'
  },
  playerContainerMinimized: {
    height: 'auto',
    width: '350px',
    position: 'absolute',
    bottom: '20px',
    right: '15px',
    overflow: 'hidden'
  },
  mapWeatherPlayerBoxMinimized: {
    width: '350px',
    position: 'absolute',
    bottom: '0px',
    right: '0px'
  },
  playerButtonsContainer: {
    padding: '0px',
    paddingTop: 5
  },
  playerButtons: {
    fontSize: 17
  },
  playerSliderRoot: {
    color: theme.colors.map.playerSliderThumb
  },
  playerSliderRail: {
    color: theme.colors.map.playerSliderRail,
    opacity: 1,
    height: 7,
    marginLeft: -5,
    width: '103%',
    borderRadius: 7
  },
  playerSliderTrack: {
    backgroundColor: theme.colors.map.playerSliderRail
  },
  playerSliderMark: {
    backgroundColor: theme.colors.map.playerSliderMark,
    height: 8,
    width: 1,
    marginTop: 10
  },
  playerSliderThumb: {
    color: theme.colors.map.playerSliderThumb,
    marginTop: -3
  },
  playerSliderLabels: {
    marginTop: 10,
    fontSize: 10
  },
  playerHide: {
    color: theme.colors.text,
    fontSize: 22
  },
  playerHideContainer: {
    padding: '0px'
  }
}))

export const woCardStyles = makeStyles((theme) => ({
  serviceNameDiv: {
    backgroundColor: theme.colors.divBack,
    width: '24px',
    marginRight: '4px',
    borderBottomLeftRadius: '5px'
  },
  serviceName: {
    transform: 'rotate(90deg)',
    fontSize: '10px',
    fontWeight: '700',
    color: 'white',
    marginTop: '8px',
    width: '120px',
    position: 'absolute',
    top: '55px',
    left: '-40px'
  },
  woNumber: {
    fontSize: 16,
    fontWeight: '500'
  },
  clientTracking: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.gray
  },
  activeWorkCircle: (props) => ({
    position: 'relative',
    top: 4,
    color: props.activeWorkCircleColor,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  }),
  completedWork: {
    position: 'relative',
    top: 4,
    color: theme.colors.locations.workOrderColors.completed,
    width: '17px',
    height: '17px',
    marginRight: '10px',
    border: `2px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'
  },
  locationTile: {
    cursor: 'pointer',
    height: '100%',
    margin: '3px 8px',
    display: 'flex',
    borderRadius: '0px 5px 0px 5px'
  },
  woType: {
    fontSize: '11px',
    fontWeight: '400',
    color: theme.colors.text
  },
  endLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: theme.colors.text,
    textAlign: 'end'
  },
  startLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: theme.colors.text
  },
  woStatus: {
    fontSize: '13px',
    fontWeight: '600',
    color: theme.colors.statusLabel,
    margin: '8px 0px 21px 0px',
    textAlign: 'end'
  },
  priority: {
    fontSize: '11px',
    fontWeight: '600',
    color: theme.colors.gray,
    textAlign: 'end'
  }
}))

export const locationInfoCardStyles = makeStyles((theme) => ({
  nameLabel: {
    fontSize: '22px',
    fontWeight: '500'
  },
  mainCard: {
    width: '560px',
    padding: '16px'
  },
  ratingLabel: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.colors.locations.locationAddress,
    marginTop: '2px'
  },
  rating: {
    margin: '0px 6px'
  },
  locationDescription: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.colors.locations.locationAddress
  },
  arrowDown: {
    width: '60px',
    height: 'auto',
    color: theme.colors.textButton,
    position: 'absolute',
    right: '5px',
    top: '2px',
    cursor: 'pointer'
  },
  fieldLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: theme.colors.gray,
    letterSpacing: '0.4px'
  },
  fieldContent: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.colors.gray,
    letterSpacing: '0.4px'
  },
  cardContent: {
    marginTop: '10px',
    padding: '0 !important'
  },
  cardNoContent: {
    marginTop: '30px',
    padding: '0 !important',
    textAlign: 'center'
  },
  moreHours: {
    fontSize: '14px',
    fontWeight: '600',
    color: theme.colors.iconBlue,
    cursor: 'pointer'
  },
  moreLabel: {
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    fontSize: '14px',
    color: theme.colors.text,
    fontWeight: '500',
    backgroundColor: '#fdfdfd99',
    borderRadius: '12px 0px 12px 0px',
    padding: '2px 5px'
  },
  urlDiv: {
    display: 'inline'
  },
  rangesDiv: {
    margin: '0px 5px'
  }
}))