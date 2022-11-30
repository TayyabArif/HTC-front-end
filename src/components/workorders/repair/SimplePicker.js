import React, { useRef, useState } from 'react'
import {
  Divider,
  FormControl,
  FormLabel,
  InputAdornment,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
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

export const SimplePicker = React.forwardRef(props => {
  const {
    options,
    value,
    handleChange,
    id,
    title,
    mandatory,
    disabled,
    notAvailable
  } = props
  const classes = useStyles({ disabled: props.disabled })
  const [anchorEl, setAnchorEl] = useState(null)
  const inputRef = useRef()
  const { t } = useTranslation()

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <FormLabel
        component="legend"
        className={`${classes.photoField} ${
          !disabled && mandatory ? classes.mandatory : null
        }`}
      >
        {title}
      </FormLabel>
      {!disabled
        ? (
        <TextField
          id={id}
          name={id}
          size="small"
          variant="filled"
          ref={inputRef}
          value={value ? options[value] || value : t('general.labels.select')}
          onClick={handleOpen}
          onClose={handleClose}
          disabled
          autoComplete="off"
          className={`${classes.root} ${value ? classes.selectedItem : ''}`}
          InputLabelProps={{ className: classes.label }}
          InputProps={{
            className: classes.textField,
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon
                  icon={['fas', 'caret-down']}
                  className={classes.icon}
                />
              </InputAdornment>
            )
          }}
        />
          )
        : (
        <FormLabel
          className={notAvailable ? classes.fieldMessage : classes.disabled}
        >
          {notAvailable && t('general.labels.not_available')}
          {!notAvailable && options[value]
            ? options[value]
            : Object.values(options).includes(value)
              ? value
              : ''}
        </FormLabel>
          )}
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          onClose={handleClose}
          className={classes.menu}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {Object.keys(options).map((key, idx) => (
            <>
              <MenuItem
                key={`option-${key}`}
                value={key}
                className={classes.menuItem}
                onClick={() => {
                  handleChange(options[key])
                  handleClose()
                }}
                style={{ width: inputRef.current.clientWidth }}
              >
                {options[key]}
                {options[key] === value && (
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    className={classes.selectedIcon}
                  />
                )}
              </MenuItem>
              {idx !== options.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </Menu>
      )}
    </FormControl>
  )
})

SimplePicker.displayName = 'SimplePicker'
