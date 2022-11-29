import { makeStyles } from '@mui/styles'

export const updateAccountInfoStyles = makeStyles(theme => ({
  presentation: {
    padding: '0px 5px',
    paddingBottom: '40px',
    marginTop: '19px',
    overflowY: 'auto'
  },
  title: {
    color: 'black',
    fontSize: '20px',
    fontWeight: '700',
    font: 'Rubik',
    margin: '32px 0px'
  },
  save: {
    textTransform: 'none',
    fontSize: '18px',
    font: 'Rubik',
    fontWeight: '700',
    color: theme.colors.backgroundColor,
    borderRadius: '100px',
    borderColor: theme.colors.textGray,
    width: '161px',
    height: '49px',
    backgroundColor: theme.colors.textGray,
    float: 'right',
    marginRight: 36
  },
  errorMessage: {
    color: theme.colors.errorText,
    fontWeight: '400',
    fontSize: '12px'
  },
  avatar: {
    width: '140px',
    height: '140px'
  },
  photoPicker: {
    display: 'none'
  },
  photoPickerButton: {
    borderColor: 'transparent',
    color: theme.colors.basicDisabledButtonColor,
    fontSize: '10px',
    marginTop: '6px'
  },
  imageGroup: {
    alignItems: 'center',
    width: '313px'
  },
  drawerPaper: {
    maxHeight: 'calc(100% - 62px)',
    marginTop: '60px',
    width: '360px',
    borderRadius: '8px',
    overflow: 'auto',
    overflowX: 'hidden',
    zIndex: 1500,
    boxSizing: 'content-box',
    marginRight: '19px',
    marginBottom: '0px',
    display: 'flex'
  },
  element: {
    marginTop: '20px'
  },
  footer: {
    marginRight: 20,
    marginBottom: 20,
    height: '49px',
    width: '341px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawerContainer: { height: '100%', position: 'relative' },
  drawerTitle: { alignItems: 'center', paddingLeft: '20px' },
  drawerContent: {
    marginLeft: '20px'
  }
}))

export const textInputStyles = makeStyles(theme => ({
  root: {
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      width: '303px',
      borderRadius: '6px'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px'
    },
    '& .MuiIconButton-sizeSmall': {
      marginLeft: '20px'
    },
    '& .MuiIconButton-sizeSmall:hover': {
      backgroundColor: theme.colors.signInButton.background
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiFormLabel-root': {
      top: '4px'
    },
    '& .Mui-focused': {
      color: theme.colors.workOrders.tab.duedate
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    },
    marginTop: 'unset',
    marginBottom: '12px',
    flex: 1
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.workOrders.tab.duedate
  },
  textField: {
    height: '52px',
    fontSize: 16,
    maxwidth: '303px',
    backgroundColor: theme.colors.signInButton.background
  },
  textFieldAnimation: {
    '& input': {
      '&.pac-target-input': {
        animationName: 'none'
      }
    }
  },
  icon: {
    color: theme.colors.company.iconColor,
    marginRight: '15px'
  }
}))

export const phoneInputStyles = makeStyles(theme => ({
  root: {
    marginTop: '0px',
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      width: '288px',
      borderRadius: '6px'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px'
    },
    '& .MuiIconButton-sizeSmall': {
      marginLeft: '20px'
    },
    '& .MuiIconButton-sizeSmall:hover': {
      backgroundColor: theme.colors.signInButton.background
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiFormLabel-root': {
      top: '4px'
    },
    '& .Mui-focused': {
      color: theme.colors.workOrders.tab.duedate
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    }
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.workOrders.tab.duedate
  },
  textField: {
    height: '52px',
    fontSize: 16,
    maxWidth: '309px',
    backgroundColor: theme.colors.signInButton.background
  },
  icon: {
    color: theme.colors.company.iconColor,
    marginRight: '15px'
  }
}))

export const selectorStyles = makeStyles(theme => ({
  textField: {
    height: '52px',
    fontSize: 16,
    width: '309px',
    backgroundColor: theme.colors.signInButton.background,
    color: theme.colors.text
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.workOrders.tab.duedate,
    backgroundColor: theme.colors.signInButton.background
  },
  root: {
    borderRadius: '6px',
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      borderRadius: '6px',
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer'
    },
    '& .MuiFilledInput-underline:before': {
      border: 'transparent'
    },
    '& .MuiFilledInput-underline:after': {
      border: 'transparent'
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    },
    marginBottom: '12px'
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    marginRight: '5px'
  },
  menuItem: theme.filtersClasses.menuItem
}))
