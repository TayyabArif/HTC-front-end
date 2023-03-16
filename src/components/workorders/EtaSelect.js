import React, { useState } from 'react'
import { FormLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DateTimeFilter } from './DateTimeFilter'
import moment from 'moment'
import { uploadETA } from '../../lib/Api'
import { etaSelectStyles } from '../../styles/classes/WorkOrdersClasses'

export const EtaSelect = props => {
  const { t } = useTranslation()
  const classes = etaSelectStyles()
  const { woId, data, disabled, type, onUpdate } = props
  const [eta, setEta] = useState(data?.time)

  const updateEta = time => {
    setEta(time)
    const wo = uploadETA(woId, time, type === 'iframe')
    onUpdate(wo.est_service_start)
  }

  return (
    <div className={classes.container}>
      <FormLabel component="legend" className={classes.field}>
        {t('work_orders.trips.eta')}
      </FormLabel>
      {disabled
        ? (
          <FormLabel component="legend" className={classes.fieldData}>
            {data && data?.time && data.time !== ''
              ? moment(new Date(eta)).format(t('general.date_formats.basic'))
              : t('general.labels.not_available')}
          </FormLabel>
        )
        : (
          <DateTimeFilter
            id={'eta'}
            values={eta ?? ''}
            type={2}
            setValues={updateEta}
            filterContent={() => null}
          />
        )}
    </div>
  )
}
