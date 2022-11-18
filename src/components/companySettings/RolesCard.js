// main components
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AccessPanel } from './AccessPanel'

// mui components
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box
} from '@mui/material'
import { AddCircleRounded } from '@mui/icons-material'
// services
import * as ApiServices from '../../services/ApiService'
import { userHasAuthorization } from '../../services/AuthService'
import ReactGA from 'react-ga4'
import GlobalChip from '../form/Chip'

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    borderBottom: `1px solid ${theme.colors.disabledField}`
  },
  title: {
    fontSize: '20px',
    margin: '23px 0px 22px 20px',
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: '23px',
    color: theme.colors.company.title
  },
  actions: {
    display: 'flex',
    padding: '0px 0px'
  },
  addButton: {
    marginLeft: 'auto',
    marginRight: '12px',
    color: theme.palette.primary.light
  },
  content: {
    padding: '0px 20px 30px 20px'
  },
  itemDivider: {
    borderBottom: '1px solid ' + theme.colors.grey_2
  },
  roleItem: {
    fontSize: '16px',
    fontWeight: 600,
    paddingBottom: '2em',
    minWidth: '10em'
  }
}))

export const RolesCard = props => {
  const { roles, updateRoles } = props
  const classes = useStyles()
  const { t } = useTranslation()

  const [openPanel, setOpenPanel] = useState(false)
  const [dataPanel, setDataPanel] = useState({
    id: 0,
    name: '',
    workorders: 'not_selected',
    sites: 'not_selected',
    company_settings: 'not_selected'
  })

  const handleNewPanel = () => {
    setDataPanel({
      id: 0,
      name: '',
      workorders: 'not_selected',
      sites: 'not_selected',
      company_settings: 'not_selected'
    })
    setOpenPanel(true)
  }

  const handleNewAccess = async (name, workorders, sites, companySettings) => {
    try {
      await ApiServices.createRolWithScopes(
        name,
        workorders,
        sites,
        companySettings
      )
      setOpenPanel(false)
      updateRoles()

      ReactGA.event({
        category: 'request',
        action: 'create_access_role'
      })
    } catch (e) {
      console.error(e)
      setOpenPanel(false)
    }
  }

  const handleChangeAccess = async (
    id,
    name,
    workorders,
    sites,
    companySettings
  ) => {
    try {
      await ApiServices.updateRolWithScopes(
        id,
        name,
        workorders,
        sites,
        companySettings
      )
      setOpenPanel(false)
      updateRoles()

      ReactGA.event({
        category: 'request',
        action: 'update_access_role'
      })
    } catch (e) {
      console.error(e)
      setOpenPanel(false)
    }
  }

  const handleDeleteAccess = async id => {
    try {
      await ApiServices.deleteRolWithScopes(id)
      setOpenPanel(false)
      updateRoles()

      ReactGA.event({
        category: 'request',
        action: 'delete_access_role'
      })
    } catch (e) {
      console.error(e)
      setOpenPanel(false)
    }
  }

  const permissions = [
    t('company_settings.roles_card.workorders'),
    t('company_settings.roles_card.invoices'),
    t('company_settings.roles_card.company_settings')
  ]
  const permissionsMobile = [t('company_settings.roles_card.no_portal_access')]

  return (
    <Card className={classes.card} data-testid={'company_access_card'}>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.card.roles')}
        </Typography>
        {userHasAuthorization('company_settings.manage_access:write') && (
          <IconButton
            aria-label="delete"
            classes={{ root: classes.addButton }}
            onClick={handleNewPanel}
            data-testid={'add_company_access_button'}
          >
            <AddCircleRounded />
          </IconButton>
        )}
      </CardActions>
      <CardContent classes={{ root: classes.content }}>
        <Box display="flex" flexDirection="column">
          {roles?.map(role => (
            <div key={role.name} className={classes.itemDivider}>
              <Box display="flex" flexDirection="row" alignItems="baseline">
                <Typography classes={{ root: classes.roleItem }}>
                  {role.name}
                </Typography>
                <GlobalChip
                  chips={permissions}
                  selected={new Set()}
                  setSelected={() => {}}
                  skipTranslate={true}
                />
              </Box>
            </div>
          ))}
          <Box display="flex" flexDirection="row" alignItems="baseline">
            <Typography classes={{ root: classes.roleItem }}>
              {t('company_settings.mobile_only')}
            </Typography>
            <GlobalChip
              chips={permissionsMobile}
              selected={new Set()}
              setSelected={() => {}}
              skipTranslate={true}
            />
          </Box>
        </Box>
      </CardContent>
      <AccessPanel
        data={dataPanel}
        open={openPanel}
        setOpen={setOpenPanel}
        handleNew={handleNewAccess}
        handleChange={handleChangeAccess}
        handleDelete={handleDeleteAccess}
        roles={roles}
      />
    </Card>
  )
}
