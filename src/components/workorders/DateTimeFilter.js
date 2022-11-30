/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormControl } from '@mui/material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import { DatePicker, Space, TimePicker } from 'antd'
import 'antd/dist/antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  mainInput1: {
    ...theme.filtersClasses.mainInput1,
    width: '313px',
    '& .ant-picker-input': {
      boxShadow: 'none',
      '& input': {
        color: theme.colors.basicDisabledButtonColor,
        cursor: 'pointer',
        '&::placeholder': {
          color: theme.colors.iconBlue,
          opacity: 1
        }
      }
    },
    cursor: 'pointer',
    boxShadow: 'none',
    zIndex: 9
  },
  mainInput2: {
    ...theme.filtersClasses.mainInput2,
    width: '313px',
    '& .ant-picker-input': {
      boxShadow: 'none',
      '& input': {
        color: theme.colors.basicDisabledButtonColor,
        cursor: 'pointer',
        '&::placeholder': {
          color: theme.colors.iconBlue,
          opacity: 1
        }
      }
    },
    cursor: 'pointer',
    boxShadow: 'none',
    zIndex: 9
  },
  container: {
    width: '313px'
  },
  hidden: {
    border: 'none',
    zIndex: 1,
    marginTop: '-32px'
  },
  overlay: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  }
}))

export const DateTimeFilter = props => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [openTime, setOpenTime] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    setSelectedDate(new Date(props.values))
  }, [props.values])

  const handleChange = (date, update = false) => {
    setSelectedDate(date ? date.format('MM/DD/yyyy hh:mm A') : null)
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
