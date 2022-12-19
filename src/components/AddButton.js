import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, FormLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { addButtonStyles } from '../styles/classes/CommonClasses'

export const AddButton = props => {
  const { label, callback } = props
  const classes = addButtonStyles()
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
