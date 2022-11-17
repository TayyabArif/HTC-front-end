import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

/** Redux **/
import { authActions } from '../store/signIn'
import { useDispatch, useSelector } from 'react-redux'

/** Material UI **/
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { StyledNavTab, StyledNavTabs } from '../styles/mui_custom_components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/** Services **/
import { removeAuthorizationHeader } from '../lib/Api'
import { navBarHeaderHeight } from '../lib/Constants'

const useStyles = makeStyles(theme => ({
  root: {
    '&.Mui-disabled': {
      backgroundColor: 'transparent !important'
    }
  },
  disabled: {
    backgroundColor: 'transparent'
  },
  menu: {
    borderRadius: '0px',
    height: navBarHeaderHeight,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    alignSelf: 'center'
  },
  menuItem: {
    fontSize: '12px'
  },
  menuIcon: {
    height: '23px',
    color: theme.colors.text
  },
  navBar: {
    backgroundColor: theme.colors.navBarColor,
    height: navBarHeaderHeight,
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100%',
    zIndex: 1000
  },
  icon: {
    color: theme.colors.settings.fieldInfo,
    textAlign: 'center',
    width: '50px',
    height: '22px',
    marginLeft: '8px'
  },
  yesClient: {
    color: theme.palette.primary.light,
    fontWeight: '500',
    fontSize: '20px'
  },
  noClient: {
    color: theme.colors.settings.fieldInfo,
    fontWeight: '500',
    fontSize: '20px'
  },
  bvLabel: {
    color: theme.colors.basicDisabledButtonColor,
    fontWeight: '500',
    fontSize: '14px'
  },
  flexDiv: {
    display: 'flex'
  },
  alertIcon: {
    width: '20px'
  },
  alert: {
    width: '100%'
  },
  alertTypo: {
    fontSize: '16px',
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    width: '100%',
    display: 'flex'
  },
  snackbar: {
    width: '100%',
    padding: '0px 50px'
  },
  logoImage: {
    width: '170px',
    height: navBarHeaderHeight,
    padding: '12px 0',
    objectFit: 'contain'
  },
  finalGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    height: navBarHeaderHeight,
    display: 'flex',
    flexDirection: 'row'
  }
}))

export const NavBar = () => {
  const userStore = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const history = useHistory()

  const [value, setValue] = useState('/work-orders')
  const [anchorEl, setAnchorEl] = useState()
  const isMenuOpen = Boolean(anchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleChangeNavBar = (event, newValue) => {
    setValue(newValue)
    history.push(newValue)
  }

  const handleChangeMenu = route => {
    setAnchorEl(null)
    history.push(route)
  }

  const logoutHandler = () => {
    dispatch(authActions.logout())
    removeAuthorizationHeader()
    history.replace('/')
  }

  const classes = useStyles()

  return (
    <Box pl={3} pr={3} className={classes.navBar}>
      <Grid container className={classes.header}>
        <Grid item xs={9} className={classes.header}>
          <Box
            sx={{
              display: { xs: 'none', md: 'inline-flex' }
            }}
            display={'inline-flex'}
          >
              <StyledNavTabs value={value} onChange={handleChangeNavBar}>
                <StyledNavTab style={{ display: 'none' }} value={''} />
                  <StyledNavTab
                    value={'/work-orders'}
                    label={t('nav_bar.work_orders')}
                    iconPosition="end"
                  />
                  <StyledNavTab
                    value={'/refreshpage'}
                    label={t('nav_bar.locations')}
                  />
                <StyledNavTab
                  style={{ display: 'none' }}
                  value={'/account-settings'}
                />
                <StyledNavTab
                  style={{ display: 'none' }}
                  value={'/company-settings'}
                />
                <StyledNavTab
                  style={{ display: 'none' }}
                  value={'/company-profile'}
                />
              </StyledNavTabs>
          </Box>
        </Grid>
        <Grid align="right" item xs={3} className={classes.finalGrid}>
          {userStore.userInfo.logo?.url && (
            <img
              src={userStore.userInfo.logo?.url}
              className={classes.logoImage}
            />
          )}
          <IconButton
            className={classes.menu}
            edge="end"
            aria-label="account of current user"
            aria-controls={'men1'}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            disableRipple
          >
            <FontAwesomeIcon
              icon={['fal', 'grid']}
              className={classes.menuIcon}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        id={'men1'}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        getContentAnchorEl={null}
      >
        {/* TODO: un hide dropdown options when needed */}
        <MenuItem
          style={{ display: 'none' }}
          className={classes.menuItem}
          value={'/manage-account'}
        >
          {t('nav_bar.manage_account')}
        </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => handleChangeMenu('/account-settings')}
          >
            {t('nav_bar.account_settings')}
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            onClick={() => handleChangeMenu('/company-settings')}
          >
            {t('nav_bar.company_settings')}
          </MenuItem>
        <MenuItem
          style={{ display: 'none' }}
          className={classes.menuItem}
          value={'/help'}
        >
          {t('nav_bar.help')}
        </MenuItem>
        <MenuItem
          style={{ display: 'none' }}
          className={classes.menuItem}
          value={'/send-feedback'}
        >
          {t('nav_bar.send_feedback')}
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={logoutHandler}>
          {t('nav_bar.log_out')}
        </MenuItem>
      </Menu>
    </Box>
  )
}
