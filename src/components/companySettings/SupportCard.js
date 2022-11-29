// main components
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Link,
  Box
} from '@mui/material'
// services
import { supportCardStyles } from '../../styles/classes/CompanySettingsClasses'
const pjson = require('../../../package.json')

export const SupportCard = props => {
  const classes = supportCardStyles()
  const { t } = useTranslation()
  const [contacts, setContacts] = useState({
    phone: '',
    email: ''
  })

  useEffect(() => {
    if (props.company?.tech_support?.sections) {
      const techSupport = props.company?.tech_support?.sections
      techSupport.forEach(element => {
        if (element.action_buttons) {
          const resultContacts = {
            phone: '',
            email: ''
          }
          element.action_buttons.forEach(action => {
            if (action.label === 'phone') {
              resultContacts.phone = action.action_content
            }
            if (action.label === 'email') {
              resultContacts.email = action.action_content
            }
          })
          setContacts(resultContacts)
        }
      })
    }
  }, [props.company])

  return (
    <Card className={classes.card} data-testid={'support_card'}>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.support_card.title')}
        </Typography>
      </CardActions>
      <CardContent classes={{ root: classes.content }}>
        <Box margin="0px 0px 25px 0px" padding={0} >
          <Link classes={{ root: classes.link }} >
              {t('company_settings.support_card.knowledge')}
          </Link>
        </Box>
        {contacts.email !== '' && <Typography classes={{ root: classes.contacts }}>
          {contacts.email}
        </Typography>}
        {contacts.phone !== '' && <Typography classes={{ root: classes.contacts }}>
          {contacts.phone}
        </Typography>}
        <Box margin="0px 0px 25px 0px" padding={0} >
          <Link onClick={() => window.open(process.env.REACT_APP_FTC_THERMS_OF_SERVICE_URL, '_blank', 'noopener,noreferrer')} classes={{ root: classes.link }} >
              {t('company_settings.support_card.privacy')}
          </Link>
        </Box>
        <Typography classes={{ root: classes.versionLabel }}>
            {t('company_settings.support_card.version')} {pjson.version}
        </Typography>
      </CardContent>
    </Card>
  )
}
