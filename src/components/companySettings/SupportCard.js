// main components
import React from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Link
} from '@mui/material'
// services
import { supportCardStyles } from '../../styles/classes/CompanySettingsClasses'
const pjson = require('../../../package.json')

export const SupportCard = props => {
  const classes = supportCardStyles()
  const { t } = useTranslation()

  return (
    <Card className={classes.card} data-testid={'support_card'}>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.support_card.title')}
        </Typography>
      </CardActions>
      <CardContent classes={{ root: classes.content }}>
        <Link
          data-testid='privacy_policy_button'
          onClick={() => window.open(process.env.REACT_APP_FTC_TERMS_OF_SERVICE_URL, '_blank', 'noopener,noreferrer')}
          classes={{ root: classes.link }} >
          {t('company_settings.support_card.privacy')}
        </Link>
        <Typography classes={{ root: classes.versionLabel }}>
          {t('company_settings.support_card.version')} {pjson.version}
        </Typography>
      </CardContent>
    </Card>
  )
}
