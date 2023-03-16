/* eslint-disable prefer-const */
import React, { useState, useEffect, useRef } from 'react'
// import DateFnsUtils from '@date-io/date-fns'
import { useTranslation } from 'react-i18next'
// import AdapterDateFns from '@date-io/date-fns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DesktopDatePicker as DatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers'
import {
  FormControl,
  OutlinedInput,
  ThemeProvider,
  TextField
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {
  calendarTitleStyle,
  muiThemeDateFilter,
  muiThemeHeaderDate
} from '../../styles/mui_custom_theme'
import { dateFilterStyles } from '../../styles/classes/WorkOrdersClasses'

const moment = require('moment')

export const DateFilter = props => {
  const [selectedDate, setSelectedDate] = useState('')
  const [openCalendar, setCalendar] = useState(false)

  // Rage Variables
  const [selectedDateFrom, setDateFrom] = useState(new Date())
  const [maxDateFrom, setMaxDateFrom] = useState(null)
  const [openCalendarFrom, setCalendarFrom] = useState(false)
  const [selectedDateTo, setDateTo] = useState(new Date())
  const [openCalendarTo, setCalendarTo] = useState(false)

  const rootRef = useRef()
  const classes = dateFilterStyles()
  const { t } = useTranslation()

  const handleChange = date => {
    let formattedDate = ''
    if (props.range) {
      formattedDate =
        moment(new Date(selectedDateFrom)).format('YYYY/MM/DD') +
        ' - ' +
        moment(new Date(date)).format('YYYY/MM/DD')
      setSelectedDate(formattedDate)
      props.setValues(prevState => ({
        ...prevState,
        [props.id]: moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss Z').toLowerCase()
      }))
    } else {
      formattedDate = moment(new Date(date)).format('MM/DD/yyyy')
      setSelectedDate(formattedDate)
    }
    props.setValues(prevState => ({
      ...prevState,
      [props.id]: formattedDate
    }))
  }

  const handleClean = (event) => {
    event.stopPropagation()
    setSelectedDate('')
    props.setValues(prevState => ({
      ...prevState,
      [props.id]: ''
    }))
  }

  useEffect(() => {
    if (props.values[props.id] === '') {
      setSelectedDate('')
    }
  }, [props.values])

  const disablePastDates = date => {
    return !(date >= selectedDateFrom)
  }

  const setMaxDate = date => {
    setMaxDateFrom(moment(date).add(1, 'month'))
  }

  return (
    <div>
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          data-testid={props.testid}
          id="component-outlined"
          ref={rootRef}
          key={props.id}
          value={selectedDate}
          placeholder={t('general.labels.select')}
          onClick={() => setCalendarFrom(true)}
          classes={{
            root: props.type === 1 ? classes.mainInput1 : classes.mainInput2
          }}
          autoComplete="off"
          endAdornment={
            selectedDate.length > 0
              ? (
                <FontAwesomeIcon icon={faTimes} onClick={handleClean} />
              )
              : (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => setCalendarFrom(true)}
                />
              )
          }
        />
      </FormControl>
      {props.range
        ? (
          <ThemeProvider theme={muiThemeDateFilter}>
            <LocalizationProvider
              key="date-picker-dialog-from"
              dateAdapter={AdapterDayjs}
            >
              <ThemeProvider
                key="date-picker-dialog-from"
                theme={muiThemeHeaderDate}
              >
                <DatePicker
                  renderInput={() => {} }
                  disableToolbar={false}
                  ToolbarComponent={() => (
                    <div style={calendarTitleStyle}>From:</div>
                  )}
                  InputProps={{ className: classes.picker }}
                  format="MM/dd/yyyy"
                  margin="normal"
                  variant="inline"
                  id="date-picker-dialog-from"
                  key="date-picker-dialog-from"
                  value={selectedDateFrom}
                  onChange={date => {
                    setDateFrom(date)
                    setMaxDate(date)
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  PopperProps={{
                    anchorEl: () => rootRef.current,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    PaperProps: {
                      style: {
                        backgroundColor: 'white',
                        borderRadius: '8px'
                      }
                    }
                  }}
                  TextFieldComponent={() => null}
                  open={openCalendarFrom}
                  onOpen={() => setCalendarFrom(true)}
                  onClose={() => {
                    setCalendarTo(false)
                    setCalendarFrom(false)
                  }}
                  onAccept={() => {
                    setCalendarTo(true)
                    setTimeout(() => setCalendarFrom(false), 100)
                  }}
                />
              </ThemeProvider>
            </LocalizationProvider>
            <LocalizationProvider
              key="date-picker-dialog-to"
              dateAdapter={AdapterDayjs}
            >
              <ThemeProvider
                key="date-picker-dialog-to"
                theme={muiThemeHeaderDate}
              >
                <DatePicker
                  disableOpenPicker = {true}
                  renderInput={() => {} }
                  disableToolbar={false}
                  ToolbarComponent={() => (
                    <div style={calendarTitleStyle}>To:</div>
                  )}
                  format="MM/dd/yyyy"
                  margin="normal"
                  variant="inline"
                  id="date-picker-dialog-to"
                  key="date-picker-dialog-to"
                  value={selectedDateTo}
                  onChange={date => {
                    setDateTo(date)
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  PopperProps={{
                    anchorEl: () => rootRef.current,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    PaperProps: {
                      style: {
                        backgroundColor: 'white',
                        borderRadius: '8px'
                      }
                    }
                  }}
                  TextFieldComponent={() => null}
                  open={openCalendarTo}
                  onOpen={() => setCalendarTo(true)}
                  onClose={() => {
                    setCalendarTo(false)
                    setCalendarFrom(false)
                  }}
                  onAccept={date => {
                    if (!openCalendarFrom) {
                      setCalendarTo(false)
                      handleChange(date)
                    }
                  }}
                  shouldDisableDate={disablePastDates}
                  maxDate={maxDateFrom}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </ThemeProvider>
        )
        : (
          <ThemeProvider theme={muiThemeDateFilter}>
            <DatePicker
              renderInput={(params) => <TextField {...params} />}
              disableToolbar={true}
              format="MM/dd/yyyy"
              margin="normal"
              variant="inline"
              id="date-picker-inline"
              value={selectedDate}
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              PopoverProps={{
                anchorEl: () => rootRef.current,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                PaperProps: {
                  style: {
                    backgroundColor: 'white',
                    borderRadius: '8px'
                  }
                },
                'data-testid': props.testid + '_popover'
              }}
              DialogProps={{ className: classes.datePicker }}
              TextFieldComponent={() => null}
              open={openCalendar}
              onOpen={event => {
                event.preventDefault()
                event.target.focus({ preventScroll: true })
                setCalendar(true)
              }}
              onClose={() => {
                setCalendar(false)
              }}
              onAccept={() => setCalendar(false)}
              onFocus={event => {
                event.preventDefault()
                event.target.focus({ preventScroll: false })
              }}
            />
          </ThemeProvider>
        )}
    </div>
  )
}
