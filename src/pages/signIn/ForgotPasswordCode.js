import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'

/** Material UI **/
import { HighlightButton } from '../../styles/mui_custom_components'
import { LockOutlined } from '@mui/icons-material'
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'

/** Validations **/
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

/** Redux **/
import { useDispatch } from 'react-redux'
import { loadingActions } from '../../store/loading'
import { store } from '../../store'

/** Services **/
import { resetPassword, login } from '../../services/AuthService'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: '70vh',
    transform: 'scale(0.80)'
  },
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1em'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '4em'
    }
  },
  icon: {
    width: '1em',
    position: 'relative',
    top: '-4px'
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontWeight: '700',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
        marginBottom: '10px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '30px'
      }
    }
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  fieldsOutlined: {
    borderRadius: '4px'
  },
  formBox: {
    [theme.breakpoints.down('md')]: {
      marginTop: '0px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '32px'
    }
  },
  fields: {
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
  resetButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '58px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  buttonGrid: {
    width: '100%',
    textAlign: 'right'
  },
  errorMessage: {
    '&.MuiTypography-root': {
      color: theme.colors.errorText,
      fontWeight: '400',
      fontSize: '15px'
    }
  }
}))

const ForgotPasswordCode = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [newPassword, setNewPassword] = useState('')
  const authStore = store.getState().auth
  const [error, setError] = useState()

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    code: yup.string().required(t('general.messages.errors.required')),
    new_password: yup.string().required(t('general.messages.errors.required')).test('len', t('forgot_password_code.min_6_chars'), (val) => val.toString().length >= 6)
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async () => {
    try {
      dispatch(loadingActions.show())
      const queryParams = new URLSearchParams(window.location.search)
      const selector = queryParams.get('selector')
      const token = queryParams.get('token')
      const apiToken = queryParams.get('apiToken')
      await resetPassword(selector, token, newPassword, newPassword, apiToken)
      await login(authStore.changedEmail, newPassword)
      dispatch(loadingActions.hide())
    } catch (error) {
      console.error(error)
      switch (error.message) {
        case 'Invalid Password':
          setError(t('forgot_password_code.invalid_password'))
          break
        case 'Invalid Token':
          setError(t('forgot_password_code.invalid_token'))
          break
      }
      dispatch(loadingActions.hide())
    }
  }

  const handleNewPasswordChange = (event) => {
    setError(null)
    setNewPassword(event.target.value)
  }

  return (
    <SignInContainer>
      <Grid data-testid={'forgot_password_code_page'} className={classes.mainGrid} container spacing={0} direction='column' alignItems='center'>
        <Grid className={classes.mainItem} item xs={12}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} textAlign="center">
              <Typography align='center' className={classes.title} variant='p'>
                {t('forgot_password_code.title').toUpperCase()}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Typography align='center' className={classes.subtitle} >
                {t('forgot_password_code.subtitle')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box className={classes.formBox} >
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    className={classes.fields}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    type='password'
                    id='new_password'
                    placeholder={t('forgot_password_code.new_password')}
                    autoComplete='off'
                    name='new_password'
                    inputProps={{
                      minLength: 6
                    }}
                    error={!!errors.new_password}
                    helperText={errors.new_password && errors.new_password.message}
                    {...register('new_password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LockOutlined/>
                        </InputAdornment>
                      ),
                      classes: {
                        notchedOutline: classes.fieldsOutlined
                      }
                    }}
                    onInput={handleNewPasswordChange}
                  />
                  <Box hidden={error === null}>
                    <Typography align={'left'} className={classes.errorMessage}>
                      {error}
                    </Typography>
                  </Box>
                  <Grid className={classes.buttons} container justifyContent='flex-end' spacing={3} mt={2}>
                    <Grid item className={classes.buttonGrid} >
                      <HighlightButton className={classes.resetButton} data-testid={'submit_button'} disabled={!newPassword} type='submit' variant='contained' onClick={onSubmit} >
                        {t('forgot_password_code.reset_password')}
                      </HighlightButton>
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

export default ForgotPasswordCode
