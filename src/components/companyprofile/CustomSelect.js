import React, { useState } from 'react'
import { MenuItem, OutlinedInput, Select } from '@mui/material'
import { customSelectStyles } from '../../styles/classes/CompanySettingsClasses'

export const CustomSelect = props => {
  const classes = customSelectStyles()
  const { items, placeholder, itemSelected, handleSelect, name, multiple } =
    props

  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Select
      name={name}
      multiple={multiple}
      displayEmpty
      value={itemSelected}
      onChange={handleSelect}
      classes={{ root: classes.selectRoot }}
      input={<OutlinedInput className={classes.outlinedInput} />}
      renderValue={selected => {
        if (selected.length === 0) {
          return <em>{placeholder}</em>
        }

        if (multiple) {
          return selected.join(', ')
        } else {
          return selected
        }
      }}
      onOpen={event => {
        setAnchorEl(event.currentTarget)
      }}
      onClose={() => setAnchorEl(null)}
      MenuProps={{
        anchorEl: anchorEl,
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
            maxHeight: '210px'
          }
        }
      }}
      // MenuProps={MenuProps}
    >
      {items.map(item => (
        <MenuItem key={item} value={item} classes={{ root: classes.select }}>
          {item}
        </MenuItem>
      ))}
    </Select>
  )
}
