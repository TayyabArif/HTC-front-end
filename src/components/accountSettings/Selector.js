import React, { useRef, useState } from 'react'
import {
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ArrowDropDown } from '@mui/icons-material'

const useStyles = makeStyles(theme => ({
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
    color: theme.colors.tab.duedate,
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
    '& .MuiFormLabel-root': {
      color: theme.colors.settings.fieldName,
      top: '4px',
      fontSize: '16px'
    },
    '& .MuiInputBase-input': {
      fontSize: '16px'
    },
    marginBottom: '12px'
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    '&.MuiButtonBase-root': {
      padding: '0px'
    }
  },
  menuItem: theme.filtersClasses.menuItem,
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    }
  }
}))

export const Selector = React.forwardRef((props, ref) => {
  const classes = useStyles({ disabled: props.disabled })
  const [anchorEl, setAnchorEl] = useState(null)
  const inputRef = useRef()

  const handleOpen = event => {
    if (props.disabled) return
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <FormControl
      variant="filled"
      disabled={props.disabled}
      fullWidth
      className={classes.formControl}
    >
      <TextField
        id={props.id}
        name={props.id}
        size="small"
        variant="filled"
        error={props.error}
        helperText={props.helperText}
        ref={inputRef}
        label={props.label}
        value={props.value}
        onClick={handleOpen}
        onClose={handleClose}
        autoComplete="off"
        disabled={props.disabled}
        classes={{ root: classes.root }}
        InputLabelProps={{ className: classes.label }}
        InputProps={{
          className: classes.textField,
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDown
                className={classes.icon}
              />
            </InputAdornment>
          )
        }}
      />
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          onClose={handleClose}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {props.options.map(option => (
            <MenuItem
              key={option.id}
              value={option.id}
              className={classes.menuItem}
              onClick={() => {
                props.handleChange({
                  target: { name: props.id, value: option.id }
                })
                handleClose()
              }}
              style={{ width: inputRef.current.clientWidth }}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </FormControl>
  )
})

Selector.displayName = 'Selector'
