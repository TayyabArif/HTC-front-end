import React, { useState } from 'react'

// Components
import { Menu, MenuItem, Typography, Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { MapFiltersButton } from '../../styles/mui_custom_components'
import { ArrowDropDownTwoTone, ArrowRightTwoTone, Check as CheckIcon } from '@mui/icons-material'

// Constants
import { woSortOptions } from '../../lib/Constants'

// Redux
// import { useDispatch, useSelector } from 'react-redux'

// Styles
import { mapFiltersStyles } from '../../styles/classes/LocationsClasses'
import { enableButtonStyle } from '../../styles/mui_custom_theme'

export const SiteSortMenu = (props) => {
  const classes = mapFiltersStyles()
  const { t } = useTranslation()
  // const dispatch = useDispatch()
  // const locationsStore = useSelector(state => state.locations)
  const [anchorSelector, setAnchorSelector] = useState(null)
  const isMenuSelectorOpen = Boolean(anchorSelector)
  const [sortBy, setSortBy] = useState('none')

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
    <Box padding={1} key="sort" className={classes.mainItem}><Typography className={classes.menuTitle}>{t('locations.work_orders.sort_by')}</Typography></Box>
    <Box padding={1} key="sort_drop" className={classes.mainItem}>
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
    <Button
      variant="outlined"
      size="small"
      color="primary"
      style={{ ...enableButtonStyle, margin: '10px 0px 0px 38%' }}
      onClick={props.handleSortClose}
    >
      {t('account_settings.form.save')}
    </Button>
  </Menu>)
}
