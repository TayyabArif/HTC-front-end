import React from 'react'
import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { yesNoQuestionStyles } from '../../styles/classes/FormClasses'

export const YesNoQuestion = props => {
  const classes = yesNoQuestionStyles()
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
