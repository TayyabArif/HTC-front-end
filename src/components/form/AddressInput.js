/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { alpha, styled } from '@mui/material/styles'
import { makeStyles } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import customTheme from '../../styles/mui_theme'

const BootstrapInput = styled(AutoCompleteAddress)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    color: customTheme.colors.profile.text_grey,
    borderRadius: 45,
    position: 'relative',
    backgroundColor: customTheme.colors.white,
    border: '1px solid ' + customTheme.colors.profile.border_input,
    fontSize: 12,
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
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    marginLeft: '5px'
  },
  required: {
    color: theme.colors.errorText
  },
  highlightField: {
    borderColor: theme.colors.errorText + '!important'
  }
}))

export default function GlobalAddressInput (props) {
  const classes = useStyles()

  const handleChange = (event, field, addressInfo) => {
    props.onChange(event.target.value, field, addressInfo)
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      <InputLabel shrink htmlFor="bootstrap-input" className={classes.label}>
        {props.required && <span className={classes.required}>*</span>}
        {props.label}
      </InputLabel>
      <BootstrapInput
        {...props}
        onChange={handleChange}
        id="bootstrap-input"
        className={props.required && props.value?.length === 0 && classes.highlightField}
      />
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
