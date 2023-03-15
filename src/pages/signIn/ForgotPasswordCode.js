import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'

/** Material UI **/
import { HighlightButton } from '../../styles/mui_custom_components'
import { LockOutlined } from '@mui/icons-material'
import { FormHelperText, Grid, InputAdornment, TextField, Typography } from '@mui/material'
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
    '& fieldset': {
      borderRadius: '40px',
      border: `1px solid ${theme.colors.inputBorder}`,
      borderWidth: '1px'
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
  const [error, setError] = useState()
  const [enableSave, setEnableSave] = useState()

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    new_password: yup.string()
      .required(t('general.messages.errors.required'))
      .min(6, t('forgot_password_code.min_6_chars'))
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    let save = true
    if (!newPassword || errors?.new_password?.message) {
      save = false
    }
    setEnableSave(save)
  }, [newPassword, errors])

  const onSubmit = async () => {
    try {
      dispatch(loadingActions.show())
      const queryParams = new URLSearchParams(window.location.search)
      const selector = queryParams.get('selector')
      const token = queryParams.get('token')
      const apiToken = queryParams.get('apiToken')
      const username = queryParams.get('u')
      await resetPassword(selector, token, newPassword, newPassword, apiToken)
      await login(username, newPassword)
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
  const onError = (errors, e) => console.error(errors, e)

  return (
    <SignInContainer>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit, onError)}>
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
              <Grid container className={classes.formBox}>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.fields}
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      type='password'
                      id='new_password'
                      placeholder={t('forgot_password_code.new_password')}
                      autoComplete='new-password'
                      name='new_password'
                      inputProps={{
                        minLength: 6
                      }}
                      error={!!errors.new_password}
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
                      onKeyUp={handleNewPasswordChange}
                    />
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} md={8}>
              <Grid container>
                <Grid item xs={12}>
                  <FormHelperText>
                    {error || (errors.new_password && errors.new_password.message)
                      ? <Typography align={'left'} className={classes.errorMessage} variant="p">
                        {error || errors.new_password.message}
                      </Typography>
                      : <Typography align={'left'} className={classes.errorMessage} variant="p"><br/></Typography>}
                  </FormHelperText>
                </Grid>
                <Grid item className={classes.buttonGrid} >
                  <HighlightButton className={classes.resetButton} data-testid={'submit_button'} disabled={!enableSave} type='submit' variant='contained' onClick={onSubmit} >
                    {t('forgot_password_code.reset_password')}
                  </HighlightButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </form>
    </SignInContainer>
  )
}

export default ForgotPasswordCode
