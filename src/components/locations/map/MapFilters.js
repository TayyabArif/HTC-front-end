import React, { useState, useRef, useEffect } from 'react'

// Components
import { Menu, MenuItem, Typography, Box, Button, ThemeProvider } from '@mui/material'
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Constants
import { mapDateRangeOptions, mapStatusOptions } from '../../../lib/Constants'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'

// Styles
import { mapFiltersStyles } from '../../../styles/classes/LocationsClasses'
import { calendarTitleStyle, muiThemeDateFilter, muiThemeHeaderDate, enableButtonStyle, disableButtonStyle } from '../../../styles/mui_custom_theme'

const moment = require('moment')

// hardcoded options
const mapStateOptions = [
  {
    id: 'All States'
  },
  {
    id: 'AL'
  },
  {
    id: 'AK'
  },
  {
    id: 'AR'
  },
  {
    id: 'AZ'
  },
  {
    id: 'CA'
  },
  {
    id: 'CO'
  },
  {
    id: 'CT'
  },
  {
    id: 'DE'
  }
]
const mapCityOptions = [
  {
    id: 'All Cities'
  },
  {
    id: 'Abilene'
  },
  {
    id: 'Addison'
  },
  {
    id: 'Albuquerque'
  },
  {
    id: 'Alexandria'
  },
  {
    id: 'Allen'
  },
  {
    id: 'Amarillo'
  },
  {
    id: 'Ames'
  },
  {
    id: 'Anchorage'
  }
]

export const MapFilters = (props) => {
  const classes = mapFiltersStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationsFilters = useSelector(state => state.locations.locationFilters)
  const [dateRange, setDateRange] = useState('today')
  const [anchorDates, setAnchorDates] = useState(null)
  const isMenuDatesOpen = Boolean(anchorDates)
  const [anchorStatus, setAnchorStatus] = useState(null)
  const isMenuStatusOpen = Boolean(anchorStatus)
  const [status, setStatus] = useState('all')
  const [anchorState, setAnchorState] = useState(null)
  const isMenuStateOpen = Boolean(anchorState)
  const [state, setState] = useState('All States')
  const [anchorCity, setAnchorCity] = useState(null)
  const isMenuCityOpen = Boolean(anchorCity)
  const [city, setCity] = useState('All Cities')

  // calendar
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDateFrom, setDateFrom] = useState(new Date())
  const [maxDateFrom, setMaxDateFrom] = useState(null)
  const [openCalendarFrom, setCalendarFrom] = useState(false)
  const [selectedDateTo, setDateTo] = useState(new Date())
  const [openCalendarTo, setCalendarTo] = useState(false)
  const rootRef = useRef()

  useEffect(() => {
    if (props.isMenuFiltersOpen) {
      setDateRange(locationsFilters.dateRange)
      setStatus(locationsFilters.status)
      setState(locationsFilters.state)
      setCity(locationsFilters.city)
    }
  }, [props.isMenuFiltersOpen])

  const handleDateOpen = (event) => {
    setAnchorDates(event.currentTarget)
  }
  const handleDateClose = (event) => {
    setAnchorDates(null)
  }
  const handleChangeDate = (value) => {
    setDateRange(value)
    if (value === 'custom') {
      setCalendarFrom(true)
    } else {
      setAnchorDates(null)
    }
  }

  const handleStatusOpen = (event) => {
    setAnchorStatus(event.currentTarget)
  }
  const handleStatusClose = (event) => {
    setAnchorStatus(null)
  }
  const handleChangeStatus = (value) => {
    setStatus(value)
    setAnchorStatus(null)
  }

  const handleStateOpen = (event) => {
    setAnchorState(event.currentTarget)
  }
  const handleStateClose = (event) => {
    setAnchorState(null)
  }
  const handleChangeState = (value) => {
    setState(value)
    setAnchorState(null)
  }

  const handleCityOpen = (event) => {
    setAnchorCity(event.currentTarget)
  }
  const handleCityClose = (event) => {
    setAnchorCity(null)
  }
  const handleChangeCity = (value) => {
    setCity(value)
    setAnchorCity(null)
  }

  const setMaxDate = date => {
    setMaxDateFrom(moment(date).add(1, 'month'))
  }

  const handleChange = date => {
    let formattedDate = ''
    formattedDate =
      moment(new Date(selectedDateFrom)).format('YYYY/MM/DD') +
      ' : ' +
      moment(new Date(date)).format('YYYY/MM/DD')
    setSelectedDate(formattedDate)
  }

  const disablePastDates = date => {
    return !(date >= selectedDateFrom)
  }

  const saveFilters = () => {
    if (dateRange === 'today' && status === 'all' && state === 'All States' && city === 'All Cities') {
      props.setInvisible(true)
    } else {
      props.setInvisible(false)
    }
    dispatch(locationsActions.setLocationFilters({
      dateRange,
      status,
      state,
      city
    }))
    props.handleFiltersClose()
  }

  const handleReset = () => {
    setSelectedDate('')
    setDateRange('today')
    setDateFrom(new Date())
    setMaxDateFrom(null)
    setDateTo(new Date())
    setStatus('all')
    setState('All States')
    setCity('All Cities')
    dispatch(locationsActions.setLocationFilters({
      dateRange: 'today',
      status: 'all',
      state: 'All States',
      city: 'All Cities'
    }))
    props.setInvisible(true)
    props.handleFiltersClose()
  }

  return (<Menu
    open={props.isMenuFiltersOpen}
    onClose={props.handleFiltersClose}
    anchorEl={props.anchorFilters}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    classes={{ paper: classes.mainDropdown }}
  >
    <Box padding={1} key="date_range" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.date_range')}</Typography></Box>
    <Box padding={1} key="date_range_drop" className={classes.mainItem}>
      <MapFiltersButton onClick={handleDateOpen}>
        <Typography className={classes.dateLabel} >{dateRange !== 'custom' ? t(`locations.date_ranges.${dateRange}`) : selectedDate}</Typography>
        {isMenuDatesOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuDatesOpen}
        onClose={handleDateClose}
        anchorEl={anchorDates}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        classes={{ root: classes.dropdowns, paper: classes.muiPaper }}
      >
        {mapDateRangeOptions.map(option => <MenuItem ref={option.id === 'custom' ? rootRef : null} key={option.id} onClick={() => handleChangeDate(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {t(`locations.date_ranges.${option.id}`)}
          </Typography>
          {option.id === dateRange && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
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
                renderInput={() => { }}
                disableToolbar={false}
                ToolbarComponent={() => (
                  <div style={calendarTitleStyle}>{t('locations.map.from')}:</div>
                )}
                showToolbar={true}
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
                  placement: 'right-start'
                }}
                autoFocus={false}
                PaperProps={{
                  style: {
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    marginLeft: '6px'
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
                disableOpenPicker={true}
                renderInput={() => { }}
                disableToolbar={false}
                ToolbarComponent={() => (
                  <div style={calendarTitleStyle}>{t('locations.map.to')}:</div>
                )}
                showToolbar={true}
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
                  placement: 'right-start'
                }}
                PaperProps={{
                  style: {
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    marginLeft: '6px'
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
      </Menu>
    </Box>
    <Box padding={1} key="status" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.status')}</Typography></Box>
    <Box padding={1} key="status_drop" className={classes.mainItem}>
      <MapFiltersButton onClick={handleStatusOpen}>
        <Typography className={classes.dateLabel} >{t(`work_orders.wo_states.${status}`)}</Typography>
        {isMenuStatusOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuStatusOpen}
        onClose={handleStatusClose}
        anchorEl={anchorStatus}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        classes={{ root: classes.dropdowns, paper: classes.muiPaper }}
      >
        {mapStatusOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeStatus(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {t(`work_orders.wo_states.${option.id}`)}
          </Typography>
          {option.id === status && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box padding={1} key="state" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.state')}</Typography></Box>
    <Box padding={1} key="statate_drop" className={classes.mainItem}>
      <MapFiltersButton onClick={handleStateOpen}>
        <Typography className={classes.dateLabel} >{state}</Typography>
        {isMenuStateOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuStateOpen}
        onClose={handleStateClose}
        anchorEl={anchorState}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        classes={{ root: classes.dropdowns, paper: classes.muiPaper }}
      >
        {mapStateOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeState(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id}
          </Typography>
          {option.id === state && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box padding={1} key="city" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.city')}</Typography></Box>
    <Box padding={1} key="city_drop" className={classes.mainItem}>
      <MapFiltersButton onClick={handleCityOpen}>
        <Typography className={classes.dateLabel} >{city}</Typography>
        {isMenuCityOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuCityOpen}
        onClose={handleCityClose}
        anchorEl={anchorCity}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        classes={{ root: classes.dropdowns, paper: classes.muiPaper }}
      >
        {mapCityOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeCity(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id}
          </Typography>
          {option.id === city && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box width="100%" display="flex">
    <Button
        variant="outlined"
        size="small"
        color="primary"
        style={{ ...disableButtonStyle, margin: '10px 0px 0px 8px', width: '80px', color: '#333333' }}
        onClick={handleReset}
      >
        {t('locations.work_orders.reset')}
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        style={{ ...enableButtonStyle, margin: '10px 8px 0px auto', width: '100px' }}
        onClick={saveFilters}
      >
        {t('account_settings.form.save')}
      </Button>
    </Box>
  </Menu>)
}
