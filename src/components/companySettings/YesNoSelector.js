import React, { useState, useRef } from 'react'
import { settingsColors } from '../../styles/mui_custom_theme'
import { useTranslation } from 'react-i18next'
// mui components
import {
  FormControl,
  Select,
  MenuItem,
  Radio,
  Typography
} from '@mui/material'
import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import { yesNoSelectorStyles } from '../../styles/classes/CompanySettingsClasses'

const yesNoOptions = [
  {
    value: 'yes',
    color: settingsColors.yes
  },
  {
    value: 'no',
    color: settingsColors.no
  }
]

const iconStyle = {
  width: '24px',
  marginRight: '0px',
  cursor: 'pointer'
}

export const YesNoSelector = props => {
  const [openSelect, setOpenSelect] = useState(false)

  const classes = yesNoSelectorStyles()
  const rootRef = useRef()
  const { t } = useTranslation()

  const handleChange = event => {
    props.handleChange(event.target.value, props.id)
  }

  return (
    <FormControl variant="outlined" className={classes.content}>
      <Select
        ref={rootRef}
        labelId="demo-simple-select-filled-label"
        id={props.id}
        value={props.value}
        onChange={handleChange}
        open={openSelect}
        onOpen={() => setOpenSelect(true)}
        onClose={() => setOpenSelect(false)}
        inputProps={{
          name: 'daterange',
          id: 'daterange',
          classes: { select: classes.select }
        }}
        className={props.error ? classes.errorRoot : classes.root}
        MenuProps={{
          anchorEl: () => rootRef.current,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          PaperProps: {
            style: {
              backgroundColor: 'white',
              borderRadius: '8px'
            }
          }
        }}
        IconComponent={() => (
          <KeyboardArrowDownOutlined
            onClick={() => setOpenSelect(true)}
            style={iconStyle}
          />
        )}
      >
        {yesNoOptions.map((obj, ind) => (
          <MenuItem
            key={obj.value + '-radio'}
            value={obj.value}
            className={classes.menuItem}
          >
            {t(`company_settings.roles_card.panel_${obj.value}`)}
            <Radio
              checked={props.value === obj.value}
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
              color="primary"
              size="small"
              style={{ alignContent: 'space-between' }}
              classes={{ root: classes.radio }}
            />
          </MenuItem>
        ))}
        {yesNoOptions.map((obj, ind) => (
          <MenuItem
            key={obj.value}
            value={obj.value}
            classes={{ root: classes.item }}
          >
            <Typography classes={{ root: classes.selectLabel }}>
              {t(`company_settings.roles_card.panel_${obj.value}`)}
            </Typography>
          </MenuItem>
        ))}
        <MenuItem
          key={'none'}
          value={'not_selected'}
          classes={{ root: classes.item }}
        >
          <Typography classes={{ root: classes.selectLabel }}>
            {t('company_settings.roles_card.panel_select')}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
