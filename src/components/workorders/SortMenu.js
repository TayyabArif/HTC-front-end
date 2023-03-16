import React, { useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Sort as SortIcon } from '@mui/icons-material'
import { sortMenuStyles } from '../../styles/classes/WorkOrdersClasses'

const sortStyle = {
  width: '15px',
  height: '15px',
  marginLeft: '6px',
  cursor: 'pointer'
}

export const SortMenu = props => {
  const { t } = useTranslation()
  const classes = sortMenuStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleSelect = (field1, field2) => {
    let fieldName = ''
    switch (props.id) {
    case 'opendate':
      fieldName = 'open_date'
      break
    case 'duedate':
      fieldName = 'expiration_date'
      break
    case 'wostat':
      fieldName = 'status'
      break
    default:
      fieldName = props.id
    }
    props.setValues(prevState => ({
      ...prevState,
      [field1]: fieldName,
      [field2]: ''
    }))
    setAnchorEl(null)
  }

  const handleClean = () => {
    props.setValues(prevState => ({
      ...prevState,
      asc_sort: '',
      desc_sort: ''
    }))
    setAnchorEl(null)
  }

  return (
    <>
      <SortIcon onClick={handleClick} style={sortStyle} />
      <Menu
        id={props.id}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          onClick={() => handleSelect('desc_sort', 'asc_sort')}
          className={classes.menuItem}
        >
          {t('work_orders.sort')}{' '}
          {props.id === 'won'
            ? t('work_orders.highest')
            : props.id === 'duedate' || props.id === 'opendate'
              ? t('work_orders.newest')
              : 'Z'}{' '}
          -{' '}
          {props.id === 'won'
            ? t('work_orders.lowest')
            : props.id === 'duedate' || props.id === 'opendate'
              ? t('work_orders.oldest')
              : 'A'}{' '}
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect('asc_sort', 'desc_sort')}
          className={classes.menuItem}
        >
          {t('work_orders.sort')}{' '}
          {props.id === 'won'
            ? t('work_orders.lowest')
            : props.id === 'duedate' || props.id === 'opendate'
              ? t('work_orders.oldest')
              : 'A'}{' '}
          -{' '}
          {props.id === 'won'
            ? t('work_orders.highest')
            : props.id === 'duedate' || props.id === 'opendate'
              ? t('work_orders.newest')
              : 'Z'}{' '}
        </MenuItem>
        {props.values.asc_sort === props.id ||
        props.values.desc_sort === props.id
          ? (
            <MenuItem onClick={handleClean} className={classes.menuItem}>
              {t('work_orders.clear')}
            </MenuItem>
          )
          : null}
      </Menu>
    </>
  )
}
