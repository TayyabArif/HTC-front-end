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
import { StyledNavTab, StyledNavTabs } from '../styles/mui_custom_components'

/** Services **/
import { removeAuthorizationHeader } from '../lib/Api'

/** Icons */
import GridIcon from '../assets/icons/grid_icon.svg'

/** Styles */
import { navBarStyles } from '../styles/classes/CommonClasses'

export const NavBar = () => {
  const classes = navBarStyles()
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
