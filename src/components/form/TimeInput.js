/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { TimePicker } from 'antd'
import { textInputStyles } from '../../styles/classes/FormClasses'

export default function GlobalTimeInput (props) {
  const classes = textInputStyles()

  const handleChange = (time, timeString) => {
    props.onChange(timeString, props.field)
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      {props.label && (
        <Typography id="text-label" className={classes.label}>
          {props.label}
        </Typography>
      )}
      <TimePicker
        className={classes.timeInput}
        {...props}
        popupStyle={{ zIndex: 1300 }}
        onChange={handleChange}
        id="time-input"
        minuteStep={30}
      />
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
