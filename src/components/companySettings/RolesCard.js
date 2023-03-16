// main components
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AccessPanel } from './AccessPanel'

// mui components
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box, Grid, Divider
} from '@mui/material'
import { AddCircleRounded } from '@mui/icons-material'
// services
import * as ApiServices from '../../services/ApiService'
import { userHasAuthorization } from '../../services/AuthService'
import ReactGA from 'react-ga4'
import GlobalChip from '../form/Chip'
import { rolesCardSxStyles, rolesCardStyles } from '../../styles/classes/CompanySettingsClasses'

export const RolesCard = props => {
  const { roles, updateRoles } = props
  const classes = rolesCardStyles()
  const styles = rolesCardSxStyles
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
  const permissionsList = [
    'workorders',
    'locations',
    'company_settings'
  ]
  const permissionsMobile = [t('company_settings.roles_card.no_portal_access')]

  return (
    <Card className={classes.card} data-testid={'roles_card'}>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.card.access')}
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
          {roles?.filter(role => role.name !== 'Portal user').map(role => {
            const permissions = []
            permissionsList.forEach((item) => {
              if (role.permissions[item] && !permissions.find(element => element === t('company_settings.roles_card.' + item))) {
                permissions.push(t('company_settings.roles_card.' + item))
              }
            })
            return (
              <Grid container key={role.name}>
                <Grid item xs={12}>
                  <Box display="flex" flexDirection="row" alignItems="baseline">
                    <Typography classes={{ root: classes.roleItem }}>
                      {role.name}
                    </Typography>
                    <GlobalChip
                      chips={permissions}
                      selected={new Set()}
                      setSelected={() => {}}
                      skipTranslate={true}
                      clickable={false}
                    />
                  </Box>
                </Grid>
                <Grid item xs={11.7} sx={ roles.length > 1 ? styles.divider : '' }>
                  <Divider />
                </Grid>
              </Grid>
            )
          })}
          <Box sx={styles.viewOnlyCard} display="flex" flexDirection="row" alignItems="baseline">
            <Typography classes={{ root: classes.roleItem }}>
              {t('company_settings.view_only')}
            </Typography>
            <GlobalChip
              chips={permissionsMobile}
              selected={new Set()}
              setSelected={() => {}}
              skipTranslate={true}
              clickable={false}
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
