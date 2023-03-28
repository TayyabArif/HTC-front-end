
import { makeStyles } from '@mui/styles'
import { navBarHeaderHeight, navBarHeaderHeightMobile } from '../../lib/Constants'

export const addButtonStyles = makeStyles(theme => ({
  icon: {
    color: theme.colors.iconBlue,
    marginRight: '5px'
  },
  button: {
    textTransform: 'none',
    '& .MuiFormLabel-root': {
      color: theme.colors.iconBlue,
      fontSize: '14px'
    },
    paddingLeft: '0px'
  }
}))

export const mainContainerStyles = makeStyles(theme => ({
  scrollContainer: {
    margin: '0px !important',
    padding: '0px !important',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'fixed'
  },
  container: {
    height: '100vh',
    backgroundColor: theme.colors.mainContainerBackground,
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0px',
    maxWidth: '100%',
    overflow: 'auto'
  },
  containerScrollHidden: {
    height: '100vh',
    [theme.breakpoints.up('md')]: {
      overflowY: 'hidden'
    },
    [theme.breakpoints.down('md')]: {
      overflowY: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      touchAction: 'pan-y'
    }
  },
  backdrop: {
    zIndex: 5000,
    color: theme.colors.backdropColor
  },
  navBarOffset: {
    [theme.breakpoints.up('md')]: {
      height: navBarHeaderHeight
    },
    [theme.breakpoints.down('md')]: {
      height: navBarHeaderHeightMobile
    }
  },
  navBarOffsetSmall: {
    [theme.breakpoints.down('md')]: {
      height: '50px'
    }
  },
  contentBox: {
    height: 'fit-content',
    overflowY: 'scroll',
    touchAction: 'pan-y'
  }
}))

export const navBarStyles = makeStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: 'transparent !important'
    }
  },
  disabled: {
    backgroundColor: 'transparent'
  },
  menu: {
    borderRadius: '0px',
    [theme.breakpoints.up('md')]: {
      height: navBarHeaderHeight
    },
    [theme.breakpoints.down('md')]: {
      height: navBarHeaderHeightMobile
    },
    '&:hover': {
      backgroundColor: 'transparent'
    },
    margin: 'auto 0px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    alignSelf: 'center'
  },
  menuItem: {
    fontSize: '12px'
  },
  selectedItem: {
    fontSize: '12px',
    color: theme.palette.primary.light
  },
  menuItemMobile: {
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  selectedMobile: {
    fontSize: '12px',
    color: theme.palette.primary.light,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  menuIcon: {
    height: '23px',
    color: theme.colors.text
  },
  navBar: {
    backgroundColor: theme.colors.navBarColor,
    [theme.breakpoints.up('md')]: {
      height: navBarHeaderHeight
    },
    [theme.breakpoints.down('md')]: {
      height: navBarHeaderHeightMobile
    },
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    zIndex: 1000
  },
  icon: {
    color: theme.colors.settings.fieldInfo,
    textAlign: 'center',
    width: '50px',
    height: '22px',
    marginLeft: '8px'
  },
  yesClient: {
    color: theme.palette.primary.light,
    fontWeight: '500',
    fontSize: '20px'
  },
  noClient: {
    color: theme.colors.settings.fieldInfo,
    fontWeight: '500',
    fontSize: '20px'
  },
  bvLabel: {
    color: theme.colors.basicDisabledButtonColor,
    fontWeight: '500',
    fontSize: '14px'
  },
  flexDiv: {
    display: 'flex'
  },
  alertIcon: {
    width: '20px'
  },
  alert: {
    width: '100%'
  },
  alertTypo: {
    fontSize: '16px',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    width: '100%',
    display: 'flex'
  },
  snackbar: {
    width: '100%',
    padding: '0px 50px'
  },
  logoImage: {
    width: '170px',
    [theme.breakpoints.up('md')]: {
      height: navBarHeaderHeight
    },
    [theme.breakpoints.down('md')]: {
      height: navBarHeaderHeightMobile
    },
    padding: '12px 0',
    objectFit: 'contain'
  },
  finalGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    [theme.breakpoints.up('md')]: {
      height: navBarHeaderHeight
    },
    [theme.breakpoints.down('md')]: {
      height: navBarHeaderHeightMobile
    },
    display: 'flex',
    flexDirection: 'row'
  },
  boxLogo: {
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  logoLink: {
    [theme.breakpoints.up('xs')]: {
      margin: '15px auto 0px auto'
    },
    [theme.breakpoints.up('md')]: {
      margin: '27px auto'
    }
  },
  logo: {
    width: '170px',
    maxHeight: '42px'
  },
  logoLinkMobile: {
    margin: 'auto auto auto 0px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  logoMobile: {
    maxWidth: '80px',
    maxHeight: '30px'
  },
  companyName: {
    [theme.breakpoints.up('md')]: {
      fontSize: '24px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '20px'
    },
    fontWeight: '600',
    color: theme.colors.text,
    margin: 'auto 15px auto 0px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  tabs: {
    marginTop: '32px'
  },
  mobileGrid: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    }
  },
  gridBrowser: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginTop: '0px'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
      marginTop: '32px'
    }
  }
}))
