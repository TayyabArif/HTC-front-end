import React from 'react'
import { ToggleButton, ToggleButtonGroup, Box, makeStyles, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  label: {
    fontSize: '12px',
    color: theme.colors.grey
  },
  button: {
    '& .MuiToggleButton-root': {
      fontSize: '12px',
      margin: '10px 10px',
      borderRadius: '45px !important',
      padding: '8px 0px',
      width: '6em',
      border: '1px solid rgba(0, 0, 0, 0.12) !important',
      textTransform: 'none',
      color: theme.colors.profile.text_grey
    },
    '& .Mui-selected': {
      backgroundColor: theme.colors.iconBlue + ' !important',
      color: theme.colors.white + '!important'
    }
  }
}))

export const YesNoQuestion = props => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleChange = event => {
    const responseValue = event.target.value === 'yes'
    props.onChange(responseValue, props.field)
  }

  return (
    <Box display="flex" flexDirection="row">
      <Box flex={3} margin="auto">
        <Typography id="text-label" className={classes.label}>
          {props.label}
        </Typography>
      </Box>
      <Box flex={1} alignContent="center">
        <ToggleButtonGroup
          {...props}
          exclusive
          onChange={handleChange}
          className={classes.button}
        >
          <ToggleButton value="yes">{t('company_profile.yes')}</ToggleButton>
          <ToggleButton value="no">{t('company_profile.no')}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <div className={classes.bottomSpacing}></div>
    </Box>
  )
}
