import React, { useEffect, useState } from 'react'

/** Material UI **/
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { FormLabel, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectStyles } from '../../styles/classes/FormClasses'

import customTheme from '../../styles/mui_theme'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 45,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 15,
    padding: '7px 26px 7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 45,
      borderColor: customTheme.colors.profile.border_focus,
      boxShadow: '0 0 0 0.2rem ' + customTheme.colors.profile.box_shadow
    }
  }
}))

export default function GlobalSelect (props) {
  const classes = selectStyles()
  const {
    label,
    field,
    index,
    onChange,
    options,
    placeholder,
    multiple,
    displayValue,
    error,
    helperText,
    validate,
    uniqValue,
    disabled
  } = props
  const [fieldError, setFieldError] = useState(false)

  useEffect(() => {
    if (!props.value && props.required) {
      setFieldError(true)
    }
  }, [])

  const handleChange = event => {
    if (event.target.value.length === 0 && props.required) {
      setFieldError(true)
    } else {
      setFieldError(false)
    }
    if (validate) {
      onChange(event)
      return
    }
    onChange(event.target.value, field, index)
  }
  const getLabel = value => {
    if (!value) return ''
    const itemSelected = options.find(item => item.value === value)
    return itemSelected?.label || ''
  }

  const showSelectedStatus = item => {
    const currentValue = props.value
    if (props.multiple && currentValue?.length) {
      return currentValue.includes(item)
    }
    return false
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      {label
        ? (
          <Typography id="text-label" className={classes.label}>
            {props.required && <span className={classes.required}>*</span>}
            {label}
          </Typography>
        )
        : (
          ''
        )}
      <Select
        className={
          props.required && fieldError
            ? classes.highlightField
            : classes.normalField
        }
        {...props}
        onChange={handleChange}
        disabled={disabled}
        classes={{ icon: classes.iconMargin }}
        input={<BootstrapInput />}
        displayEmpty
        renderValue={selected => {
          if (!selected || selected?.length === 0) {
            return <em className={classes.text}>{placeholder}</em>
          }
          if (uniqValue) {
            return uniqValue
          }
          if (multiple) {
            return selected?.join(', ')
          } else {
            if (displayValue) return getLabel(selected)
            return selected
          }
        }}
      >
        {!!options?.length &&
          options.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              style={{
                fontSize: '12px'
              }}
            >
              <div className={classes.itemContent}>
                <div>{item.label}</div>
                {showSelectedStatus(item.value) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    style={{
                      fontSize: '14px',
                      color: customTheme.colors.checkBlue
                    }}
                  />
                )}
              </div>
            </MenuItem>
          ))}
      </Select>

      {error && <FormLabel className={classes.error}>{helperText}</FormLabel>}
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
