import { makeStyles } from '@mui/styles'
import { navBarHeaderHeight } from '../../lib/Constants'

export const AccountSettingsPageClasses = makeStyles(theme => ({
  container: {
    padding: '0px 0px',
    margin: '0px 0px',
    maxWidth: '100%',
    height: '400px'
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      display: 'flex',
      color: theme.colors.white,
      padding: '24px 0px 32px 62px',
      fontWeight: 700,
      fontSize: '28px'
    }

  },
  titleBackground: {
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.colors.accountSettings.bgBlue,
    height: '400px',
    width: '100%',
    maxWidth: '100%'
  },
  frontBoxes: {
    position: 'relative'
  }
}))

export const UpdateAccountInfoClasses = makeStyles(theme => ({
  title: {
    '&.MuiFormLabel-root': {
      color: 'black',
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: 'Rubik Bold',
      margin: '32px 0px 0px 0px'
    }
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
    maxHeight: `calc(100% - calc(${navBarHeaderHeight + ' + 12px'}))`,
    marginTop: navBarHeaderHeight,
    width: '387px',
    borderRadius: '8px',
    overflow: 'auto',
    overflowX: 'hidden',
    zIndex: 1500,
    boxSizing: 'content-box',
    marginBottom: '20px',
    display: 'flex'
  },
  footer: {
    marginBottom: 20,
    height: '49px',
    width: '341px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawerContainer: { height: '100%', position: 'relative' },
  drawerTitle: { alignItems: 'center', paddingLeft: '20px' },
  drawerContent: {
    '&.MuiGrid-root': {
    }
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
    }
  }
}))

export const AccountInfoCardClasses = makeStyles(theme => ({
  card: {
    '&.MuiCard-root': {
      borderRadius: '10px',
      margin: '0px 15px 13px 62px',
      boxShadow: 'none',
      border: 'none'
    }
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontSize: '24px',
      fontWeight: '700',
      margin: '23px 0px 22px 20px'
    }
  },
  editButton: {
    '&.MuiButtonBase-root': {
      marginRight: '10px'
    },
    '& .MuiTypography-root': {
      color: theme.colors.settings.editButton,
      fontFamily: 'Rubik',
      fontWeight: '500',
      padding: 0,
      fontSize: '19px',
      textTransform: 'none'
    }
  },
  field: {
    '&.MuiTypography-root': {
      fontSize: '15px',
      fontWeight: '500',
      color: theme.colors.settings.fieldName
    }
  },
  info: {
    '&.MuiTypography-root': {
      border: `1px solid ${theme.colors.settings.border}`,
      borderRadius: '30px',
      fontSize: '15.3px',
      fontWeight: '400',
      color: theme.colors.black,
      marginBottom: '15px',
      wordWrap: 'break-word',
      padding: '5px 13px',
      minHeight: '35px'
    }
  },
  disabled: {
    '&.MuiTypography-root': {
      color: `${theme.colors.textGray} !important`
    }
  },
  customInfo: {
    paddingTop: '9px !important',
    paddingBottom: 'unset !important'
  },
  gridImg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: '140px',
    height: '140px'
  },
  content: {
    '&.MuiCardContent-root': {
      padding: '10px 0px 20px 32px'
    }
  }
}))

export const PhoneInputClasses = makeStyles(theme => ({
  root: {
    '& .MuiFilledInput-input': {
      fontFamily: 'Rubik',
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px',
      fontSize: '10.7px'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px'
    },
    '& .MuiIconButton-sizeSmall': {
      marginLeft: '0px'
    },
    '& .MuiIconButton-sizeSmall:hover': {
      backgroundColor: theme.colors.signInButton.background
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiFormLabel-root': {
      color: theme.colors.settings.fieldName,
      top: '4px',
      fontSize: '10.7px',
      fontWeight: '400',
      letterSpacing: '0.53px'
    },
    '& .Mui-focused': {
      color: theme.colors.tab.duedate
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    },
    '& .MuiInputBase-input': {
      fontSize: '16px'
    },
    '& .MuiFormLabel-asterisk': {
      color: theme.colors.errorText
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
    color: theme.colors.tab.duedate
  },
  textField: {
    height: '52px',
    backgroundColor: theme.colors.signInButton.background
  },
  icon: {
    color: theme.colors.company.iconColor,
    '& svg': {
      fontSize: '25px'
    },
    '&.MuiButtonBase-root': {
      padding: '0px',
      paddingTop: '16px'
    }
  },
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    }
  }
}))

export const TextInputClasses = makeStyles(theme => ({
  root: {
    '& .MuiFilledInput-input': {
      fontFamily: 'Rubik',
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px',
      fontSize: '10.7px'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px'
    },
    '& .MuiIconButton-sizeSmall': {
      marginLeft: '0px'
    },
    '& .MuiIconButton-sizeSmall:hover': {
      backgroundColor: theme.colors.signInButton.background
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiFormLabel-root': {
      color: theme.colors.settings.fieldName,
      top: '4px',
      fontSize: '10.7px',
      fontWeight: '400',
      letterSpacing: '0.53px'
    },
    '& .Mui-focused': {
      color: theme.colors.tab.duedate
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    },
    '& .MuiInputBase-input': {
      fontSize: '16px'
    },
    marginTop: 'unset',
    marginBottom: '12px',
    flex: 1,
    '& .MuiFormLabel-asterisk': {
      color: theme.colors.errorText
    }
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.tab.duedate
  },
  textField: {
    height: '52px',
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
    '& svg': {
      fontSize: '25px'
    },
    '&.MuiButtonBase-root': {
      padding: '0px',
      paddingTop: '16px'
    }
  },
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    }
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
    '& svg': {
      fontSize: '25px'
    },
    '&.MuiButtonBase-root': {
      padding: '0px'
    }
  },
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    }
  }
}))

export const SelectorClasses = makeStyles(theme => ({
  textField: {
    height: '52px',
    fontSize: 16,
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
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer',
      fontSize: '10.7px'
    },
    '& .MuiFilledInput-root.Mui-disabled': {
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
    '& .MuiFormLabel-root': {
      color: theme.colors.settings.fieldName,
      top: '4px',
      fontSize: '10.7px',
      fontWeight: '400',
      letterSpacing: '0.53px'
    },
    '& .MuiInputBase-input': {
      fontSize: '16px'
    },
    '& .MuiFormLabel-asterisk': {
      color: theme.colors.errorText
    },
    marginBottom: '12px'
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    marginRight: '5px',
    marginTop: '13px'
  },
  menuItem: theme.filtersClasses.menuItem,
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    },
    '& .MuiInputBase-input.Mui-disabled': {
      'text-fill-color': 'unset'
    }
  }
}))
