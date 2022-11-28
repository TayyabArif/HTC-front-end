import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/** Redux **/
import { useDispatch } from 'react-redux'
import { loadingActions } from '../../store/loading'
import { authActions } from '../../store/signIn'

/** Material UI **/
import { ChevronLeft as ChevronLeftIcon, PersonOutline as PersonOutlineIcon } from '@mui/icons-material'
import { RoundedButton } from '../../styles/mui_custom_components'
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Validations **/
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateEmail } from '../../lib/Global'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'
import { requestResetPassword } from '../../services/AuthService'
import ReactGA from 'react-ga4'

const useStyles = makeStyles((theme) => ({
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1em'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '4em'
    }
  },
  subtitle: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      display: 'block',
      lineHeight: '21px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '16px'
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      lineHeight: '36px',
      [theme.breakpoints.down('md')]: {
        fontSize: '24px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '30px'
      }
    }
  },
  emailField: {
    marginTop: '0px',
    fontSize: '20px',
    fontWeight: '400',
    '& .MuiOutlinedInput-root': {
      borderRadius: '40px',
      '&.Mui-focused fieldset': {
        borderColor: theme.colors.inputBorder,
        borderWidth: '1px'
      }
    }
  },
  sendButton: {
    height: '61px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '5em'
    }
  },
  sendButtonBox: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginTop: '0px',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '-10px'
    }
  },
  linkBox: {
    width: 'max-content',
    display: 'flex'
  },
  fieldsOutlined: {
    [theme.breakpoints.down('md')]: {
      borderRadius: '4px'
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: '4px 0px 0px 4px',
      borderRight: 'none'
    },
    fontSize: '24px'
  },
  gridContainer: {
    transform: 'scale(0.80)'
  }
}))

const ForgotPassword = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errorApi, setErrorApi] = useState('')

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    email: yup.string().required(t('general.messages.errors.required')).email(t('general.messages.errors.email'))
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data) => {
    dispatch(loadingActions.show())
    try {
      const response = await requestResetPassword(email)
      if (response && response.status) {
        dispatch(loadingActions.hide())
      } else {
        ReactGA.event({
          category: 'request',
          action: 'forgot_password_request'
        })
        dispatch(authActions.setChangedEmail(email))
        dispatch(loadingActions.hide())
        history.replace('/forgot-password/sent')
      }
    } catch (error) {
      dispatch(loadingActions.hide())
      if (error.code === 404) {
        setErrorApi(t('forgot_password.email_not_found'))
      }
      console.error(error)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setErrorApi('')
  }

  return (
    <SignInContainer>
      <Grid
        data-testid={'forgot_password_page'}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.gridContainer}
      >
        <Grid className={classes.mainItem} item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} textAlign="center">
              <Typography className={classes.title} >
                {t('forgot_password.title').toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Typography align='center' className={classes.subtitle} >
                {t('forgot_password.subtitle_1')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box mt={4}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Grid container justifyContent="center">
                    <Grid item xs={12} sm={12} md={10}>
                      <TextField
                        className={classes.emailField}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder={t('forgot_password.email')}
                        name="email"
                        autoComplete="off"
                        autoFocus
                        error={(!!errors.email) || (!!errorApi)}
                        helperText={(errors.email && errors.email.message) || errorApi}
                        {...register('email')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon/>
                            </InputAdornment>
                          ),
                          classes: {
                            notchedOutline: classes.fieldsOutlined
                          }
                        }}
                        onInput={handleEmailChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="left">
                    <Grid align={'left'} item>
                      <Box pt={2} className={classes.linkBox}>
                        <ChevronLeftIcon />
                        <Link data-testid={'back_log_in'} className={classes.link} to="/sign-in" variant="body2">
                          {t('forgot_password.back_to_log_in')}
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="right">
                    <Grid item xs={12} sm={12} md={3}>
                      <Grid container direction="column">
                        <Grid align={'center'} item>
                          <Box className={classes.sendButtonBox}>
                            <RoundedButton
                                data-testid={'submit_button'}
                                disabled={!validateEmail(email)}
                                className={classes.sendButton}
                                type="submit"
                                variant="contained"
                            >
                              {t('forgot_password.send')}
                            </RoundedButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SignInContainer>
  )
}

export default ForgotPassword
