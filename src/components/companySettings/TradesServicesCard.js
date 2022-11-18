import { Box, Button, Card, makeStyles, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GlobalChip from '../form/Chip'
import GlobalCheckbox from '../form/TextCheckbox'

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '2em',
    padding: '1em',
    color: theme.colors.text
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '900'
  },
  editButton: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    lineHeight: '19px'
  },
  cardSubtitle: {
    fontSize: '16px',
    fontWeight: '500'
  },
  sectionDivider: {
    marginTop: '1em',
    marginBottom: '1em'
  },
  ratesContainer: {
    gap: '1em',
    marginTop: '1em',
    minWidth: '29em'
  }
}))

const EditButton = props => {
  const classes = useStyles()
  return (
    <Button className={classes.editButton} onClick={props.onClick}>
      {props.label}
    </Button>
  )
}

export const TradesServicesCard = props => {
  const classes = useStyles()
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
