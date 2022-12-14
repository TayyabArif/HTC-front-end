/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'

/** Material UI **/
import { styled } from '@mui/system'
import { FormLabel, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { NumericFormat } from 'react-number-format'
import customTheme from '../../styles/mui_theme'
import { numberInputStyles } from '../../styles/classes/FormClasses'

const BootstrapInput = styled(NumericFormat)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  borderRadius: 45,
  position: 'relative',
  backgroundColor: customTheme.colors.white,
  border: '1px solid ' + customTheme.colors.profile.border_input,
  fontSize: 15,
  width: '100%',
  padding: '10px 12px',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow'
  ]),
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
    border: '1px solid ' + theme.palette.primary.main,
    boxShadow: '0 0 0 0.2rem ' + customTheme.colors.profile.box_shadow,
    outline: 'none'
  },
  '&:placeholder': {
    textOverflow: 'ellipsis !important',
    color: customTheme.colors.profile.text_grey,
    opacity: '1'
  },
  '&:disabled': {
    color: 'rgba(0, 0, 0, 0.25)'
  },
  '&:invalid': {
    borderColor: customTheme.colors.errorText
  }
}))

export default function GlobalNumberInput (props) {
  const classes = numberInputStyles()
  const [value, setValue] = useState('')
  const { label, onChange, validate, error, helperText, ...rest } = props

  const handleChange = event => {
    if (validate) {
      onChange(event)
      return
    }
    setValue(event.target.value)
    onChange(event.target.value, props.field)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

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
      <BootstrapInput
        {...rest}
        value={value}
        onChange={handleChange}
        className={props.error ? classes.borderError : props?.className}
      />
      {error && (
        <FormLabel className={classes.error}>{helperText}</FormLabel>
      )}
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
