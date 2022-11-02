import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { HighlightButton } from '../../styles/mui_custom_components'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'
import { Box } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: '70vh',
    transform: 'scale(0.80)'
  },
  title: {
    fontWeight: '700',
    fontSize: '40px'
  },
  subtitle: {
    fontWeight: '400',
    fontSize: '20px'
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  buttonLog: {
    width: '100%'
  }
}))

const ForgotPasswordEmailSent = () => {
  const history = useHistory()

  const logInClickHandler = (event) => {
    event.preventDefault()
    history.push('/sign-in')
  }

  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <SignInContainer>
      <Grid
        data-testid={'forgot_password_sent'}
        className={classes.mainGrid}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >

        <Grid item xs={12}>

          <Grid container justifyContent='center' alignItems='center'>

            <Grid item xs={12}>
              <Typography align='center' className={classes.title} component="h4" variant="h4">
                {t('forgot_password.email_sent.title')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align='center' className={classes.subtitle} component="h2" variant="subtitle1">
                {t('forgot_password.email_sent.subtitle_1')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box pt={2}>
                <Typography align='center' className={classes.subtitle} component="h2" variant="subtitle2">
                  {t('forgot_password.email_sent.subtitle_2')}
                </Typography>
              </Box>
            </Grid>

            <Grid className={classes.buttons} container justifyContent="center" spacing={3}>
                <HighlightButton
                  data-testid={'log_in'}
                  type="button"
                  variant="contained"
                  onClick={logInClickHandler}
                  className={classes.buttonLog}
                >
                  {t('forgot_password.email_sent.log_in')}
                </HighlightButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SignInContainer>
  )
}

export default ForgotPasswordEmailSent
