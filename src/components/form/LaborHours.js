/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

/** Material UI **/
import { Box, FormLabel, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import GlobalSelect from './Select'
import { useTranslation } from 'react-i18next'
import GlobalTimeInput from './TimeInput'
import GlobalInput from './TextInput'
import moment from 'moment'
import { laborHoursStyles } from '../../styles/classes/FormClasses'

export default function GlobalLaborHours (props) {
  const classes = laborHoursStyles()
  const { t } = useTranslation()
  const { laborhours, hoursError, setHoursError } = props
  const [hours, setHours] = useState()

  useEffect(() => {
    setHours({ ...laborhours })
  }, [])

  const weekend = [
    { label: t('company_profile.weekend'), value: 'weekend' },
    { label: t('company_profile.saturday'), value: 'saturday' },
    { label: t('company_profile.sunday'), value: 'sunday' }
  ]

  const handleChange = (value, field) => {
    hours[field] = value
    props.onChange(value, field)

    if (field !== 'weekend_days') {
      if (field === 'time_from' || field === 'time_to') {
        hoursValidation(hours.time_from, hours.time_to, 'weekdays')
      } else {
        hoursValidation(
          hours.weekend_time_from,
          hours.weekend_time_to,
          'weekend'
        )
      }
    }
  }

  const hoursValidation = (timeFrom, timeTo, days) => {
    const errorTmp = { ...hoursError }
    if (timeFrom === '' || timeTo === '') {
      errorTmp[days] = !(timeFrom === '' && timeTo === '')
      setHoursError(errorTmp)
    } else {
      // initialize with same date for comparisson
      const date1 = new Date('2022-01-01 ' + timeFrom)
      const date2 = new Date('2022-01-01 ' + timeTo)

      if (date1.getTime() < date2.getTime()) {
        errorTmp[days] = false
        setHoursError(errorTmp)
      } else {
        errorTmp[days] = true
        setHoursError(errorTmp)
      }
    }
  }
  return (
    <FormControl variant="standard" fullWidth={true}>
      <Box display="flex" flexDirection="row" className={classes.timeContainer}>
        <GlobalInput
          label={props.labeldays}
          value={t('company_profile.weekdays')}
          readOnly
          className={classes.days}
          disabled={props.disableComponent}
        />
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Typography id="text-label" className={classes.label}>
            {props.labelhours}
          </Typography>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection="row"
              className={classes.timeContainer}
            >
              <GlobalTimeInput
                field="time_from"
                onChange={handleChange}
                defaultValue={
                  laborhours?.time_from
                    ? moment(laborhours?.time_from, 'hh:mm A')
                    : ''
                }
                disabled={props.disableComponent}
                placeholder={t('company_profile.placeholder.open')}
                format="hh:mm A"
                use12Hours
              />
              <GlobalTimeInput
                field="time_to"
                onChange={handleChange}
                defaultValue={
                  laborhours?.time_to
                    ? moment(laborhours?.time_to, 'hh:mm A')
                    : ''
                }
                disabled={props.disableComponent}
                placeholder={t('company_profile.placeholder.close')}
                format="hh:mm A"
                use12Hours
              />
            </Box>
            {hoursError.weekdays && (
              <FormLabel className={classes.error}>
                {t('company_profile.error.hours_operation')}
              </FormLabel>
            )}
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" className={classes.timeContainer}>
        <GlobalSelect
          options={weekend}
          onChange={handleChange}
          defaultValue="weekend"
          field="weekend_days"
          value={laborhours?.weekend_days}
          disabled={props.disableComponent}
          displayValue
        />
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            className={classes.timeContainer}
          >
            <GlobalTimeInput
              field="weekend_time_from"
              onChange={handleChange}
              defaultValue={
                laborhours?.weekend_time_from
                  ? moment(laborhours?.weekend_time_from, 'hh:mm A')
                  : ''
              }
              disabled={props.disableComponent}
              placeholder={t('company_profile.placeholder.open')}
              format="hh:mm A"
              use12Hours
              allowClear
            />
            <GlobalTimeInput
              field="weekend_time_to"
              onChange={handleChange}
              defaultValue={
                laborhours?.weekend_time_to
                  ? moment(laborhours?.weekend_time_to, 'hh:mm A')
                  : ''
              }
              disabled={props.disableComponent}
              placeholder={t('company_profile.placeholder.close')}
              format="hh:mm A"
              use12Hours
            />{' '}
          </Box>
          {hoursError.weekend && (
            <FormLabel className={classes.error}>
              {t('company_profile.error.hours_operation')}
            </FormLabel>
          )}
        </Box>
      </Box>
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
