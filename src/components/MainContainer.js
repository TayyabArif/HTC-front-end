import React from 'react'

/** Material UI **/
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  CssBaseline
} from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Components **/
import { NavBar } from './NavBar'
import { useSelector } from 'react-redux'
import { useWindowSize } from '@react-hook/window-size'

/** Utils */
import { navBarHeaderHeight, mobileBreakpoint } from '../lib/Constants'

const useStyles = makeStyles(theme => ({
  scrollContainer: {
    margin: '0px',
    padding: '0px',
    maxWidth: '100%',
    maxHeight: '100%',
    overflowY: 'auto'
  },
  container: {
    height: '100vh',
    backgroundColor: theme.colors.mainContainerBackground,
    paddingLeft: '0px',
    paddingRight: '0px',
    margin: '0px',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px'
    },
    [theme.breakpoints.down('md')]: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      touchAction: 'pan-y'
    },
    [theme.breakpoints.up('md')]: {
      overflowY: 'auto'
    }
  },
  backdrop: {
    zIndex: 5000,
    color: theme.colors.backdropColor
  },
  navBarOffset: {
    height: navBarHeaderHeight
  }
}))

export const MainContainer = props => {
  const [wWidth] = useWindowSize()
  const isMobile = wWidth <= mobileBreakpoint
  const classes = useStyles()
  const loading = useSelector(state => state.loading.loading)

  return (
    <div>
      <CssBaseline />
      <Container
        className={classes.scrollContainer}
        style={{
          minWidth: isMobile ? 'unset' : wWidth > 800 ? '800px' : '1440px'
        }}
      >
        <Container className={classes.container}>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <NavBar />
          <Box className={classes.navBarOffset}></Box>
          <Box>{props.children}</Box>
        </Container>
      </Container>
    </div>
  )
}
