/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { Box, FormControlLabel, Switch } from '@mui/material'
import { textCheckboxStyles } from '../../styles/classes/FormClasses'

export default function GlobalCheckbox (props) {
  const classes = textCheckboxStyles()

  const handleChange = event => {
    props.handleChange(event.target.name, event.target.checked)
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FormControlLabel
        name={props.name}
        control={<Switch color="primary" />}
        label={props.label}
        labelPlacement="start"
        className={props.disabled ? classes.disabled : classes.control}
        onChange={handleChange}
        checked={props.checked}
      />
      <div className={classes.bottomSpacing}></div>
    </Box>
  )
}
