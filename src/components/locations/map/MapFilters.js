import React, { useState } from 'react'
import { Menu, MenuItem, Typography, Box } from '@mui/material'
import { mapFiltersStyles } from '../../../styles/classes/LocationsClasses'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'
import { mapDateRangeOptions, mapStatusOptions } from '../../../lib/Constants'

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
  const [anchorDates, setAnchorDates] = useState(null)
  const isMenuDatesOpen = Boolean(anchorDates)
  const [dateRange, setDateRange] = useState('today')
  const [anchorStatus, setAnchorStatus] = useState(null)
  const isMenuStatusOpen = Boolean(anchorStatus)
  const [status, setStatus] = useState('all')
  const [anchorState, setAnchorState] = useState(null)
  const isMenuStateOpen = Boolean(anchorState)
  const [state, setState] = useState('All States')
  const [anchorCity, setAnchorCity] = useState(null)
  const isMenuCityOpen = Boolean(anchorCity)
  const [city, setCity] = useState('All Cities')

  const handleDateOpen = (event) => {
    setAnchorDates(event.currentTarget)
  }
  const handleDateClose = (event) => {
    setAnchorDates(null)
  }
  const handleChangeDate = (value) => {
    setDateRange(value)
    setAnchorDates(null)
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
        className={classes.mainDropdown}
    >
        <Box padding={1} key="date_range" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.date_range')}</Typography></Box>
        <Box padding={1} key="date_range_drop" className={classes.mainItem}>
            <MapFiltersButton onClick={handleDateOpen}>
                <Typography className={classes.dateLabel} >{t(`locations.date_ranges.${dateRange}`)}</Typography>
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
                {mapDateRangeOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeDate(option.id)} className={classes.menuItem}>
                    <Typography className={classes.menuLabel}>
                        {t(`locations.date_ranges.${option.id}`)}
                    </Typography>
                    {option.id === dateRange && <CheckIcon className={classes.checkIcon}/>}
                </MenuItem>)}
            </Menu>
        </Box>
        <Box padding={1} key="status" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.map.status')}</Typography></Box>
        <Box padding={1} key="status_drop" className={classes.mainItem}>
            <MapFiltersButton onClick={handleStatusOpen}>
                <Typography className={classes.dateLabel} >{t(`locations.wo_status.${status}`)}</Typography>
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
                    {t(`locations.wo_status.${option.id}`)}
                  </Typography>
                  {option.id === status && <CheckIcon className={classes.checkIcon}/>}
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
                    {option.id === state && <CheckIcon className={classes.checkIcon}/>}
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
                    {option.id === city && <CheckIcon className={classes.checkIcon}/>}
                  </MenuItem>)}
            </Menu>
        </Box>
    </Menu>)
}
