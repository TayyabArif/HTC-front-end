/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormControl } from '@mui/material'
import moment from 'moment'
import { DatePicker, Space, TimePicker } from 'antd'
import 'antd/dist/antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { dateTimeFilterStyles } from '../../styles/classes/WorkOrdersClasses'

export const DateTimeFilter = props => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [openTime, setOpenTime] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const classes = dateTimeFilterStyles()
  const { t } = useTranslation()

  useEffect(() => {
    setSelectedDate(new Date(props.values))
  }, [props.values])

  const handleChange = (date, update = false) => {
    setSelectedDate(date ? date.format(t('general.date_formats.basic')) : null)
    if (date === null) props.setValues(null)
    if (update) props.setValues(date.valueOf())
    setOpenTime(!openTime)
  }

  useEffect(() => {
    if (props.values === '') {
      setSelectedDate('')
    }
  }, [props.values])

  const disabledDate = current => {
    // Can not select days before today and today
    return current && current <= moment().subtract(1, 'days').endOf('day')
  }

  return (
    <Space direction="horizontal" size={12}>
      <FormControl variant="outlined" fullWidth className={classes.container}>
        <DatePicker
          format="MM/DD/yyyy hh:mm A"
          disabledDate={disabledDate}
          popupStyle={{ zIndex: 1300 }}
          className={props.type === 1 ? classes.mainInput1 : classes.mainInput2}
          placement="bottomRight"
          value={selectedDate ? moment(selectedDate) : undefined}
          onChange={date => handleChange(date, false)}
          placeholder={t('general.labels.select')}
          style={{ cursor: 'pointer' }}
          suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
          showNow={false}
          onOpenChange={open => {
            setCalendarOpen(open)
            setOpenTime(!open)
          }}
          inputReadOnly
        />
        <TimePicker
          format="MM/DD/yyyy hh:mm A"
          use12Hours
          popupStyle={{ zIndex: 1300 }}
          className={classes.hidden}
          open={openTime}
          value={selectedDate ? moment(selectedDate) : undefined}
          onOk={date => handleChange(date, true)}
          onBlur={() => setOpenTime(false)}
          showNow={false}
          placement="bottomRight"
        />
        {openTime && calendarOpen && <div className={classes.overlay} />}
      </FormControl>
    </Space>
  )
}
