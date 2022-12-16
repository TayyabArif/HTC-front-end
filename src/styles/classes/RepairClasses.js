import { makeStyles } from '@mui/styles'

export const multiSelectorStyles = makeStyles(theme => ({
  textField: {
    minHeight: '52px',
    fontSize: '14px',
    width: '313px',
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
      color: `${theme.colors.iconBlue} !important`,
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
    '& .MuiFilledInput-multiline': {
      paddingTop: '15px',
      paddingBottom: '15px'
    },
    marginBottom: '12px'
  },
  selectedItem: {
    '& .MuiFilledInput-input': {
      color: `${theme.colors.basicDisabledButtonColor} !important`,
      lineHeight: '20px'
    }
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    right: '12px',
    position: 'absolute',
    top: '20px'
  },
  menuItem: theme.filtersClasses.selectItem,
  menu: {
    '& .MuiPaper-root': {
      borderRadius: '12px'
    }
  },
  divider: {
    backgroundColor: theme.colors.grey_2,
    marginLeft: '3px',
    marginRight: '3px'
  },
  selectedIcon: {
    marginRight: '0px',
    marginLeft: 'auto',
    color: theme.colors.mainBlue
  }
}))

export const notesComponentStyles = makeStyles(theme => ({
  container: {
    marginLeft: '5px'
  },
  fieldMessage: {
    marginBottom: '14px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  },
  notes: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  photoField: {
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  field: {
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  textField: {
    ...theme.filtersClasses.mainInput2,
    width: '309px',
    height: 'auto',
    border: 'none',
    '& .MuiInputBase-input': {
      fontSize: '14px',
      lineHeight: '18px',
      padding: '11px 12px 20px 19px'
    },
    '& .MuiInputBase-multiline': {
      padding: 0
    }
  },
  numberField: {
    ...theme.filtersClasses.mainInput2,
    height: 'auto',
    border: 'none',
    fontSize: '14px',
    lineHeight: '18px',
    padding: '17px 12px 17px 12px',
    width: '285px',
    borderRadius: '8px'
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  textAlign: {
    '& .MuiInputBase-input': {
      padding: '17px 12px 17px 19px'
    }
  },
  icon: {
    color: theme.colors.company.iconColor,
    marginRight: '15px'
  },
  clearIcon: {
    position: 'absolute',
    top: '20px',
    right: 0
  },
  clearIconNumber: {
    position: 'absolute',
    top: '25px',
    right: 0
  },
  numberContainer: {
    position: 'relative'
  }
}))

export const photoComponentStyles = makeStyles(theme => ({
  photoField: {
    marginLeft: '5px',
    marginBottom: '8px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  thumbContainer: {
    width: '99px',
    height: '94px',
    marginBottom: '6px',
    borderRadius: '8px'
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: '3px'
  },
  fieldContainer: {
    backgroundColor: theme.colors.grey_2,
    borderRadius: '6px',
    minwidth: '303px',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px',
    height: '52px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    fontSize: '14px',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    padding: '10px',
    flex: 1
  },
  button: {
    '& .MuiButton-label': {
      justifyContent: 'flex-start'
    }
  },
  menuItem: theme.filtersClasses.menuItem,
  icon: {
    alignSelf: 'center',
    paddingRight: '15px',
    color: theme.colors.grey
  },
  required: {
    fontSize: '12px',
    color: 'red',
    marginLeft: '2px'
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  container: {
    marginLeft: '5px'
  }
}))

export const signatureComponentStyles = makeStyles(theme => ({
  photoField: {
    marginLeft: '5px',
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  signatureContainer: {
    height: '99px',
    width: '303px',
    marginBottom: '6px',
    borderRadius: '8px'
  },
  thumb: {
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px'
  },
  fieldContainer: {
    backgroundColor: theme.colors.grey_2,
    borderRadius: '6px',
    minwidth: '303px',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px',
    height: '52px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    fontSize: '14px',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    padding: '10px',
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    paddingRight: '5px',
    color: theme.colors.grey
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  textField: {
    ...theme.filtersClasses.mainInput2,
    width: '313px',
    height: 'auto',
    border: 'none',
    '& .MuiInputBase-input': {
      fontSize: '14px',
      lineHeight: '18px'
    }
  },
  notes: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400',
    marginLeft: '5px'
  },
  fieldMessage: {
    marginLeft: '5px',
    marginTop: '5px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: '10px'
  }
}))

export const simplePickerStyles = makeStyles(theme => ({
  formControl: {
    marginBottom: '28px'
  },
  photoField: {
    marginLeft: '5px',
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  textField: {
    minHeight: '52px',
    fontSize: '14px',
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
    marginLeft: '5px',
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.iconBlue} !important`,
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer',
      paddingTop: 0,
      paddingBottom: 0
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer',
      borderRadius: '8px'
    },
    '& .MuiFilledInput-underline:before': {
      border: 'transparent'
    },
    '& .MuiFilledInput-underline:after': {
      border: 'transparent'
    },
    marginBottom: '12px'
  },
  selectedItem: {
    '& .MuiFilledInput-input': {
      color: `${theme.colors.basicDisabledButtonColor} !important`,
      lineHeight: '20px'
    }
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    right: '12px',
    position: 'absolute',
    top: '20px'
  },
  menuItem: theme.filtersClasses.selectItem,
  menu: {
    '& .MuiPaper-root': {
      borderRadius: '12px'
    }
  },
  divider: {
    backgroundColor: theme.colors.grey_2,
    marginLeft: '3px',
    marginRight: '3px'
  },
  selectedIcon: {
    marginRight: '0px',
    marginLeft: 'auto',
    color: theme.colors.mainBlue
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  disabled: {
    marginLeft: '5px',
    marginTop: '5px',
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  fieldMessage: {
    marginLeft: '5px',
    marginTop: '5px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  }
}))

export const taskListStyles = makeStyles(theme => ({
  repairItem: {
    minHeight: '20px',
    marginBottom: '20px',
    marginLeft: '5px'
  },
  checkIcon: {
    width: '20px',
    color: theme.colors.workOrders.tab.duedate
  },
  dotIcon: {
    fontSize: '7px',
    width: '15px',
    color: theme.colors.workOrders.tab.duedate
  },
  field: {
    marginLeft: '0px',
    marginBottom: '7px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  item: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  taskList: {
    display: 'flex',
    alignItems: 'center'
  },
  selectedTask: {
    display: 'flex',
    alignContent: 'center'
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  fieldMessage: {
    marginBottom: '14px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  }
}))
