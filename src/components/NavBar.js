import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

/** Redux **/
import { authActions } from '../store/signIn'
import { useDispatch, useSelector } from 'react-redux'

/** Material UI **/
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Link
} from '@mui/material'
import { StyledNavTab, StyledNavTabs } from '../styles/mui_custom_components'

/** Services **/
import { removeAuthorizationHeader } from '../lib/Api'

/** Icons */
import GridIcon from '../assets/icons/grid_icon.svg'
import AcmeIcon from '../assets/images/acme_logo.svg'

/** Styles */
import { navBarStyles } from '../styles/classes/CommonClasses'
import { Typography } from 'antd'

export const NavBar = () => {
  const classes = navBarStyles()
  const userStore = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const location = useLocation()

  const { t } = useTranslation()
  const history = useHistory()

  const [value, setValue] = useState('/work-orders')
  const [anchorEl, setAnchorEl] = useState()
  const isMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    // set navbar value
    if (location.pathname === '/') {
      history.push('/work-orders')
    } else if (location.pathname === '/sign-in') {
      setValue('/work-orders')
    } else if (location.pathname === '/createInvoice') {
      setValue('/invoices')
    } else {
      setValue(location.pathname)
    }
  }, [location.pathname])

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleChangeNavBar = (event, newValue) => {
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
            <Box className={classes.boxLogo} pt={1} pr={2} display={'inline-flex'}>
              <Link data-testid='bv-logo' to='/' className={classes.logoLink} >
                <img className={classes.logo} src={AcmeIcon} />
              </Link>
            </Box>
            <StyledNavTabs value={value} onChange={handleChangeNavBar}>
              <StyledNavTab style={{ display: 'none' }} value={''} />
              <StyledNavTab
                value={'/work-orders'}
                label={t('nav_bar.work_orders')}
                iconPosition="end"
              />
              <StyledNavTab
                style={{ display: 'none' }}
                value={'/locations'}
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
          {userStore?.userInfo?.company_name && (
            <Typography className={classes.companyName} >
              {userStore.userInfo.company_name}
            </Typography>
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
            <img src={GridIcon} className={classes.menuIcon} />
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