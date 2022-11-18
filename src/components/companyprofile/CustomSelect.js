import React, { useState } from 'react'
import { makeStyles, MenuItem, OutlinedInput, Select } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  outlinedInput: {
    borderRadius: '50px',
    width: '100%',
    height: '36px',
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  select: {
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  selectRoot: {
    '&:focus': {
      borderRadius: '50px'
    }
  }
}))

export const CustomSelect = props => {
  const classes = useStyles()
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
        getContentAnchorEl: null,
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
