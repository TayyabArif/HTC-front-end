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

/** Redux **/
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    backgroundColor: theme.colors.mainContainerBackground,
    paddingLeft: '0px',
    paddingRight: '0px',
    overflowY: 'auto'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.colors.backdropColor
  }
}))

export const MainContainer = props => {
  const classes = useStyles()
  const loading = useSelector(state => state.loading.loading)

  return (
        <div>
            <CssBaseline />
            <Container
                className={classes.container}
                maxWidth={false}
                style={{
                  backgroundColor: props.backgroundColor
                    ? props.backgroundColor
                    : 'inherit'
                }}
            >
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box className={classes.navBarOffset}></Box>
                <Box>{props.children}</Box>
            </Container>
        </div>
  )
}
