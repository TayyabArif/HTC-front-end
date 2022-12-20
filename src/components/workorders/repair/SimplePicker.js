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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { simplePickerStyles } from '../../../styles/classes/RepairClasses'

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
  const classes = simplePickerStyles({ disabled: props.disabled })
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
                    icon={faCheck}
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
