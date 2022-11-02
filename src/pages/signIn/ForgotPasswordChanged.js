import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { HighlightButton } from '../../styles/mui_custom_components'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'

/** Redux */
import { useDispatch } from 'react-redux'
import { store } from '../../store'
import { loadingActions } from '../../store/loading'
import { authActions } from '../../store/signIn'

/** Services **/
import { login } from '../../services/AuthService'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: '70vh',
    transform: 'scale(0.80)'
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      margin: '0px 30px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px'
    }
  },
  subtitle: {
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      margin: '10px 30px',
      display: 'block',
      lineHeight: '21px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  resetButton: {
    [theme.breakpoints.down('md')]: {
      width: '60%',
      height: '58px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  buttonGrid: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ForgotPasswordChanged = () => {
  const history = useHistory()
  const authStore = store.getState().auth
  const dispatch = useDispatch()

  const logInClickHandler = async (event) => {
    event.preventDefault()
    try {
      dispatch(loadingActions.show())
      await login(authStore.changedEmail, authStore.changedPass)
      dispatch(authActions.setChangedEmail(null))
      dispatch(authActions.setChangedPass(null))
      dispatch(loadingActions.hide())
    } catch (error) {
      dispatch(authActions.setChangedEmail(null))
      dispatch(authActions.setChangedPass(null))
      dispatch(loadingActions.hide())
      history.push('/sing-in')
    }
  }

  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <SignInContainer>
      <Grid
        data-testid={'forgot_password_changed_page'}
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
                {t('forgot_password_changed.title')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align='center' component="h2" variant="subtitle1" className={classes.subtitle} >
                {t('forgot_password_changed.subtitle_1')}
              </Typography>
            </Grid>

            <Grid className={classes.buttons} container justifyContent="center" spacing={3}>
              <Grid item className={classes.buttonGrid} >
                <HighlightButton
                  data-testid={'log_in'}
                  type="button"
                  variant="contained"
                  onClick={logInClickHandler}
                  className={classes.resetButton}
                >
                  {t('forgot_password_changed.log_in')}
                </HighlightButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SignInContainer>
  )
}

export default ForgotPasswordChanged
