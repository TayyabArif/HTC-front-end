import { React, useState, useEffect } from 'react'

// mui components
import { Container, Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GlobalCheckbox from '../form/TextCheckbox'
import GlobalChip from '../form/Chip'
import { ServiceCard } from './ServicesCard'
import { clientsComponentStyles } from '../../styles/classes/CompanySettingsClasses'

export const ClientsComponent = props => {
  const classes = clientsComponentStyles()
  const { t } = useTranslation()
  // Clients will be hardcoded until further instructions
  const [clients, setClients] = useState([
    { label: 'commercial', serve: false },
    { label: 'industrial', serve: false },
    { label: 'educational', serve: false },
    { label: 'residential', serve: false },
    { label: 'property_preservation', serve: false },
    { label: 'medical', serve: false }
  ])
  const [tradesSelected, setTradesSelected] = useState(new Set())
  const [tradesAndServices, setTradesAndServices] = useState([])
  const { profile } = props

  useEffect(() => {
    // init objects
    if (profile?.trades) {
      setTradesSelected(new Set([...profile?.trades?.map(trade => trade.name)]))
      setTradesAndServices([...profile?.trades])
    }
    const clientsServed = [
      ...clients.map(client => {
        if (profile?.clients?.includes(client.label)) {
          return { ...client, serve: true }
        }
        return client
      })
    ]
    setClients(clientsServed)
  }, [])

  // trades will be hardcoded until further instructions
  const trades = [
    'beverage_equipment',
    'disaster_relief',
    'doors',
    'fire_systems',
    'floor_care',
    'flooring',
    'fuel_systems',
    'gates',
    'glass',
    'kitchen_quipment',
    'landscaping',
    'locks',
    'parking_lot',
    'pest_control',
    'refrigeration',
    'roof',
    'snow_removal',
    'electrical',
    'plumbing',
    'hvac',
    'general_maintenance',
    'appliances',
    'painting',
    'carpentry'
  ].sort()

  // services will be hardcoded until further instructions
  const services = {
    beverage_equipment: ['beverage_equipment'],
    disaster_relief: ['disaster_relief'],
    doors: ['dock', 'overhead_doors', 'doors', 'entrance_doors'],
    fire_systems: [
      'fire_alarm',
      'fire_extinguisher',
      'fire_systems',
      'fire_back_flow'
    ],
    floor_care: ['floor_care', 'janitorial', 'windows'],
    flooring: ['flooring'],
    fuel_systems: [
      'automatic_tank',
      'compressed_gas',
      'fuel_dispenser',
      'fuel_environmental',
      'underground_storage'
    ],
    gates: ['gates'],
    glass: ['glass', 'film'],
    kitchen_quipment: ['kitchen_equipment', 'exhaust_cleaning'],
    landscaping: ['landscaping', 'hardscaping', 'irrigation'],
    locks: ['locks', 'safes'],
    parking_lot: ['parking_lot'],
    pest_control: ['pest_control'],
    refrigeration: ['refrigeration'],
    roof: ['roof'],
    snow_removal: ['snow_removal'],
    electrical: [
      'exterior_lighting',
      'interior_lighting',
      'exterior_signage',
      'major_electrical',
      'generators',
      'minor_electrical'
    ],
    plumbing: [
      'back_flow',
      'minor_plumbing',
      'water_systems',
      'grease_traps',
      'septic',
      'well_systems',
      'major_plumbing',
      'water_heater'
    ],
    hvac: ['hvac', 'temperature_controls'],
    general_maintenance: [
      'concrete',
      'general_maintenance',
      'blinds',
      'fencing',
      'paint',
      'foundation',
      'power_washing',
      'cabinets',
      'inspections',
      'fireplace'
    ],
    appliances: ['appliances'],
    painting: ['exterior_painting', 'interior_painting'],
    carpentry: ['general_carpentry', 'cabinets_carpentry', 'trim_work', 'tile']
  }

  const handleChange = (label, value) => {
    const objIdx = clients.findIndex(obj => obj.label === label)
    const data = [...clients]
    data[objIdx].serve = value
    setClients(data)
    const servedClients = [
      ...data
        .filter(client => client.serve)
        .map(client => {
          return client.label
        })
    ]
    props.handleChange(servedClients, 'clients')
  }

  function removeTrade (trade) {
    const newSet = new Set(tradesSelected)
    // filter chips selected
    if (newSet.has(trade)) {
      newSet.delete(trade)
    }
    setTradesSelected(newSet)
    // delete from data object
    const obj =
      tradesAndServices.length > 0
        ? tradesAndServices.filter(data => data.name !== trade)
        : []
    setTradesAndServices(obj)
  }

  useEffect(() => {
    props.handleChange(tradesAndServices, 'trades')
  }, [tradesAndServices])

  function handleServiceSelected (trade, selection, rates) {
    const obj =
      tradesAndServices.length > 0
        ? tradesAndServices.filter(data => data.name !== trade)
        : []
    obj.push({ name: trade, services: [...selection], rates: { ...rates } })
    setTradesAndServices(obj)
    props.handleChange(obj, 'trades')
  }

  function handleRatesChanged (trade, rates) {
    const obj = tradesAndServices.map(item => {
      if (item.name === trade) {
        return { ...item, rates: { ...rates } }
      }
      return item
    })
    setTradesAndServices(obj)
    props.handleChange(obj, 'trades')
  }

  return (
    <Container classes={{ root: classes.infoContainer }}>
      <Grid container className={classes.itemContainer}>
        <Grid item xs={12}>
          <Typography classes={{ root: classes.title }}>
            {t('company_profile.clients_trades')}
          </Typography>
          <Typography classes={{ root: classes.subtitle }}>
            {t('company_profile.message.company_profile')}
          </Typography>
        </Grid>
      </Grid>
      <Typography classes={{ root: classes.title_secondary }}>
        <span className={classes.required}>*</span>
        {t('company_profile.questions.serve')}
      </Typography>
      <Box
        display="flex"
        className={`${classes.itemContainer} ${classes.checkboxes}`}
        flexWrap="wrap"
      >
        {clients.map((client, index) => {
          return (
            <GlobalCheckbox
              key={index}
              name={client.label}
              label={t('company_profile.clients.' + client.label)}
              checked={client.serve}
              handleChange={handleChange}
            />
          )
        })}
      </Box>
      <Typography classes={{ root: classes.title_secondary }}>
        <span className={classes.required}>*</span>
        {t('company_profile.labels.trades')}
      </Typography>
      <Box display="flex" className={classes.noTopPadding}>
        <GlobalChip
          chips={trades}
          selected={tradesSelected}
          setSelected={setTradesSelected}
          searchVisible={true}
          parent="trades"
          removeItem={removeTrade}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        className={classes.itemContainer}
      >
        {Array.from(tradesSelected).map(trade => {
          const servicesSelected = tradesAndServices.filter(
            item => item.name === trade
          )

          return (
            <ServiceCard
              key={trade}
              trade={trade}
              removeCard={removeTrade}
              subservices={services[trade]}
              handleSelection={handleServiceSelected}
              handleRates={handleRatesChanged}
              itemsSelected={servicesSelected}
            />
          )
        })}
      </Box>
    </Container>
  )
}
