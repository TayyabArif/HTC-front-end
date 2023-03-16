/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import { FormLabel, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import customTheme from '../../styles/mui_theme'
import { textInputStyles } from '../../styles/classes/FormClasses'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 45,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? 'white' : '#2b2b2b',
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
      'Rubik'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    },
    '&:placeholder': {
      textOverflow: 'ellipsis !important',
      color: customTheme.colors.profile.text_grey,
      opacity: '1'
    },
    '&:invalid': {
      borderColor: customTheme.colors.errorText
    }
  },
  '& .Mui-disabled': {
    backgroundColor: customTheme.colors.generalBackground
  }
}))

export default function GlobalInput (props) {
  const classes = textInputStyles()
  const { label, onChange, validate, error, helperText, ...rest } = props

  const handleChange = event => {
    if (validate) {
      onChange(event)
      return
    }
    onChange(event.target.value, props.field, props.index)
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      {label && (
        <Typography id="text-label" className={classes.label}>
          {props.required && <span className={classes.required}>*</span>}
          {label}
        </Typography>
      )}
      <BootstrapInput {...rest} onChange={handleChange} />
      {error && <FormLabel className={classes.error}>{helperText}</FormLabel>}
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
