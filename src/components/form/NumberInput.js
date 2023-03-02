/* eslint-disable no-undef */
import React, { useState, useEffect, forwardRef } from 'react'

/** Material UI **/
import { styled } from '@mui/system'
import { FormLabel, Typography, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { PatternFormat as NumberFormat } from 'react-number-format'
import customTheme from '../../styles/mui_theme'
import { numberInputStyles } from '../../styles/classes/FormClasses'

const BootstrapInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  borderRadius: 45,
  position: 'relative',
  backgroundColor: customTheme.colors.white,
  fontSize: '15px',
  width: '100%',
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
    borderRadius: 45,
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
    borderRadius: 45,
    color: 'rgba(0, 0, 0, 0.25)'
  },
  '&:invalid': {
    borderRadius: 45,
    borderColor: customTheme.colors.errorText
  },
  input: {
    padding: '10px 12px',
    borderRadius: '45px',
    fontSize: '15px'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '45px !important'
    }
  }
}))

const NumberFormatCustom = forwardRef(function NumberFormatCustom (props, ref) {
  const { onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.formattedValue
          }
        })
      }}
      format="(###) ### ####"
    />
  )
})

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
        InputProps={{
          className: classes.inputText,
          inputComponent: NumberFormatCustom,
          disableUnderline: true,
          ...rest
        }}
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
