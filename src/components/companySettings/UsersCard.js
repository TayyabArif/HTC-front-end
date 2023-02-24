// main components
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box, Grid, Divider
} from '@mui/material'
import { Button } from 'antd'
import GlobalChip from '../form/Chip'
import GlobalInput from '../form/TextInput'
import { useSelector } from 'react-redux'
import { UpdateAccountInfo } from '../accountSettings/UpdateAccountInfo'

// services
import { userHasAuthorization } from '../../services/AuthService'

// styles
import { usersCardStyles } from '../../styles/classes/CompanySettingsClasses'

export const UsersCard = props => {
  const { roles, users } = props
  const classes = usersCardStyles()
  const { t } = useTranslation()
  const userStore = useSelector(state => state.auth.user)

  const [roleOptions, setRoleOptions] = useState(null)
  const [filterUser, setFilterUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [panelEvent, setPanelEvent] = useState(null)
  const [openPanel, setOpenPanel] = useState(false)

  useEffect(() => {
    setFilterUser(users)
  }, [users])

  useEffect(() => {
    if (!roles || roles.length === 0) return

    const updatedRoles = {}
    roles.forEach(item => {
      updatedRoles[item.id] = item.name
    })
    setRoleOptions(updatedRoles)
  }, [roles])

  const handleNewPanel = () => {
    setSelectedUser({
      firstName: null,
      lastName: null,
      photo_url: null,
      roles: null,
      username: null
    })
    setErrorMessage(null)
    setPanelEvent('new')
    setOpenPanel(true)
  }

  const handleEditPanel = obj => {
    if (userHasAuthorization('company_settings:write')) {
      setSelectedUser(obj)
      setErrorMessage(null)
      setPanelEvent('edit')
      setOpenPanel(true)
    }
  }

  const EditButton = props => {
    const classes = usersCardStyles()
    return (
      <Button data-testid={'add_user_button'} className={classes.editButton} onClick={props.onClick}>
        {props.label}
      </Button>
    )
  }

  // function for search input
  function handleFilterChange (value) {
    const result = value
      ? users.filter(user =>
        (user.firstName + ' ' + user.lastName)
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      : props.users
    setFilterUser(result)
  }

  const adaptRoleName = (role) => {
    if (role) {
      const separated = role.split('_')
      const finalRole = []
      separated.forEach(word => {
        finalRole.push(word.charAt(0).toUpperCase() + word.slice(1))
      })
      return finalRole.join(' ')
    } else {
      return ''
    }
  }

  return (
    <Card className={classes.card} data-testid={'users_card'}>
      <CardActions disableSpacing classes={{ root: classes.actions }}>
        <Typography classes={{ root: classes.cardTitle }}>
          {props.cardtitle}
        </Typography>
        <GlobalInput
          className={classes.searchBar}
          placeholder={t('company_settings.users_card.search')}
          onChange={handleFilterChange}
        />
        <EditButton
          label={t('company_settings.buttons.add')}
          onClick={handleNewPanel}
        />
      </CardActions>
      <CardContent classes={{ root: classes.content }}>
        <Box
          display="flex"
          flexDirection="column"
          className={classes.usersList}
        >
          {filterUser?.map((user, index) => (
            <Grid container
              key={user.lastName + '_' + index}
            >
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  onClick={() => handleEditPanel(user)}
                  className={classes.lineItem}
                >
                  <Typography
                    classes={{ root: classes.userItem }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <GlobalChip
                    chips={[
                      user.email,
                      user.phone,
                      adaptRoleName(user.role),
                      roleOptions && user.roles && user.roles !== 'no_value'
                        ? roleOptions[user.roles]
                        : t('company_settings.mobile_only'),
                      user.status ? user.status?.charAt(0).toUpperCase() + user.status?.slice(1) : t('company_settings.users_card.view_only')
                    ].filter(
                      item => typeof item !== 'undefined' && item !== '' && item
                    )}
                    selected={new Set()}
                    setSelected={() => {}}
                    skipTranslate={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={11.7}>
                <Divider/>
              </Grid>
            </Grid>
          ))}
        </Box>
      </CardContent>
      {selectedUser && (
        <UpdateAccountInfo
          errorMessage={errorMessage}
          editDrawer={openPanel}
          handleClosePanel={() => {
            setOpenPanel(false)
            setSelectedUser(null)
          }}
          accountInfo={{ ...userStore, userInfo: selectedUser }}
          updateUsers={props.updateUsers}
          event={panelEvent}
          roles={roles}
          roleOptions={roleOptions}
          affiliateId={props.company.affiliate_id}
          mobile={props.mobile}
        />
      )}
    </Card>
  )
}
