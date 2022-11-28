import React, { useRef, useState } from 'react'
import {
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectorStyles } from '../../styles/classes/AccountSettingsClasses'

export const Selector = React.forwardRef((props, ref) => {
  const classes = selectorStyles({ disabled: props.disabled })
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
      className={classes.formControl}
      disabled={props.disabled}
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
              <FontAwesomeIcon
                icon={['fas', 'caret-down']}
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
              classes={{ root: classes.menuItem }}
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
