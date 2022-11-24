import { makeStyles } from '@mui/styles'

export const addressInputStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    fontFamily: 'Rubik',
    fontWeight: '400',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px',
    color: theme.colors.stepperGray
  },
  required: {
    color: theme.colors.errorText
  },
  highlightField: {
    borderColor: theme.colors.errorText + '!important'
  }
}))

export const chipStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5em',
    paddingTop: '1em'
  },
  chip: {
    fontSize: '12px',
    fontWeight: '400',
    padding: '16px 0px',
    lineHeight: '14px'
  },
  chipSelected: {
    fontSize: '12px',
    fontWeight: '400',
    backgroundColor: theme.colors.iconBlue + ' !important',
    color: 'white',
    border: '1px solid ' + theme.colors.iconBlue,
    padding: '16px 0px',
    lineHeight: '14px'
  }
}))

export const expirationDateStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  text: {
    width: '100%',
    textAlign: 'initial',
    fontStyle: 'normal'
  },
  label: {
    marginTop: '0.1em',
    marginBottom: '0.9em',
    fontSize: '12px',
    color: theme.colors.labels
  },
  label_error: {
    marginTop: '0.1em',
    marginBottom: '0.9em',
    fontSize: '12px',
    color: theme.colors.error
  },
  componentDivider: {
    marginRight: '10px'
  },
  componentContainer: {
    minWidth: '13em'
  },
  iconMargin: {
    maxHeight: '24px',
    marginRight: '7px'
  },
  required: {
    color: theme.colors.errorText
  }
}))

export const laborHoursStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    fontSize: '12px',
    color: theme.colors.grey,
    marginBottom: '0.5em'
  },
  timeContainer: {
    gap: '1em',
    [theme.breakpoints.down('md')]: {
      gap: '0.5em'
    }
  },
  days: {
    minWidth: '11em',
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto'
    }
  },
  error: {
    marginLeft: '5px',
    marginBottom: '1em',
    fontSize: '10px',
    color: theme.colors.errorText
  },
  iconMargin: {
    marginRight: '7px'
  }
}))

export const numberInputStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px',
    color: theme.colors.stepperGray
  },
  error: {
    fontSize: '10px',
    color: theme.colors.errorText,
    textAlign: 'left',
    paddingTop: '5px',
    marginLeft: '15px'
  },
  required: {
    color: theme.colors.errorText
  },
  borderError: {
    borderColor: theme.colors.errorText
  }
}))

export const paginatingListStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  text: {
    textTransform: 'none',
    fontSize: '12px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  label: {
    fontSize: '12px',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px'
  },
  itemContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '0.5em'
  },
  error: {
    fontSize: '10px',
    color: theme.colors.errorText
  },
  multiselectContent: {
    borderColor: theme.colors.buttonGrey,
    border: '1px solid',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8
  },
  multiselectZip: {
    maxHeight: 375,
    overflow: 'auto'
  }
}))

export const selectStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  text: {
    textAlign: 'initial',
    fontStyle: 'normal'
  },
  label: {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px',
    color: theme.colors.stepperGray
  },
  itemContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  error: {
    fontSize: '10px',
    color: theme.colors.errorText,
    textAlign: 'left',
    marginLeft: '15px'
  },
  iconMargin: {
    marginRight: '7px'
  },
  required: {
    color: theme.colors.errorText
  },
  highlightField: {
    border: '1px solid ' + theme.colors.errorText,
    borderRadius: '45px'
  },
  normalField: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '45px'
  }
}))

export const textCheckboxStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  control: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '45px',
    marginLeft: '0px',
    marginRight: '0.5em',
    marginBottom: '0.5em',
    '& .MuiFormControlLabel-label': {
      fontSize: '20px',
      fontWeight: '500',
      padding: '12px'
    },
    '& .MuiSwitch-root': {
      padding: '9px'
    },
    '& .MuiSwitch-track': {
      borderRadius: '40px'
    }
  },
  disabled: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '45px',
    marginLeft: '0px',
    marginRight: '0.5em',
    marginBottom: '0.5em',
    '& .MuiFormControlLabel-label': {
      fontSize: '20px',
      fontWeight: '500',
      padding: '12px'
    },
    '& .MuiSwitch-root': {
      padding: '9px'
    },
    '& .MuiSwitch-track': {
      borderRadius: '40px',
      backgroundColor: theme.colors.profile.disabled_bg + ' !important'
    },
    '& .Mui-checked': {
      color: theme.colors.profile.border_input,
      pointer: 'default'
    }
  }
}))

export const textInputStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 20
  },
  label: {
    fontSize: '15px',
    fontWeight: '400',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px',
    color: theme.colors.stepperGray
  },
  error: {
    marginTop: '0.5em',
    fontSize: '10px',
    color: theme.colors.errorText,
    textAlign: 'left',
    marginLeft: '15px'
  },
  required: {
    color: theme.colors.errorText
  }
}))

export const textInputButtonsStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  addButton: {
    color: 'white',
    textTransform: 'none',
    fontSize: '7px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '35px',
    padding: '2px 12px',
    marginBottom: '1em',
    minWidth: '45%',
    [theme.breakpoints.down('md')]: {
      maxHeight: '20px'
    }
  },
  removeButton: {
    fontSize: '12px',
    marginBottom: '4px',
    marginLeft: '75%'
  },
  inputContainer: {
    width: '100%'
  },
  label: {
    fontSize: 12,
    marginBottom: '0.5em'
  },
  inputRoot: {
    width: '100%',
    paddingRight: '25px'
  }
}))

export const timeInputStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    color: theme.colors.grey,
    fontSize: '12px',
    marginBottom: '0.5em'
  },
  timeInput: {
    'label + &': {
      marginTop: theme.spacing(3)
    },
    borderRadius: 45,
    border: '1px solid ' + theme.colors.profile.border_input,
    fontSize: 12,
    width: '9em',
    padding: '8px 10px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    '& .ant-picker-dropdown': {
      zIndex: '3000'
    }
  }
}))

export const uploadFileStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  button: {
    backgroundColor: theme.colors.iconBlue,
    color: theme.colors.white,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em'
  },
  buttonError: {
    backgroundColor: theme.colors.white,
    color: theme.colors.errorColor,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em',
    border: '1px dashed ' + theme.colors.errorColor
  },
  removeButton: {
    fontSize: '12px'
  },
  input: {
    borderRadius: 45,
    padding: '0.6em',
    borderColor: theme.colors.profile.border_input,
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      fontSize: 12
    },
    '& .MuiOutlinedInput-input': {
      padding: '0px'
    }
  },
  error: {
    marginLeft: '5px',
    marginTop: '0.5em',
    fontSize: '10px',
    color: theme.colors.errorText
  },
  label: {
    marginTop: '0.1em',
    fontSize: '12px',
    color: theme.colors.labels,
    marginLeft: '5px'
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginTop: '2.05em',
    border: '1px solid ' + theme.colors.profile.border_input,
    padding: '0.8em',
    borderRadius: 45,
    minWidth: '15em',
    alignItems: 'center'
  },
  fileData: {
    maxWidth: '12em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: '0.3em'
  },
  required: {
    color: theme.colors.errorText
  },
  buttonRequired: {
    backgroundColor: theme.colors.iconBlue,
    color: theme.colors.white,
    border: '1px solid ' + theme.colors.errorText,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em'
  }
}))

export const yesNoQuestionStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    fontSize: '12px',
    color: theme.colors.grey
  },
  button: {
    '& .MuiToggleButton-root': {
      fontSize: '12px',
      margin: '10px 10px',
      borderRadius: '45px !important',
      padding: '8px 0px',
      width: '6em',
      border: '1px solid rgba(0, 0, 0, 0.12) !important',
      textTransform: 'none',
      color: theme.colors.profile.text_grey
    },
    '& .Mui-selected': {
      backgroundColor: theme.colors.iconBlue + ' !important',
      color: theme.colors.white + '!important'
    }
  }
}))
