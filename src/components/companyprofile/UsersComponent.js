import { React, useEffect, useState } from 'react'

// mui components
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  Button
} from '@material-ui/core'
import { UserCard } from './UserCard'
import {
  buttonSettingsDisabled,
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'
import { useTranslation } from 'react-i18next'
import { isEqual } from 'lodash'

const useStyles = makeStyles(theme => ({
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '1169px',
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0',
      minWidth: 'auto'
    }
  },
  titleContainer: {
    padding: '10px 80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addMoreContainer: {
    padding: '0px 80px 10px 80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      padding: '20px 2em',
      minWidth: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '20px 0',
      minWidth: 'auto'
    }
  },
  userContainer: {
    columnCount: 2,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0 5px'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '15px'
    }
  },
  appButton: {
    [theme.breakpoints.down('md')]: {
      padding: '3px 0px !important',
      marginRight: '15px !important'
    }
  }
}))

export const UsersComponent = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [webUsers, setWebUsers] = useState([])
  const [mobileUsers, setMobileUsers] = useState([])
  const { roles, roleOptions, affiliateId, setCompleteUsers } = props

  const createUser = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      roles: '',
      phone: '',
      password: ''
    }
  }

  useEffect(() => {
    setWebUsers([createUser(), createUser(), createUser(), createUser()])
    setMobileUsers([createUser(), createUser()])
  }, [])

  useEffect(() => {
    if (
      webUsers.filter(user => user.createdAt).length === webUsers.length &&
      mobileUsers.filter(user => user.createdAt).length === mobileUsers.length
    ) {
      setCompleteUsers('complete')
    } else if (incompleteUsers(webUsers) || incompleteUsers(mobileUsers)) {
      setCompleteUsers('incomplete')
    } else {
      setCompleteUsers('no_users')
    }
  }, [webUsers, mobileUsers])

  const incompleteUsers = users => {
    let incomplete = false
    for (const idx in users) {
      if (!isEqual(createUser(), users[idx])) {
        incomplete = true
      }
    }
    return incomplete
  }

  const updateWebUser = (newUser, idx) => {
    webUsers[idx] = newUser
    setWebUsers([...webUsers])
  }

  const updateMobileUser = (newUser, idx) => {
    mobileUsers[idx] = newUser
    setMobileUsers([...mobileUsers])
  }

  return (
    <Container className={classes.infoContainer}>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.title}>
          {t('company_profile.labels.web_users')}
        </Typography>
      </Grid>
      <Grid container className={classes.userContainer}>
        {webUsers.map((user, idx) => (
          <div key={idx}>
            <UserCard
              key={idx}
              idx={idx}
              user={user}
              roles={roles}
              roleOptions={roleOptions}
              affiliateId={affiliateId}
              updateUser={createdUser => updateWebUser(createdUser, idx)}
            />
          </div>
        ))}
      </Grid>
      <Grid item xs={12} className={classes.addMoreContainer}>
        <ThemeProvider theme={buttonSettingsDisabled}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            type="submit"
            disabled={
              webUsers.filter(user => user.createdAt).length < webUsers.length
            }
            style={{
              ...(webUsers.filter(user => user.createdAt).length <
              webUsers.length
                ? disableButtonStyle
                : enableButtonStyle),
              width: '260px',
              margin: 0
            }}
            className={classes.appButton}
            onClick={() => setWebUsers([...webUsers, createUser()])}
          >
            {t('company_profile.labels.add_web_users')}
          </Button>
        </ThemeProvider>
      </Grid>

      <Grid item xs={12} className={classes.titleContainer}>
        <Typography className={classes.title}>
          {t('company_profile.labels.app_users')}
        </Typography>
      </Grid>
      <Grid container className={classes.userContainer}>
        {mobileUsers.map((user, idx) => (
          <div key={idx}>
            <UserCard
              key={idx}
              user={user}
              roles={roles}
              roleOptions={roleOptions}
              affiliateId={affiliateId}
              updateUser={createdUser => updateMobileUser(createdUser, idx)}
              mobileOnly
            />
          </div>
        ))}
      </Grid>
      <Grid item xs={12} className={classes.addMoreContainer}>
        <ThemeProvider theme={buttonSettingsDisabled}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            type="submit"
            disabled={
              mobileUsers.filter(user => user.createdAt).length <
              mobileUsers.length
            }
            style={{
              ...(mobileUsers.filter(user => user.createdAt).length <
              mobileUsers.length
                ? disableButtonStyle
                : enableButtonStyle),
              width: '260px',
              margin: 0
            }}
            onClick={() => setMobileUsers([...mobileUsers, createUser()])}
          >
            {t('company_profile.labels.add_app_users')}
          </Button>
        </ThemeProvider>
      </Grid>
    </Container>
  )
}
