import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Grid, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'

const useStyles = makeStyles((theme) => ({
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontWeight: '700',
      fontSize: '26px'
    }
  },
  subtitle: {
    '&.MuiTypography-root': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '17px',
      whiteSpace: 'pre-line'
    }
  },
  linkBox: {
    width: 'max-content',
    display: 'flex'
  },
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '14px'
  }
}))

const ForgotPasswordEmailSent = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <SignInContainer>
      <Grid
        data-testid={'forgot_password_sent'}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" >
            <Grid item xs={12} mt={20} textAlign="center">
              <Typography align='center' className={classes.title}>
                {t('forgot_password.email_sent.title').toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center" mt={4}>
              <Typography align='center' className={classes.subtitle}>
                {t('forgot_password.email_sent.subtitle_1')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={10} p={3} mt={3}>
              <Divider/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={1} display={{ xs: 'none', lg: 'block' }}></Grid>
            <Grid item xs={12} md={11}>
              <Box pt={1} className={classes.linkBox}>
                <ChevronLeftIcon />
                <Link data-testid={'back_log_in'} className={classes.link} to="/sign-in" variant="body2">
                  {t('forgot_password.back_to_log_in')}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SignInContainer>
  )
}

export default ForgotPasswordEmailSent
