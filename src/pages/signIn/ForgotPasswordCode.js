import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'

/** Material UI **/
import { HighlightButton } from '../../styles/mui_custom_components'
import { LockOutlined } from '@material-ui/icons'
import { Box, Grid, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core'

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
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      marginBottom: '10px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px'
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
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.colors.inputBorder,
        borderWidth: '1px'
      }
    },
    [theme.breakpoints.down('md')]: {
      margin: '4px 0px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '16px 0px 8px 0px'
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
    color: theme.colors.errorText,
    fontWeight: '400',
    fontSize: '15px'
  }
}))

const ForgotPasswordCode = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [newPassword, setNewPassword] = useState('')
  const [reEnterNewPassword, setReEnterNewPassword] = useState('')
  const authStore = store.getState().auth
  const [error, setError] = useState()

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    code: yup.string().required(t('general.messages.errors.required')),
    new_password: yup.string().required(t('general.messages.errors.required')).test('len', t('forgot_password_code.min_6_chars'), (val) => val.toString().length >= 6),
    re_enter_new_password: yup.string().required(t('general.messages.errors.required')).oneOf([yup.ref('new_password'), null], t('general.messages.errors.password_does_not_match'))
      .test('len', t('forgot_password_code.min_6_chars'), (val) => val.toString().length >= 6)
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
      await resetPassword(selector, token, newPassword, reEnterNewPassword, apiToken)
      await login(authStore.changedEmail, newPassword)
      dispatch(loadingActions.hide())
    } catch (error) {
      console.error(error)
      if (error.data && error.data === 'Password Already Used') {
        setError(t('forgot_password_code.error_message'))
      }
      dispatch(loadingActions.hide())
    }
  }

  const handleNewPasswordChange = (event) => {
    setError(null)
    setNewPassword(event.target.value)
  }

  const handleReEnterNewPasswordChange = (event) => {
    setError(null)
    setReEnterNewPassword(event.target.value)
  }

  return (
    <SignInContainer>
      <Grid data-testid={'forgot_password_code_page'} className={classes.mainGrid} container spacing={0} direction='column' alignItems='center'>
        <Grid className={classes.mainItem} item xs={12}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12}>
              <Typography align='center' className={classes.title} component='h4' variant='h4'>
                {t('forgot_password_code.title')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.formBox} >
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    classes={{ root: classes.fields }}
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
                  <TextField
                    classes={{ root: classes.fields }}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    type='password'
                    name='re_enter_new_password'
                    placeholder={t('forgot_password_code.re_enter_new_password')}
                    autoComplete='off'
                    id='re_enter_new_password'
                    inputProps={{
                      minLength: 6
                    }}
                    error={!!errors.re_enter_new_password}
                    helperText={errors.re_enter_new_password && errors.re_enter_new_password.message}
                    {...register('re_enter_new_password')}
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
                    onInput={handleReEnterNewPasswordChange}
                  />
                  <Box hidden={error === null}>
                    <Typography align={'left'} className={classes.errorMessage}>
                      {error}
                    </Typography>
                  </Box>
                  <Grid className={classes.buttons} container justifyContent='flex-end' spacing={3}>
                    <Grid item className={classes.buttonGrid} >
                      <HighlightButton className={classes.resetButton} data-testid={'submit_button'} disabled={!newPassword || !reEnterNewPassword || newPassword !== reEnterNewPassword} type='submit' variant='contained' onClick={onSubmit} >
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
