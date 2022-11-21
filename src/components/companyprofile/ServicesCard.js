import React, { useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import GlobalChip from '../form/Chip'
import { servicesCardStyles } from '../../styles/classes/CompanySettingsClasses'

export const ServiceCard = props => {
  const classes = servicesCardStyles()
  const { t } = useTranslation()
  const [servicesSelected, setServicesSelected] = useState(new Set())
  const [rates, setRates] = useState({
    standard_rate: '',
    emergency_rate: '',
    travel_cost: ''
  })

  function handleButtonRemove (event, item) {
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

  function handleSelection () {
    props.handleSelection(props.trade, servicesSelected, rates)
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
