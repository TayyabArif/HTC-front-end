import React from 'react'

/** Material UI **/
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline
} from '@mui/material'
import clsx from 'clsx'

/** Components **/
import { NavBar } from './NavBar'
import { useSelector } from 'react-redux'
import { useWindowSize } from '@react-hook/window-size'

/** Utils */
import { mobileBreakpoint, Routes } from '../lib/Constants'

/** Styles */
import { mainContainerStyles } from '../styles/classes/CommonClasses'

export const MainContainer = props => {
  const [wWidth] = useWindowSize()
  const isMobile = wWidth <= mobileBreakpoint
  const classes = mainContainerStyles()
  const loading = useSelector(state => state.loading.loading)

  return (
    <div style={{ overflowY: 'hidden' }}>
      <CssBaseline />
      <Container
        className={classes.scrollContainer}
        style={{
          minWidth: isMobile ? 'unset' : wWidth > 800 ? '800px' : '1440px',
          overflowY: 'hidden'
        }}
      >
        <Container
          className={window.location.pathname.includes(Routes.WORK_ORDERS.path)
            ? clsx(classes.container, classes.containerScrollHidden)
            : classes.container}>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <NavBar />
          <Box className={
            window.location.pathname.includes(Routes.ACCOUNT_SETTINGS.path) ||
            window.location.pathname.includes(Routes.COMPANY_SETTINGS.path)
              ? clsx(classes.navBarOffset, classes.navBarOffsetSmall)
              : classes.navBarOffset
          }></Box>
          <Box >{props.children}</Box>
        </Container>
      </Container>
    </div>
  )
}
