import React, { useState, useEffect, useRef } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../store/locations'

// Components
import { Menu, MenuItem, Typography, Box, Button, ThemeProvider } from '@mui/material'
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Constants
import { mapStatusOptions } from '../../lib/Constants'

// Redux
// import { useDispatch, useSelector } from 'react-redux'
// import { locationsActions } from '../../store/locations'

// Styles
import { mapFiltersStyles } from '../../styles/classes/LocationsClasses'
import { muiThemeDateFilter, muiThemeHeaderDate, enableButtonStyle, disableButtonStyle } from '../../styles/mui_custom_theme'

const moment = require('moment')

// hardcoded options
const mapTradeOptions = [
  {
    id: 'All Trades'
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
    id: 'All Types'
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
    id: 'All Services'
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
  const [trade, setTrade] = useState('All Trades')
  const [anchorType, setAnchorType] = useState(null)
  const isMenuTypeOpen = Boolean(anchorType)
  const [type, setType] = useState('All Types')
  const [anchorService, setAnchorService] = useState(null)
  const isMenuServiceOpen = Boolean(anchorService)
  const [service, setService] = useState('All Services')

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
    if (startLabel === '' && endLabel === '' && status === 'all' && trade === 'All Trades' && type === 'All Types' && service === 'All Services') {
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
    setTrade('All Trades')
    setType('All Types')
    setService('All Services')
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      startDate: '',
      endDate: '',
      status: 'all',
      trade: 'All Trades',
      type: 'All Types',
      service: 'All Services'
    }))
    props.setInvisible(true)
    props.handleFiltersClose()
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
    <Box padding={1} key="date_start" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.start_date')}</Typography></Box>
    <Box padding={1} key="date_start_drop" className={classes.mainItem}>
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
    <Box padding={1} key="date_end" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.end_date')}</Typography></Box>
    <Box padding={1} key="date_end_drop" className={classes.mainItem}>
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
    <Box padding={1} key="status" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.status')}</Typography></Box>
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
    <Box padding={1} key="trade" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.trade')}</Typography></Box>
    <Box padding={1} key="trade_drop" className={classes.mainItem}>
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
    <Box padding={1} key="type" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.type')}</Typography></Box>
    <Box padding={1} key="type_drop" className={classes.mainItem}>
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
    <Box padding={1} key="service" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.service')}</Typography></Box>
    <Box padding={1} key="service_drop" className={classes.mainItem}>
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
        style={{ ...enableButtonStyle, margin: '10px 8px 0px auto' }}
        onClick={saveFilters}
      >
        {t('account_settings.form.save')}
      </Button>
    </Box>
  </Menu>)
}
