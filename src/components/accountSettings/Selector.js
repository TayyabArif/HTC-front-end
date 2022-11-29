import React, { useRef, useState } from 'react'
import {
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { SelectorClasses } from '../../styles/classes/AccountSettingsClasses'

export const Selector = React.forwardRef((props, ref) => {
  const classes = SelectorClasses({ disabled: props.disabled })
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
        className={ classes.root }
        InputLabelProps={{ className: classes.label }}
        InputProps={{
          className: classes.textField,
          disableUnderline: true,
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
