import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GlobalChip from '../form/Chip'
import GlobalCheckbox from '../form/TextCheckbox'
import { tradesServicesCardStyles } from '../../styles/classes/CompanySettingsClasses'

const EditButton = props => {
  const classes = tradesServicesCardStyles()
  return (
    <Button className={classes.editButton} onClick={props.onClick}>
      {props.label}
    </Button>
  )
}

export const TradesServicesCard = props => {
  const classes = tradesServicesCardStyles()
  const { t } = useTranslation()

  const handleEditProfile = () => {
    props.setComponent('trades')
    props.setOpen(true)
  }

  return (
    <Card className={classes.card}>
      <Box display="flex" flexDirection="row">
        <Typography classes={{ root: classes.cardTitle }}>
          {t('company_settings.card.trades')}
        </Typography>
        <EditButton
          label={t('company_settings.buttons.edit')}
          onClick={handleEditProfile}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap='wrap'
        className={classes.sectionDivider}
      >
        {props.profile?.clients?.map((client, index) => {
          return (
            <GlobalCheckbox
              key={index}
              name={client}
              label={t('company_profile.clients.' + client)}
              checked={true}
              disabled
              handleChange={() => {}}
            />
          )
        })}
      </Box>
      {props.profile?.trades?.map(trade => {
        return (
          <Box
            display="flex"
            flexDirection="column"
            key={trade.name}
          >
            <Typography classes={{ root: classes.cardSubtitle }}>
              {t('company_profile.trades.' + trade.name)}
            </Typography>
            <Box>
              <GlobalChip
                chips={trade.services}
                selected={new Set()}
                setSelected={() => {}}
                parent="services"
              />
            </Box>

            <Box
              className={classes.chipsContainer}
              display="flex"
              flexDirection="row"
            >
              <Box
                flex={2}
                display="flex"
                flexDirection="row"
                className={classes.ratesContainer}
              >
              </Box>
              <Box flex={1}></Box>
            </Box>
          </Box>
        )
      })}
    </Card>
  )
}
