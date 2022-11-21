/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { addressInputStyles } from '../../styles/classes/FormClasses'

export default function GlobalAddressInput (props) {
  const classes = addressInputStyles()

  return (
    <FormControl variant="standard" fullWidth={true}>
      <InputLabel shrink htmlFor="bootstrap-input" className={classes.label}>
        {props.required && <span className={classes.required}>*</span>}
        {props.label}
      </InputLabel>
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
