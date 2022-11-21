import React from 'react'

/** Redux **/
import { useSelector } from 'react-redux'

/** Material UI **/
import { makeStyles, useTheme } from '@mui/styles'
import { Backdrop, Box, CircularProgress, CssBaseline, Grid, Typography, useMediaQuery } from '@mui/material'

/** Components **/

/** Images **/
import conectadPlatformLogo from '../assets/images/connectad_platform.svg'
import conectadLogo from '../assets/images/connectad_logo.svg'

const pjson = require('../../package.json')

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.colors.backdropColor
  },
  leftImages: {
    height: '100%'
  },
  body: {
    backgroundColor: theme.colors.backdropColor,
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none'
  },
  versionText: {
    fontWeight: '400',
    fontSize: '20px',
    marginLeft: '30px'
  },
  contactText: {
    fontWeight: '400',
    fontSize: '14px'
  }
}))

export const SignInContainer = (props) => {
  const loading = useSelector(state => state.loading.loading)
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  return (
    <div>
      <CssBaseline/>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Grid container>
        <Grid item md={12} padding={isSmall ? 1.5 : 4}>
          <img src={conectadPlatformLogo} alt="Connectad Platform"/>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.body}>
            {props.children}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container justifyContent="right">
            <Grid item xs={12} md={6}>
              <img src={conectadLogo} alt="Connectad Logo"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3} md={8}></Grid>
        <Grid item md={1}>
          <Typography variant={'p'} className={ classes.contactText }>
            Contact us
          </Typography>
        </Grid>
        <Grid item md={1}>
          <Typography variant={'p'} align={'center'} className={classes.versionText}>
            &nbsp;v{pjson.version}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
