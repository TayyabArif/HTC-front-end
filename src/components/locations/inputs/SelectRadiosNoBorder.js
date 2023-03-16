import React from 'react'

/** Material UI **/
import { Grid, MenuItem, Radio, Select, Typography } from '@mui/material'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { BootstrapInputNoBorders } from '../../../styles/mui_custom_components'

// Styles
import { selectRadiosNoBorderStyles } from '../../../styles/classes/InputsClasses'

export const SelectRadiosNoBorder = (props) => {
  const classes = selectRadiosNoBorderStyles()

  return (
    <div>
      <Select
        classes={{ icon: classes.selectIcon }}
        fullWidth
        value={props.selectedOption || props.dataDefault}
        input={<BootstrapInputNoBorders/>}
        onChange={props.handleChange}
        renderValue={(selected) => {
          let showSelected = selected
          props.dataItems.forEach((obj) => {
            if (obj.value === selected) {
              showSelected = obj.label
            }
          })
          return (<Typography className={classes.font14}>{showSelected}</Typography>)
        }}
        MenuProps={{
          getContentAnchorEl: () => null
        }}
        IconComponent={KeyboardArrowDownOutlined}
      >
        {props.dataItems.map((obj, index) => (
          <MenuItem key={index} value={obj.value}>
            <Grid container>
              <Grid item xs={8}>
                <Typography className={classes.menuItem}>{obj.label}</Typography>
              </Grid>
              <Grid align={'right'} item xs={4}>
                <Radio
                  checked={props.selectedOption ? (props.selectedOption === obj.value) : (props.dataDefault === obj.value)}
                  className={classes.radio}
                  size='small'
                  color='primary'/>
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}
