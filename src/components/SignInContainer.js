import React from 'react'
import { useTranslation } from 'react-i18next'

/** Redux **/
import { useSelector } from 'react-redux'

/** Material UI **/
import { makeStyles } from '@mui/styles'
import { Container, Backdrop, Box, CircularProgress, CssBaseline, Grid, Typography } from '@mui/material'

/** Components **/
import { useWindowSize } from '@react-hook/window-size'

/** Images **/
import conectadPlatformLogo from '../assets/images/connectad_platform.svg'
import conectadLogo from '../assets/images/connectad_logo.svg'

/** Utils */
import { mobileBreakpoint } from '../lib/Constants'

const pjson = require('../../package.json')

const useStyles = makeStyles((theme) => ({
  scrollContainer: {
    margin: '0px !important',
    padding: '0px !important',
    maxWidth: '100%',
    height: '100%',
    overflowY: 'auto',
    position: 'fixed',
    display: 'flex'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.colors.backdropColor
  },
  leftImages: {
    height: '100%'
  },
  body: {
    width: '100%',
    backgroundColor: theme.colors.backdropColor,
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none'
  },
  versionText: {
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    },
    marginTop: 'auto',
    marginRight: '20px',
    fontWeight: '400',
    marginLeft: '30px'
  },
  contactText: {
    minWidth: '70px',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '10px'
    },
    marginTop: 'auto',
    fontWeight: '400',
    '&:hover': {
      textDecoration: 'underline'
    },
    cursor: 'pointer'
  },
  footerContainer: {
    bottom: 30,
    position: 'relative',
    '& img': {
      width: '100%'
    }
  },
  bottomBox: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      padding: '0px 12% 30px 12%'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px',
      width: '100%',
      marginTop: 'auto'
    }
  },
  bottomTypos: {
    marginLeft: 'auto',
    display: 'flex'
  },
  bottomLogo: {
    [theme.breakpoints.up('md')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      width: '50%'
    }
  },
  logoGrid: {
    [theme.breakpoints.up('md')]: {
      padding: '4%',
      textAlign: 'left'
    },
    [theme.breakpoints.down('md')]: {
      padding: '10%  0px',
      textAlign: 'center',
      margin: '0px auto'
    }
  }
}))

export const SignInContainer = (props) => {
  const { t } = useTranslation()
  const loading = useSelector(state => state.loading.loading)
  const classes = useStyles()
  const [wWidth] = useWindowSize()
  const isMobile = wWidth <= mobileBreakpoint

  return (
    <div>
      <CssBaseline />
      <Container
        className={classes.scrollContainer}
        style={{
          minWidth: isMobile ? 'unset' : wWidth > 800 ? '800px' : '1440px'
        }}
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container>
          {!(props.screen && props.screen === 'sign_in') && <Grid item md={12} className={classes.logoGrid}>
            <img src={conectadPlatformLogo} alt="Connectad Platform" />
          </Grid>}
          <Grid xs={12}>
            <Box className={classes.body}>
              {props.children}
            </Box>
          </Grid>
          <Box fullWidth className={classes.bottomBox} >
            <Box >
              <img src={conectadLogo} alt="Connectad Logo" className={classes.bottomLogo} />
            </Box>
            <Box className={classes.bottomTypos} >
              <Typography variant={'p'} className={classes.contactText}>
                {t('sign_in.contact_us')}
              </Typography>
              <Typography variant={'p'} align={'center'} className={classes.versionText}>
                &nbsp;v{pjson.version}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Container>
    </div>
  )
}
