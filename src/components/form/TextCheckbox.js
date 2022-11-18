/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { Box, FormControlLabel, makeStyles, Switch } from '@mui/material'

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  control: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '45px',
    marginLeft: '0px',
    marginRight: '0.5em',
    marginBottom: '0.5em',
    '& .MuiFormControlLabel-label': {
      fontSize: '20px',
      fontWeight: '500',
      padding: '12px'
    },
    '& .MuiSwitch-root': {
      padding: '9px'
    },
    '& .MuiSwitch-track': {
      borderRadius: '40px'
    }
  },
  disabled: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '45px',
    marginLeft: '0px',
    marginRight: '0.5em',
    marginBottom: '0.5em',
    '& .MuiFormControlLabel-label': {
      fontSize: '20px',
      fontWeight: '500',
      padding: '12px'
    },
    '& .MuiSwitch-root': {
      padding: '9px'
    },
    '& .MuiSwitch-track': {
      borderRadius: '40px',
      backgroundColor: theme.colors.profile.disabled_bg + ' !important'
    },
    '& .Mui-checked': {
      color: theme.colors.profile.border_input,
      pointer: 'default'
    }
  }
}))

export default function GlobalCheckbox(props) {
  const classes = useStyles()

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
