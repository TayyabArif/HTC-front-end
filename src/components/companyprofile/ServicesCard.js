import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  makeStyles,
  Paper,
  Typography
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import GlobalChip from '../form/Chip'

const useStyles = makeStyles(theme => ({
  component: {
    width: '100%',
    borderRadius: '36px',
    marginTop: '20px',
    padding: '1em 1.5em'
  },
  service_title: {
    fontSize: '20px',
    color: theme.colors.iconBlue,
    fontWeight: '700',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  removeButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: theme.colors.buttonGrey,
    fontSize: '22px'
  },
  chipsContainer: {
    marginBottom: '1.5em'
  },
  ratesContainer: {
    gap: '1em',
    minWidth: '34em',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      minWidth: '100%'
    }
  }
}))

export const ServiceCard = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [servicesSelected, setServicesSelected] = useState(new Set())
  const [rates, setRates] = useState({
    standard_rate: '',
    emergency_rate: '',
    travel_cost: ''
  })

  function handleButtonRemove(event, item) {
    props.removeCard(item)
  }
  useEffect(() => {
    setRates({
      standard_rate: props.itemsSelected[0]?.rates?.standard_rate,
      emergency_rate: props.itemsSelected[0]?.rates?.emergency_rate,
      travel_cost: props.itemsSelected[0]?.rates?.travel_cost
    })
    if (props.itemsSelected[0]?.services) {
      setServicesSelected(new Set([...props.itemsSelected[0].services]))
    }
  }, [])

  useEffect(() => {
    handleSelection()
  }, [servicesSelected])

  function handleSelection() {
    props.handleSelection(props.trade, servicesSelected, rates)
  }

  function handleRateChanged(value, rate) {
    const newRates = { ...rates, [rate]: value.slice(1) }
    setRates(newRates)
    props.handleRates(props.trade, newRates)
  }
  const withValueCap = (inputObj) => {
    const { value } = inputObj
    if (value <= 9999.99) return true
    return false
  }

  return (
    <Paper variant="outlined" className={classes.component}>
      {/* Trade title */}
      <Box display="flex" justifyContent="space-between">
        <Typography classes={{ root: classes.service_title }}>
          {t('company_profile.trades.' + props.trade)}
        </Typography>
        <IconButton
          onClick={event => handleButtonRemove(event, props.trade)}
          className={classes.removeButton}
        >
          <FontAwesomeIcon icon="fa-light fa-circle-xmark" />
        </IconButton>
      </Box>
      {/* subservices */}
      <Box className={classes.chipsContainer}>
        <GlobalChip
          chips={props.subservices}
          selected={servicesSelected}
          setSelected={setServicesSelected}
          parent="services"
        />
      </Box>
      {/* rates conteiner */}
      <Box
        className={classes.chipsContainer}
        display="flex"
        flexDirection="row"
      >
        <Box flex={2} display="flex" className={classes.ratesContainer}>
        </Box>
        <Box flex={1}></Box>
      </Box>
    </Paper>
  )
}
