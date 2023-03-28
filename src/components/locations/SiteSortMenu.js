import React, { useState, useEffect } from 'react'

// Components
import { Menu, MenuItem, Typography, Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'

// Constants
import { woSortOptions } from '../../lib/Constants'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../store/locations'

// Styles
import { mapFiltersStyles } from '../../styles/classes/LocationsClasses'
import { enableButtonStyle, disableButtonStyle } from '../../styles/mui_custom_theme'

export const SiteSortMenu = (props) => {
  const classes = mapFiltersStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const locationsStore = useSelector(state => state.locations)
  const [anchorSelector, setAnchorSelector] = useState(null)
  const isMenuSelectorOpen = Boolean(anchorSelector)
  const [sortBy, setSortBy] = useState('none')

  useEffect(() => {
    if (props.isSortMenuOpen) {
      setSortBy(locationsStore.woListFilters.sortBy)
    }
  }, [props.isSortMenuOpen])

  const handleSelectorOpen = (event) => {
    setAnchorSelector(event.currentTarget)
  }
  const handleSelectorClose = (event) => {
    setAnchorSelector(null)
  }
  const handleChangeSelector = (value) => {
    setSortBy(value)
    setAnchorSelector(null)
  }

  const saveFilters = () => {
    if (sortBy === 'none') {
      props.setInvisible(true)
    } else {
      props.setInvisible(false)
    }
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      sortBy: sortBy
    }))
    props.handleSortClose()
  }

  const handleReset = () => {
    setSortBy('none')
    dispatch(locationsActions.setWoListFilters({
      ...locationsStore.woListFilters,
      sortBy: 'none'
    }))
    props.setInvisible(true)
    props.handleSortClose()
  }

  return (<Menu
    open={props.isSortMenuOpen}
    onClose={props.handleSortClose}
    anchorEl={props.anchorSort}
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
    <Box key="sort" className={classes.filterLabel}><Typography className={classes.menuTitle}>{t('locations.work_orders.sort_by')}</Typography></Box>
    <Box key="sort_drop" className={classes.filterDrop}>
      <MapFiltersButton onClick={handleSelectorOpen}>
        <Typography className={classes.dateLabel} >{t(`locations.work_orders.sort_options.${sortBy}`)}</Typography>
        {isMenuSelectorOpen ? <ArrowRightTwoTone className={classes.arrowIcon} /> : <ArrowDropDownTwoTone className={classes.arrowIcon} />}
      </MapFiltersButton>
      <Menu
        open={isMenuSelectorOpen}
        onClose={handleSelectorClose}
        anchorEl={anchorSelector}
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
        {woSortOptions.map(option => <MenuItem key={option.id} onClick={() => handleChangeSelector(option.id)} className={classes.menuItem}>
          <Typography className={classes.menuLabel}>
            {t(`locations.work_orders.sort_options.${option.id}`)}
          </Typography>
          {option.id === sortBy && <CheckIcon className={classes.checkIcon} />}
        </MenuItem>)}
      </Menu>
    </Box>
    <Box width="100%" display="flex">
      <Button
        disabled={locationsStore.woListFilters.sortBy === 'none'}
        variant="outlined"
        size="small"
        color="primary"
        style={{
          ...(locationsStore.woListFilters.sortBy === 'none' ? disableButtonStyle : enableButtonStyle),
          margin: '10px 0px 0px 8px',
          width: '80px'
        }}
        onClick={handleReset}
      >
        {t('locations.work_orders.reset')}
      </Button>
      <Button
        disabled={locationsStore.woListFilters.sortBy === sortBy}
        variant="outlined"
        size="small"
        color="primary"
        style={{ ...(locationsStore.woListFilters.sortBy === sortBy ? disableButtonStyle : enableButtonStyle), margin: '10px 8px 0px auto' }}
        onClick={saveFilters}
      >
        {t('account_settings.form.save')}
      </Button>
    </Box>
  </Menu>)
}
