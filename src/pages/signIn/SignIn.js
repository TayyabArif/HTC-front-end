import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect } from 'react'

/** Material UI **/
import { BasicButton, HighlightButton, SignInButton } from '../../styles/mui_custom_components'
import { LockOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import { Box, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { SignInContainer } from '../../components/SignInContainer'

/** Validations **/
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/** Images **/
import googleIcon from '../../assets/icons/google.svg'
import microsoftIcon from '../../assets/icons/microsoft.svg'
import connectLogo from '../../assets/images/connect_logo.svg'

/** Redux **/
import { useDispatch } from 'react-redux'
import { loadingActions } from '../../store/loading'
import { authActions } from '../../store/signIn'
import { store } from '../../store'

/** Services **/
import { login } from '../../services/AuthService'
import { LoadingSplash } from '../../components/LoadingSplash'

/** Styles **/
import { signInStyles } from '../../styles/classes/SignInClasses'

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const classes = signInStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [rememberMe, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const authStore = store.getState().auth
    if (authStore.email) {
      setEmail(authStore.email)
      setRemember(true)
    }
  }, [])

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    email: yup.string().required(t('general.messages.errors.sign_in')),
    password: yup.string().required(t('general.messages.errors.sign_in'))
  })

  const { register, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async () => {
    try {
      setLoading(true)
      await login(email, password)
      if (rememberMe) {
        dispatch(authActions.setRemember(email))
      } else {
        const authStore = store.getState().auth
        if (authStore.email) {
          dispatch(authActions.removeRemember())
        }
      }
      dispatch(loadingActions.hide())
    } catch (error) {
      if (error.code === 401 || error.code === 404 || error.code === 500) {
        setShowErrors(true)
      }
      setLoading(false)
    }
  }

  const requestAccessClickHandler = (event) => {
    event.preventDefault()
    history.push('/request-access')
  }

  const handleEmailChange = (event) => {
    setShowErrors(false)
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setShowErrors(false)
    setPassword(event.target.value)
  }

  const handleChangeRemember = (event) => {
    setRemember(!rememberMe)
  }

  return loading
    ? <LoadingSplash />
    : <SignInContainer screen="sign_in">
      <Grid data-testid={'sign_in_page'} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Grid className={classes.mainItem} item xs={12} mt={{ xs: 9, md: 18 }}>
          <Grid container justifyContent='center'>
            <Grid item xs={11}>
              <img alt={'Connect AD Platform'} className={classes.connectIcon} src={connectLogo}/>
            </Grid>
          </Grid>
          <Grid container justifyContent='center'>
            <Typography align={'center'} classes={{ root: classes.signMessage }}>
              {t('sign_in.main_message')}
            </Typography>
          </Grid>
          <Divider classes={{ root: classes.signDivider }} />
          {/* TODO: buttons not yet needed */}
          <Box className={classes.boxSignWith} hidden>
            <Grid container spacing={4} >
              <Grid item sm={5.8} className={classes.signWithGrid}>
                <SignInButton
                  fullWidth
                  className={classes.signWith}
                  type='button'
                  variant='contained'
                  startIcon={<img alt={'google'} className={classes.icon} src={googleIcon} />}>
                  {t('sign_in.sign_in_google')}
                </SignInButton>
              </Grid>
              <Grid item sm={6.2} className={classes.signWithGrid} >
                <SignInButton
                  fullWidth
                  className={classes.signWith}
                  type='button'
                  variant='contained'
                  startIcon={<img alt={'microsoft'} className={classes.icon} src={microsoftIcon} />}>
                  {t('sign_in.sign_in_microsoft')}
                </SignInButton>
              </Grid>
            </Grid>
          </Box>
          <form className={classes.signForm} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box alignItems="center" alignContent="center" textAlign={'center'} justifyContent="center" >
              <TextField
                classes={{ root: classes.fields }}
                variant='outlined'
                margin='normal'
                required
                id='email'
                placeholder={t('sign_in.email_address')}
                name='email'
                autoComplete='off'
                type='text'
                autoFocus
                FormHelperTextProps={{
                  classes: {
                    root: classes.errorMessage,
                    error: classes.errorMessage
                  }
                }}
                {...register('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineOutlined style={{ fontSize: '20px' }} />
                    </InputAdornment>
                  ),
                  classes: {
                    notchedOutline: classes.fieldsOutlined
                  }
                }}
                onInput={handleEmailChange}
                value={email}
              />
              </Box>
              <Box alignItems="center" alignContent="center" textAlign={'center'} justifyContent="center" >
              <TextField
                classes={{ root: classes.fields }}
                variant='outlined'
                margin='normal'
                required
                name='password'
                placeholder={t('sign_in.password')}
                type='password'
                id='password'
                autoComplete='new-password'
                FormHelperTextProps={{
                  classes: {
                    root: classes.errorMessage,
                    error: classes.errorMessage
                  }
                }}
                {...register('password')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockOutlined style={{ fontSize: '20px' }} />
                    </InputAdornment>
                  ),
                  classes: {
                    notchedOutline: classes.fieldsOutlined
                  }
                }}
                onInput={handlePasswordChange}
              />
            </Box>
            <Box hidden={!showErrors} margin="0px auto" >
              <Typography align={'left'} className={classes.errorMessage}>
                {t('sign_in.messages.wrong_user_password')}
              </Typography>
            </Box>

            <Grid container className={classes.rememberForgot}>
              <Grid item xs >
                <FormControlLabel classes={{ label: classes.rememberMe }} control={<Checkbox style={{ transform: 'scale(0.6)' }} checked={rememberMe} onChange={handleChangeRemember} color='primary' />}
                  label={t('sign_in.remember_me')} />
              </Grid>
              <Grid item>
                <Box className={classes.linkBox}>
                  <Link data-testid='forgot_password' className={classes.link} to='/forgot-password' variant='body2'>
                    {t('sign_in.forgot_password')}
                  </Link>
                </Box>
              </Grid>
            </Grid>

            <Box textAlign='center' pt={2}>
              <Typography component={'span'} align={'center'} className={classes.terms}>
                {t('sign_in.messages.terms_and_conditions')} <Link onClick={() => window.open(process.env.REACT_APP_FTC_TERMS_OF_SERVICE_URL, '_blank', 'noopener,noreferrer')} className={classes.linkTerms}>{t('sign_in.messages.terms_and_conditions_link')}</Link>
              </Typography>
            </Box>

            <Grid className={classes.buttons} container justifyContent='center' >
              <Grid item xs={7} >
                <BasicButton fullWidth data-testid='request_access_button' type='button' variant='contained' onClick={requestAccessClickHandler}>
                  {t('sign_in.request_access')}
                </BasicButton>
              </Grid>
              <Grid item xs={5} textAlign={'end'}>
                <HighlightButton id='sign_in_button' data-testid='sign_in_button' disabled={!email || !password} type="submit" variant='contained' >
                  {t('sign_in.sign_in')}
                </HighlightButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </SignInContainer>
}

export default SignIn
