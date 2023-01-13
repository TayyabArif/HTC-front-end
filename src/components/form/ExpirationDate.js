import React, { useEffect, useState } from 'react'
import {
  Box,
  InputBase,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import customTheme from '../../styles/mui_theme'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { expirationDateStyles } from '../../styles/classes/FormClasses'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 45,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid ' + customTheme.colors.profile.border_input,
    fontSize: 12,
    paddingLeft: '1em',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 45,
      borderColor: customTheme.colors.profile.border_focus,
      boxShadow: '0 0 0 0.2rem ' + customTheme.colors.profile.box_shadow
    }
  }
}))
const BootstrapInputError = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 45,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid red',
    fontSize: 12,
    paddingLeft: '1em',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 45,
      borderColor: customTheme.colors.profile.border_focus,
      boxShadow: '0 0 0 0.2rem ' + customTheme.colors.profile.box_shadow
    }
  }
}))

export const ExpirationDate = props => {
  const classes = expirationDateStyles()
  const { t } = useTranslation()
  const months = [...populateMonths()]
  const years = [...populateYears()]
  const [monthSelected, setMonthSelected] = useState()
  const [yearSelected, setYearSelected] = useState()
  const [monthError, setMonthError] = useState()
  const [yearError, setYearError] = useState()

  function populateMonths () {
    const months = []
    for (let i = 1; i < 13; i++) {
      months.push({ label: i, value: i })
    }
    return months
  }

  function populateYears () {
    const years = []
    const current = new Date().getFullYear()
    for (let i = current; i < current + 6; i++) {
      years.push({ label: i, value: i })
    }
    return years
  }

  useEffect(() => {
    setMonthSelected(props.month)
    setYearSelected(props.year)
  }, [])

  useEffect(() => {
    dateValidation()
  }, [monthSelected, yearSelected])

  function dateValidation () {
    const d = new Date()
    const currentYear = d.getFullYear()
    const currentMonth = d.getMonth() + 1
    if (currentYear === yearSelected && monthSelected < currentMonth) {
      setMonthError(true)
      setYearError(true)
    } else if (!monthSelected && !yearSelected) {
      setMonthError(false)
      setYearError(false)
    } else {
      monthSelected > 0 ? setMonthError(false) : setMonthError(true)
      yearSelected > 0 ? setYearError(false) : setYearError(true)
    }
  }

  const handleChange = event => {
    event.target.name.match(/.*_month/)
      ? setMonthSelected(event.target.value)
      : setYearSelected(event.target.value)
    props.onChange(event.target.value, event.target.name)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.componentContainer}
    >
      <Box flex={1}>
        <InputLabel
          id="demo-customized-select-label"
          className={
            yearError || monthError ? classes.label_error : classes.label
          }
        >
          {props.required && <span className={classes.required}>*</span>}
          {props.label}
        </InputLabel>
      </Box>
      <Box display="flex" flexDirection="row" id="expiration_date">
        <Box flex={1} className={classes.componentDivider}>
          <Select
            id="select_month"
            className={classes.text}
            {...props}
            onChange={handleChange}
            input={monthError ? <BootstrapInputError /> : <BootstrapInput />}
            classes={{ icon: classes.iconMargin }}
            value={props.month}
            name={props.month_field}
            displayEmpty
            renderValue={selected => {
              if (selected?.length === 0) {
                return (
                  <em className={classes.text}>
                    {t('company_profile.placeholder.month')}
                  </em>
                )
              }
              return selected
            }}
          >
            {months.map(item => (
              <MenuItem
                key={item.value}
                value={item.value}
                style={{
                  fontSize: '12px'
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box flex={1}>
          <Select
            id="select_year"
            className={classes.text}
            {...props}
            onChange={handleChange}
            input={yearError ? <BootstrapInputError /> : <BootstrapInput />}
            classes={{ icon: classes.iconMargin }}
            value={props.year}
            name={props.year_field}
            displayEmpty
            renderValue={selected => {
              if (selected?.length === 0) {
                return (
                  <em className={classes.text}>
                    {t('company_profile.placeholder.year')}
                  </em>
                )
              }
              return selected
            }}
          >
            {years.map(item => (
              <MenuItem
                key={item.value}
                value={item.value}
                style={{
                  fontSize: '12px'
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <div className={classes.bottomSpacing}></div>
    </Box>
  )
}
