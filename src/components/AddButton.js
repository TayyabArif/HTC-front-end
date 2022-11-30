import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, FormLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.colors.iconBlue,
    marginRight: '5px'
  },
  button: {
    textTransform: 'none',
    '& .MuiFormLabel-root': {
      color: theme.colors.iconBlue,
      fontSize: '14px'
    },
    paddingLeft: '0px'
  }
}))

export const AddButton = props => {
  const { label, callback } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Button className={classes.button} onClick={event => callback(event)}>
      <FontAwesomeIcon icon={['fas', 'circle-plus']} className={classes.icon} />
      <FormLabel>
        {t('general.labels.add') + ' ' + label || t('work_orders.trips.notes')}
      </FormLabel>
    </Button>
  )
}
