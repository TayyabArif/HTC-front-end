// main components
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
  Box
} from '@mui/material'

// services
import { Button } from 'antd'
import GlobalChip from '../form/Chip'
import GlobalInput from '../form/TextInput'

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '2em',
    padding: '1em',
    color: theme.colors.text,
    minHeight: '470px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '900',
    minWidth: 'fit-content',
    marginRight: '1em'
  },
  actions: {
    padding: '0px 0px',
    display: 'flex',
    alignItems: 'baseline'
  },
  content: {
    padding: '0px 20px 30px 0px'
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
    lineHeight: '19px',
    boxShadow: 'none',
    border: 'none'
  },
  itemDivider: {
    borderBottom: '1px solid ' + theme.colors.grey_2
  },
  userItem: {
    fontSize: '16px',
    fontWeight: 600,
    minWidth: '10em',
    cursor: 'pointer'
  },
  lineItem: {
    padding: '1em 0 1em'
  },
  searchBar: {
    width: '40%'
  },
  usersList: {
    maxHeight: '350px',
    overflow: 'auto'
  }
}))

export const UsersCard = props => {
  const { roles, users } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [roleOptions, setRoleOptions] = useState(null)
  const [filterUser, setFilterUser] = useState(null)

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
  }

  const handleEditPanel = obj => {
  }

  const EditButton = props => {
    const classes = useStyles()
    return (
      <Button className={classes.editButton} onClick={props.onClick}>
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

  return (
    <Card className={classes.card} data-testid={'company_users_card'}>
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
          data-testid={'add_company_user_button'}
        />
      </CardActions>
      <CardContent classes={{ root: classes.content }}>
        <Box
          display="flex"
          flexDirection="column"
          className={classes.usersList}
        >
          {filterUser?.map((user, index) => (
            <div
              key={user.lastName + '_' + index}
              className={classes.itemDivider}
            >
              <Box
                display="flex"
                flexDirection="column"
                className={classes.lineItem}
              >
                <Typography
                  classes={{ root: classes.userItem }}
                  onClick={() => handleEditPanel(user)}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <GlobalChip
                  chips={[
                    user.phone,
                    user.role,
                    roleOptions && user.roles && user.roles !== 'no_value'
                      ? roleOptions[user.roles]
                      : t('company_settings.mobile_only')
                  ].filter(
                    item => typeof item !== 'undefined' && item !== '' && item
                  )}
                  selected={new Set()}
                  setSelected={() => {}}
                  skipTranslate={true}
                />
              </Box>
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
