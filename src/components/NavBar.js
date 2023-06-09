import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

/** Redux **/
import { authActions } from '../store/signIn'
import { useDispatch, useSelector } from 'react-redux'

/** Material UI **/
import { Box, Grid, IconButton, Menu, MenuItem, Link } from '@mui/material'
import { StyledNavTab, StyledNavTabs } from '../styles/mui_custom_components'

/** Services **/
import { removeAuthorizationHeader } from '../lib/Api'

/** Icons **/
import GridIcon from '../assets/icons/grid_icon.svg'
import ADLogo from '../assets/images/ADLogo.svg'

/** Styles */
import { navBarStyles } from '../styles/classes/CommonClasses'
import { Typography } from 'antd'

/** Redux **/
import { locationsActions } from '../store/locations'

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
    // back to site view if navigate between pages
    dispatch(
      locationsActions.showMapSiteView({
        coordinates: {
          lat: 40.175472,
          lng: -101.466083
        },
        zoom: 5,
        hideMarkers: false,
        selectedMarkerIndex: null
      })
    )
    dispatch(locationsActions.setActiveInfoWindow(null))
    dispatch(locationsActions.hideSiteViewPanel())
    dispatch(locationsActions.hideSiteViewPanel())
    dispatch(locationsActions.setSelectedSite())
    dispatch(locationsActions.setSelectedWorkOrder(null))
    // set navbar value
    if (location.pathname === '/sign-in') {
      setValue('/dashboard')
      dispatch(authActions.setRedirect('/dashboard'))
    } else if (location.pathname === '/createInvoice') {
      setValue('/invoices')
      dispatch(authActions.setRedirect('/invoices'))
    } else {
      setValue(location.pathname)
      dispatch(authActions.setRedirect(location.pathname))
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

  const currentTextColor = () => {
    return location.pathname === '/company-settings' ||
      location.pathname === '/account-settings'
      ? 'textGray'
      : 'text'
  }

  const getCompanyLogo = () => {
    if (!userStore?.userInfo?.logo?.url) {
      return ADLogo
    }
    return userStore.userInfo.logo?.url
  }

  return (
    <Box pl={3} pr={3} className={classes.navBar}>
      <Grid container className={classes.header}>
        {/** Browser navigation tabs */}
        <Grid item xs={9} className={classes.gridBrowser}>
          <Box display="flex">
            <Box
              className={classes.boxLogo}
              pt={1}
              pr={2}
              display={'inline-flex'}
            >
              <Link data-testid="bv-logo" to="/" className={classes.logoLink}>
                <img className={classes.logo} src={getCompanyLogo()} />
              </Link>
            </Box>
            <StyledNavTabs
              value={value}
              onChange={handleChangeNavBar}
              className={classes.tabs}
            >
              <StyledNavTab style={{ display: 'none' }} value={''} />
              <StyledNavTab
                value={'/dashboard'}
                label={t('nav_bar.dashboard')}
                color={currentTextColor()}
              />
              <StyledNavTab
                value={'/work-orders'}
                label={t('nav_bar.work_orders')}
                iconPosition="end"
                color={currentTextColor()}
              />
              <StyledNavTab
                value={'/locations'}
                label={t('nav_bar.locations')}
                color={currentTextColor()}
              />
              <StyledNavTab
                style={{ display: 'none' }}
                value={'/account-settings'}
                color={currentTextColor()}
              />
              <StyledNavTab
                style={{ display: 'none' }}
                value={'/company-settings'}
                color={currentTextColor()}
              />
              <StyledNavTab
                style={{ display: 'none' }}
                value={'/company-profile'}
                color={currentTextColor()}
              />
            </StyledNavTabs>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} className={classes.finalGrid}>
          <Link data-testid="bv-logo" to="/" className={classes.logoLinkMobile}>
            <img className={classes.logoMobile} src={getCompanyLogo()} />
          </Link>
          {userStore?.userInfo?.company_name && (
            <Typography className={classes.companyName}>
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
          className={
            value === '/dashboard'
              ? classes.selectedMobile
              : classes.menuItemMobile
          }
          onClick={() => handleChangeMenu('/dashboard')}
        >
          {t('nav_bar.dashboard')}
        </MenuItem>
        <MenuItem
          className={
            value === '/work-orders'
              ? classes.selectedMobile
              : classes.menuItemMobile
          }
          onClick={() => handleChangeMenu('/work-orders')}
        >
          {t('nav_bar.work_orders')}
        </MenuItem>
        <MenuItem
          className={
            value === '/locations'
              ? classes.selectedMobile
              : classes.menuItemMobile
          }
          onClick={() => handleChangeMenu('/locations')}
        >
          {t('nav_bar.locations')}
        </MenuItem>
        <MenuItem
          style={{ display: 'none' }}
          className={
            value === '/manage-account'
              ? classes.selectedItem
              : classes.menuItem
          }
          value={'/manage-account'}
        >
          {t('nav_bar.manage_account')}
        </MenuItem>
        <MenuItem
          className={
            value === '/account-settings'
              ? classes.selectedItem
              : classes.menuItem
          }
          onClick={() => handleChangeMenu('/account-settings')}
        >
          {t('nav_bar.account_settings')}
        </MenuItem>
        <MenuItem
          className={
            value === '/company-settings'
              ? classes.selectedItem
              : classes.menuItem
          }
          onClick={() => handleChangeMenu('/company-settings')}
        >
          {t('nav_bar.company_settings')}
        </MenuItem>
        <MenuItem
          style={{ display: 'none' }}
          className={
            value === '/help' ? classes.selectedItem : classes.menuItem
          }
          value={'/help'}
        >
          {t('nav_bar.help')}
        </MenuItem>
        <MenuItem
          style={{ display: 'none' }}
          className={
            value === '/send-feedback' ? classes.selectedItem : classes.menuItem
          }
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
