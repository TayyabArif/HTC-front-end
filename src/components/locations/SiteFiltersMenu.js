import React, { useState, useEffect, useRef } from 'react'

/** Redux **/
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../store/locations'

/** Components **/
import { Menu, MenuItem, Typography, Box, Button, ThemeProvider } from '@mui/material'
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

/** Constants **/
import { mapStatusOptions } from '../../lib/Constants'

/** Styles **/
import { mapFiltersStyles } from '../../styles/classes/LocationsClasses'
import { muiThemeDateFilter, muiThemeHeaderDate, enableButtonStyle, disableButtonStyle, calendarTitleStyle } from '../../styles/mui_custom_theme'

const moment = require('moment')

export const SiteFiltersMenu = (props) => {
  const classes = mapFiltersStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationsStore = useSelector(state => state.locations)
  const [anchorStatus, setAnchorStatus] = useState(null)
  const isMenuStatusOpen = Boolean(anchorStatus)
  const [status, setStatus] = useState('all')
  const [anchorTrade, setAnchorTrade] = useState(null)
  const isMenuTradeOpen = Boolean(anchorTrade)
  const [trade, setTrade] = useState('all')
  const [anchorType, setAnchorType] = useState(null)
  const isMenuTypeOpen = Boolean(anchorType)
  const [type, setType] = useState('all')
  const [anchorService, setAnchorService] = useState(null)
  const isMenuServiceOpen = Boolean(anchorService)
  const [service, setService] = useState('all')

  // calendar
  const [rangeStart, setRangeStart] = useState('')
  const [fromStart, setFromStart] = useState(new Date())
  const [maxStart, setMaxStart] = useState(null)
  const [calendarFromStart, setCalendarFromStart] = useState(false)
  const [toStart, setToStart] = useState(null)
  const [calendarToStart, setCalendarToStart] = useState(false)
  const [rangeEnd, setRangeEnd] = useState('')
  const [fromEnd, setFromEnd] = useState(new Date())
  const [maxEnd, setMaxEnd] = useState(null)
  const [calendarFromEnd, setCalendarFromEnd] = useState(false)
  const [toEnd, setToEnd] = useState(null)
  const [calendarToEnd, setCalendarToEnd] = useState(false)
  const rootRefStart = useRef()
  const rootRefEnd = useRef()

  useEffect(() => {
    if (props.isFiltersMenuOpen) {
      setRangeStart(locationsStore.woListFilters.startDate)
      const splitStart = locationsStore.woListFilters.startDate.split(' - ')
      if (splitStart && splitStart.length === 2) {
        setFromStart(new Date(splitStart[0]))
        setToStart(new Date(splitStart[1]))
      }
      setRangeEnd(locationsStore.woListFilters.endDate)
      const splitEnd = locationsStore.woListFilters.endDate.split(' - ')
      if (splitEnd && splitEnd.length === 2) {
        setFromEnd(new Date(splitEnd[0]))
        setToEnd(new Date(splitEnd[1]))
      }
      setStatus(locationsStore.woListFilters.status)
      setTrade(locationsStore.woListFilters.trade)
      setType(locationsStore.woListFilters.type)
      setService(locationsStore.woListFilters.service)
    }
  }, [props.isFiltersMenuOpen])

  const handleStartOpen = (event) => {
    setCalendarFromStart(true)
  }

  const handleEndOpen = (event) => {
    setCalendarFromEnd(true)
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

  const handleTradeOpen = (event) => {
    setAnchorTrade(event.currentTarget)
  }
  const handleTradeClose = (event) => {
    setAnchorTrade(null)
  }
  const handleChangeTrade = (value) => {
    setTrade(value)
    setAnchorTrade(null)
  }

  const handleTypeOpen = (event) => {
    setAnchorType(event.currentTarget)
  }
  const handleTypeClose = (event) => {
    setAnchorType(null)
  }
  const handleChangeType = (value) => {
    setType(value)
    setAnchorType(null)
  }

  const handleServiceOpen = (event) => {
    setAnchorService(event.currentTarget)
  }
  const handleServiceClose = (event) => {
    setAnchorService(null)
  }
  const handleChangeService = (value) => {
    setService(value)
    setAnchorService(null)
  }

  const handleChange = (date, type) => {
    let formattedDate = ''
    if (type === 'start') {
      formattedDate =
      moment(new Date(fromStart)).format('YYYY/MM/DD') +
      ' - ' +
      moment(new Date(date)).format('YYYY/MM/DD')
      setRangeStart(formattedDate)
    } else {
      formattedDate =
      moment(new Date(fromEnd)).format('YYYY/MM/DD') +
      ' - ' +
      moment(new Date(date)).format('YYYY/MM/DD')
      setRangeEnd(formattedDate)
    }
  }

  const saveFilters = () => {
    if (rangeStart === '' &&
      rangeEnd === '' &&
      status === 'all' &&
      trade === 'all' &&
      type === 'all' &&
      service === 'all') {
      props.setInvisible(true)
    } else {
      props.setInvisible(false)
    }
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      startDate: rangeStart,
      endDate: rangeEnd,
      status,
      trade,
      type,
      service
    }))
    props.handleFiltersClose()
  }

  const handleReset = () => {
    setRangeStart('')
    setFromStart(new Date())
    setToStart(new Date())
    setRangeEnd('')
    setFromEnd(new Date())
    setToEnd(new Date())
    setStatus('all')
    setTrade('all')
    setType('all')
    setService('all')
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      startDate: '',
      endDate: '',
      status: 'all',
      trade: 'all',
      type: 'all',
      service: 'all'
    }))
    props.setInvisible(true)
    props.handleFiltersClose()
  }

  const isSaveDisabled = () => {
    let response = true
    if (locationsStore.woListFilters.startDate !== rangeStart) {
      response = false
    }
    if (locationsStore.woListFilters.endDate !== rangeEnd) {
      response = false
    }
    if (locationsStore.woListFilters.status !== status) {
      response = false
    }
    if (locationsStore.woListFilters.trade !== trade) {
      response = false
    }
    if (locationsStore.woListFilters.type !== type) {
      response = false
    }
    if (locationsStore.woListFilters.service !== service) {
      response = false
    }

    return response
  }

  const isResetDisabled = () => {
    let response = true
    if (locationsStore.woListFilters.startDate !== '') {
      response = false
    }
    if (locationsStore.woListFilters.endDate !== '') {
      response = false
    }
    if (locationsStore.woListFilters.status !== 'all') {
      response = false
    }
    if (locationsStore.woListFilters.trade !== 'all') {
      response = false
    }
    if (locationsStore.woListFilters.type !== 'all') {
      response = false
    }
    if (locationsStore.woListFilters.service !== 'all') {
      response = false
    }

    return response
  }

  return (<Menu
    open={props.isFiltersMenuOpen}
    onClose={props.handleFiltersClose}
    anchorEl={props.anchorFilters}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    classes={{ paper: classes.mainDropdown }}
  >
    <Box key="date_start" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.start_date')}</Typography></Box>
    <Box key="date_start_drop" className={classes.filterDrop}>
      <MapFiltersButton ref={rootRefStart} onClick={handleStartOpen}>
        <Typography className={classes.dateLabel} >{rangeStart !== '' ? rangeStart : t('locations.work_orders.sort_options.none')}</Typography>
        {calendarFromStart || calendarToStart ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
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
              value={fromStart}
              onChange={date => {
                setFromStart(date)
                setMaxStart(date)
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              PopperProps={{
                anchorEl: () => rootRefStart.current,
                placement: 'right-start'
              }}
              PaperProps={{
                style: {
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginLeft: '25px'
                }
              }}
              TextFieldComponent={() => null}
              open={calendarFromStart}
              onClose={() => {
                setCalendarFromStart(false)
                setCalendarToStart(false)
              }}
              onAccept={(date) => {
                setCalendarToStart(true)
                setTimeout(() => setCalendarFromStart(false), 100)
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
        <LocalizationProvider
            key="date-picker-start-to"
            dateAdapter={AdapterDayjs}
          >
            <ThemeProvider
              key="date-picker-start-to"
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
                value={toStart}
                onChange={date => {
                  setToStart(date)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                PopperProps={{
                  anchorEl: () => rootRefStart.current,
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
                open={calendarToStart}
                onOpen={() => setCalendarToStart(true)}
                onClose={() => {
                  setCalendarFromStart(false)
                  setCalendarToStart(false)
                }}
                onAccept={date => {
                  if (!calendarFromStart) {
                    setCalendarToStart(false)
                    handleChange(date, 'start')
                  }
                }}
                minDate={maxStart}
              />
            </ThemeProvider>
          </LocalizationProvider>
      </ThemeProvider>
    </Box>
    <Box key="date_end" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.end_date')}</Typography></Box>
    <Box key="date_end_drop" className={classes.filterDrop}>
      <MapFiltersButton ref={rootRefEnd} onClick={handleEndOpen}>
        <Typography className={classes.dateLabel} >{rangeEnd !== '' ? rangeEnd : t('locations.work_orders.sort_options.none')}</Typography>
        {calendarFromEnd || calendarToEnd ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <ThemeProvider theme={muiThemeDateFilter}>
        <LocalizationProvider
          key="date-picker-from-end"
          dateAdapter={AdapterDayjs}
        >
          <ThemeProvider
            key="date-picker-from-end"
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
              value={fromEnd}
              onChange={date => {
                setFromEnd(date)
                setMaxEnd(date)
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              PopperProps={{
                anchorEl: () => rootRefEnd.current,
                placement: 'right-start'
              }}
              PaperProps={{
                style: {
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  marginLeft: '25px'
                }
              }}
              TextFieldComponent={() => null}
              open={calendarFromEnd}
              onClose={() => {
                setCalendarFromEnd(false)
                setCalendarToEnd(false)
              }}
              onAccept={(date) => {
                setCalendarToEnd(true)
                setTimeout(() => setCalendarFromEnd(false), 100)
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
        <LocalizationProvider
            key="date-picker-end-to"
            dateAdapter={AdapterDayjs}
          >
            <ThemeProvider
              key="date-picker-end-to"
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
                value={toEnd}
                onChange={date => {
                  setToEnd(date)
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                PopperProps={{
                  anchorEl: () => rootRefEnd.current,
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
                open={calendarToEnd}
                onOpen={() => setCalendarToEnd(true)}
                onClose={() => {
                  setCalendarFromEnd(false)
                  setCalendarToEnd(false)
                }}
                onAccept={date => {
                  if (!calendarFromStart) {
                    setCalendarToEnd(false)
                    handleChange(date, 'end')
                  }
                }}
                minDate={maxEnd}
              />
            </ThemeProvider>
          </LocalizationProvider>
      </ThemeProvider>
    </Box>
    <Box key="status" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.status')}</Typography></Box>
    <Box key="status_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleStatusOpen}>
        <Typography className={classes.dateLabel} >{status === 'all' ? t('work_orders.wo_states.all_label') : t(`work_orders.wo_states.${status}`)}</Typography>
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
            {option.id === 'all' ? t('work_orders.wo_states.all_label') : t(`work_orders.wo_states.${option.id}`)}
          </Typography>
          {option.id === status && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box key="trade" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.trade')}</Typography></Box>
    <Box key="trade_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleTradeOpen}>
        <Typography className={classes.dateLabel} >{trade === 'all' ? t('work_orders.wo_states.all_label') : trade}</Typography>
        {isMenuTradeOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuTradeOpen}
        onClose={handleTradeClose}
        anchorEl={anchorTrade}
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
        {locationsStore.tradeOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeTrade(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id === 'all' ? t('work_orders.wo_states.all_label') : option.id}
          </Typography>
          {option.id === trade && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box key="type" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.type')}</Typography></Box>
    <Box key="type_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleTypeOpen}>
        <Typography className={classes.dateLabel} >{type === 'all' ? t('work_orders.wo_states.all_label') : type}</Typography>
        {isMenuTypeOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuTypeOpen}
        onClose={handleTypeClose}
        anchorEl={anchorType}
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
        {locationsStore.callTypeOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeType(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id === 'all' ? t('work_orders.wo_states.all_label') : option.id}
          </Typography>
          {option.id === type && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box key="service" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.service')}</Typography></Box>
    <Box key="service_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleServiceOpen}>
        <Typography className={classes.dateLabel} >{service === 'all' ? t('work_orders.wo_states.all_label') : service}</Typography>
        {isMenuServiceOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuServiceOpen}
        onClose={handleServiceClose}
        anchorEl={anchorService}
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
        {locationsStore.serviceOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeService(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id === 'all' ? t('work_orders.wo_states.all_label') : option.id}
          </Typography>
          {option.id === service && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box width="100%" display="flex">
      <Button
        disabled={isResetDisabled()}
        variant="outlined"
        size="small"
        color="primary"
        style={{ ...(isResetDisabled() ? disableButtonStyle : enableButtonStyle), margin: '10px 0px 0px 8px', width: '80px' }}
        onClick={handleReset}
      >
        {t('locations.work_orders.reset')}
      </Button>
      <Button
        disabled={isSaveDisabled()}
        variant="outlined"
        size="small"
        color="primary"
        style={{ ...(isSaveDisabled() ? disableButtonStyle : enableButtonStyle), margin: '10px 8px 0px auto' }}
        onClick={saveFilters}
      >
        {t('account_settings.form.save')}
      </Button>
    </Box>
  </Menu>)
}
