import React from 'react'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'
import customTheme from '../../styles/mui_theme'
import { dashboardStyles } from '../../styles/classes/DashboardClasses'

const BootstrapInput = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 18,
    position: 'relative',
    backgroundColor: customTheme.colors.iconBlue,
    color: customTheme.colors.textSelect,
    fontSize: 9,
    fontWeight: 500,
    padding: '0px 15px !important',
    margin: '0px 10px',
    '&:focus': {
      borderRadius: 18,
      backgroundColor: customTheme.colors.iconBlue,
      color: customTheme.colors.textSelect
    }
  }
}))

export default function ButtonSelect (props) {
  const classes = dashboardStyles()
  const handleChange = event => {
    props.setValue(event.target.value)
  }
  return (
    <div>
      <FormControl variant="standard">
        <Select
          id="demo-customized-select"
          value={props.value}
          onChange={handleChange}
          IconComponent={null}
          input={<BootstrapInput />}
        >
          {props.options.map(option => {
            return (
              <MenuItem
                key={option.id}
                value={option.id}
                className={classes.menu}
              >
                {option.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}
