/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { makeStyles, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { TimePicker } from 'antd'

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    color: theme.colors.grey,
    fontSize: '12px',
    marginBottom: '0.5em'
  },
  timeInput: {
    'label + &': {
      marginTop: theme.spacing(3)
    },
    borderRadius: 45,
    border: '1px solid ' + theme.colors.profile.border_input,
    fontSize: 12,
    width: '9em',
    padding: '8px 10px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    '& .ant-picker-dropdown': {
      zIndex: '3000'
    }
  }
}))

export default function GlobalTimeInput(props) {
  const classes = useStyles()

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
