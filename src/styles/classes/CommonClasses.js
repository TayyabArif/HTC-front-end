
import { makeStyles } from '@mui/styles'
import { navBarHeaderHeight } from '../../lib/Constants'

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
    overflowY: 'auto'
  },
  container: {
    height: '100vh',
    backgroundColor: theme.colors.mainContainerBackground,
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0px',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px'
    },
    [theme.breakpoints.down('md')]: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      touchAction: 'pan-y'
    },
    [theme.breakpoints.up('md')]: {
      overflowY: 'auto'
    }
  },
  backdrop: {
    zIndex: 5000,
    color: theme.colors.backdropColor
  },
  navBarOffset: {
    height: navBarHeaderHeight
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
    height: navBarHeaderHeight,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    alignSelf: 'center'
  },
  menuItem: {
    fontSize: '12px'
  },
  menuIcon: {
    height: '23px',
    color: theme.colors.text
  },
  navBar: {
    backgroundColor: theme.colors.navBarColor,
    height: navBarHeaderHeight,
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
    height: navBarHeaderHeight,
    padding: '12px 0',
    objectFit: 'contain'
  },
  finalGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    height: navBarHeaderHeight,
    display: 'flex',
    flexDirection: 'row'
  },
  boxLogo: {
    display: 'flex'
  },
  logoLink: {
    margin: 'auto 0px'
  },
  logo: {
    width: '170px'
  },
  companyName: {
    fontSize: '24px',
    fontWeight: '600',
    color: theme.colors.text,
    margin: 'auto 15px auto 0px'
  },
  tabs: {
    marginTop: '27px'
  }
}))
