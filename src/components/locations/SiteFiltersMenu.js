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
import { muiThemeDateFilter, muiThemeHeaderDate, enableButtonStyle, disableButtonStyle } from '../../styles/mui_custom_theme'

const moment = require('moment')

// hardcoded options
const mapTradeOptions = [
  {
    id: 'All'
  },
  {
    id: 'Hvac'
  },
  {
    id: 'Land'
  },
  {
    id: 'Special'
  },
  {
    id: 'Snow'
  },
  {
    id: 'Irrigation'
  },
  {
    id: 'Sweep'
  },
  {
    id: 'Pre-season Inspection'
  },
  {
    id: 'Atmosphere Inspection'
  }
]
const mapTypeOptions = [
  {
    id: 'All'
  },
  {
    id: 'Maintenance'
  },
  {
    id: 'Enhancement'
  },
  {
    id: 'Seasonal'
  },
  {
    id: 'Complaint'
  }
]
const mapServiceOptions = [
  {
    id: 'All'
  },
  {
    id: 'Snow Removal'
  },
  {
    id: 'Pruning'
  },
  {
    id: 'Winterization'
  },
  {
    id: 'Penguin Boarding'
  },
  {
    id: 'Landscape Maintenance'
  },
  {
    id: 'Wet Check'
  },
  {
    id: 'Plumbing'
  }
]

export const SiteFiltersMenu = (props) => {
  const classes = mapFiltersStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationsStore = useSelector(state => state.locations)
  const [anchorStart, setAnchorStart] = useState(null)
  const isMenuStartOpen = Boolean(anchorStart)
  const [anchorEnd, setAnchorEnd] = useState(null)
  const isMenuEndOpen = Boolean(anchorEnd)
  const [anchorStatus, setAnchorStatus] = useState(null)
  const isMenuStatusOpen = Boolean(anchorStatus)
  const [status, setStatus] = useState('all')
  const [anchorTrade, setAnchorTrade] = useState(null)
  const isMenuTradeOpen = Boolean(anchorTrade)
  const [trade, setTrade] = useState('All')
  const [anchorType, setAnchorType] = useState(null)
  const isMenuTypeOpen = Boolean(anchorType)
  const [type, setType] = useState('All')
  const [anchorService, setAnchorService] = useState(null)
  const isMenuServiceOpen = Boolean(anchorService)
  const [service, setService] = useState('All')

  // calendar
  const [startLabel, setStartLabel] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endLabel, setEndLabel] = useState('')
  const [endDate, setEndDate] = useState(new Date())
  const rootRefStart = useRef()
  const rootRefEnd = useRef()

  useEffect(() => {
    if (props.isFiltersMenuOpen) {
      setStartLabel(locationsStore.woListFilters.startDate)
      setStartDate(new Date(locationsStore.woListFilters.startDate))
      setEndLabel(locationsStore.woListFilters.endDate)
      setEndDate(new Date(locationsStore.woListFilters.endDate))
      setStatus(locationsStore.woListFilters.status)
      setTrade(locationsStore.woListFilters.trade)
      setType(locationsStore.woListFilters.type)
      setService(locationsStore.woListFilters.service)
    }
  }, [props.isFiltersMenuOpen])

  const handleStartOpen = (event) => {
    setAnchorStart(event.currentTarget)
  }

  const handleEndOpen = (event) => {
    setAnchorEnd(event.currentTarget)
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
    formattedDate = moment(new Date(date)).format('YYYY/MM/DD')
    if (type === 'start') {
      setStartLabel(formattedDate)
    } else {
      setEndLabel(formattedDate)
    }
  }

  const saveFilters = () => {
    if (startLabel === '' &&
      endLabel === '' &&
      status === 'all' &&
      trade === 'All Trades' &&
      type === 'All Types' &&
      service === 'All Services') {
      props.setInvisible(true)
    } else {
      props.setInvisible(false)
    }
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      startDate: startLabel,
      endDate: endLabel,
      status,
      trade,
      type,
      service
    }))
    props.handleFiltersClose()
  }

  const handleReset = () => {
    setStartLabel('')
    setStartDate(new Date())
    setEndLabel('')
    setEndDate(new Date())
    setStatus('all')
    setTrade('All')
    setType('All')
    setService('All')
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      startDate: '',
      endDate: '',
      status: 'all',
      trade: 'All',
      type: 'All',
      service: 'All'
    }))
    props.setInvisible(true)
    props.handleFiltersClose()
  }

  const isSaveDisabled = () => {
    let response = true
    if (locationsStore.woListFilters.startDate !== startLabel) {
      response = false
    }
    if (locationsStore.woListFilters.endDate !== endLabel) {
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
    if (locationsStore.woListFilters.trade !== 'All') {
      response = false
    }
    if (locationsStore.woListFilters.type !== 'All') {
      response = false
    }
    if (locationsStore.woListFilters.service !== 'All') {
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
        <Typography className={classes.dateLabel} >{startLabel !== '' ? startLabel : t('locations.work_orders.sort_options.none')}</Typography>
        {isMenuStartOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
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
              InputProps={{ className: classes.picker }}
              format="MM/dd/yyyy"
              margin="normal"
              variant="inline"
              id="date-picker-dialog-from"
              key="date-picker-dialog-from"
              value={startDate}
              onChange={date => {
                setStartDate(date)
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
              open={isMenuStartOpen}
              onClose={() => {
                setAnchorStart(null)
              }}
              onAccept={(date) => {
                handleChange(date, 'start')
                setAnchorStart(null)
              }}
            />
          </ThemeProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
    <Box key="date_end" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.end_date')}</Typography></Box>
    <Box key="date_end_drop" className={classes.filterDrop}>
      <MapFiltersButton ref={rootRefEnd} onClick={handleEndOpen}>
        <Typography className={classes.dateLabel} >{endLabel !== '' ? endLabel : t('locations.work_orders.sort_options.none')}</Typography>
        {isMenuEndOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
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
              InputProps={{ className: classes.picker }}
              format="MM/dd/yyyy"
              margin="normal"
              variant="inline"
              id="date-picker-dialog-from"
              key="date-picker-dialog-from"
              value={endDate}
              onChange={date => {
                setEndDate(date)
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
              open={isMenuEndOpen}
              onClose={() => {
                setAnchorEnd(null)
              }}
              onAccept={(date) => {
                handleChange(date, 'end')
                setAnchorStart(null)
              }}
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
        <Typography className={classes.dateLabel} >{trade}</Typography>
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
        {mapTradeOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeTrade(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id}
          </Typography>
          {option.id === trade && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box key="type" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.type')}</Typography></Box>
    <Box key="type_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleTypeOpen}>
        <Typography className={classes.dateLabel} >{type}</Typography>
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
        {mapTypeOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeType(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id}
          </Typography>
          {option.id === type && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box key="service" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.service')}</Typography></Box>
    <Box key="service_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleServiceOpen}>
        <Typography className={classes.dateLabel} >{service}</Typography>
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
        {mapServiceOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeService(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {option.id}
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
