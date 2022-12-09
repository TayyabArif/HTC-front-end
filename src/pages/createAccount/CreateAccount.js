import React, { useState } from 'react'

/** Material UI **/
import { makeStyles } from '@mui/styles'
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'

/** Redux **/
import { useDispatch } from 'react-redux'

/** Validations **/
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'

import { useTranslation } from 'react-i18next'
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material'
import { RoundedButton } from '../../styles/mui_custom_components'
import { validateEmail } from '../../lib/Global'
import { loadingActions } from '../../store/loading'
import { requestResetPassword } from '../../services/AuthService'
import ReactGA from 'react-ga4'
import { authActions } from '../../store/signIn'

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
  gridContainer: {
    transform: 'scale(0.80)'
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
  title: {
    '&.MuiTypography-root': {
      fontWeight: '700',
      fontFamily: 'Rubik Bold',
      lineHeight: 1.5,
      [theme.breakpoints.down('md')]: {
        fontSize: '24px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '30px'
      }
    }
  },
  customField: {
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
  linkBox: {
    width: 'max-content',
    display: 'flex'
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
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '16px'
  }
}))

const CreateAccount = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [errorApi, setErrorApi] = useState('')
  const [firstName, setFirstName] = useState('')

  const labelStyle = {
    '& label': {
      top: '-8px'
    },
    '& legend': {
      display: 'none'
    }
  }

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    first_name: yup.string().required(t('general.messages.errors.required')),
    last_name: yup.string().required(t('general.messages.errors.required')),
    password: yup.string().required(t('general.messages.errors.required'))
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data) => {
    dispatch(loadingActions.show())
    try {
      const response = await requestResetPassword(firstName)
      if (response && response.status) {
        dispatch(loadingActions.hide())
      } else {
        ReactGA.event({
          category: 'request',
          action: 'create_account_request'
        })
        dispatch(authActions.setChangedEmail(firstName))
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

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
    setErrorApi('')
  }

  return (
      <SignInContainer>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.gridContainer}>
            <Grid className={classes.mainItem} item xs={12}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} textAlign="center">
                        <Typography className={classes.title} >
                            {t('create_account.title').toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} mt={3}>
                        <Typography align='center' className={classes.subtitle} >
                            {t('create_account.subtitle')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box mt={4}>
                            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={12} sm={6}>
                                        <Grid container>
                                          <Grid item xs={11}>
                                            <TextField
                                              label="First Name"
                                              className={classes.customField}
                                              variant="outlined"
                                              margin="normal"
                                              required
                                              fullWidth
                                              id="firstName"
                                              placeholder={t('create_account.firstName')}
                                              name="first_name"
                                              autoComplete="off"
                                              autoFocus
                                              sx={labelStyle}
                                              error={(!!errors.first_name) || (!!errorApi)}
                                              helperText={(errors.first_name && errors.first_name.message) || errorApi}
                                              {...register('first_name')}
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
                                              onInput={handleFirstNameChange}
                                            />
                                          </Grid>
                                        </Grid>
                                    </Grid>
                                  <Grid item xs={12} sm={6}>
                                        <Grid container>
                                          <Grid item xs={11}>
                                            <TextField
                                              className={classes.customField}
                                              variant="outlined"
                                              margin="normal"
                                              required
                                              fullWidth
                                              id="lastName"
                                              placeholder={t('create_account.lastName')}
                                              name="last_name"
                                              autoComplete="off"
                                              autoFocus
                                              error={(!!errors.last_name) || (!!errorApi)}
                                              helperText={(errors.last_name && errors.last_name.message) || errorApi}
                                              {...register('last_name')}
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
                                              onInput={handleFirstNameChange}
                                            />
                                          </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="space-between">
                                    <Grid item xs={12}>
                                        <Grid container>
                                          <Grid item xs={12}>
                                            <TextField
                                              className={classes.customField}
                                              variant="outlined"
                                              margin="normal"
                                              required
                                              fullWidth
                                              id="password"
                                              placeholder={t('create_account.password')}
                                              name="password"
                                              autoComplete="off"
                                              autoFocus
                                              error={(!!errors.password) || (!!errorApi)}
                                              helperText={(errors.password && errors.password.message) || errorApi}
                                              {...register('password')}
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
                                              onInput={handleFirstNameChange}
                                            />
                                          </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="right">
                                    <Grid item xs={12} sm={12} md={2} mt={4}>
                                        <Grid container direction="column">
                                            <Grid align={'center'} item>
                                                <Box className={classes.sendButtonBox}>
                                                    <RoundedButton
                                                        data-testid={'submit_button'}
                                                        disabled={!validateEmail(firstName)}
                                                        className={classes.sendButton}
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        {t('create_account.send')}
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

export default CreateAccount
