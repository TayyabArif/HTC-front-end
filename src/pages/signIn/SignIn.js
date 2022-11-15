import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'

/** Material UI **/
import { BasicButton, HighlightButton, SignInButton } from '../../styles/mui_custom_components'
import { LockOutlined, PersonOutlineOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { Box, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, TextField, Typography, Container } from '@mui/material'

/** Validations **/
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

/** Images **/
import googleIcon from '../../assets/icons/google.svg'
import microsoftIcon from '../../assets/icons/microsoft.svg'
import connectLogo from '../../assets/images/connect_logo.svg'

const useStyles = makeStyles((theme) => ({
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      marginTop: '-50px'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '180px',
      marginTop: '0px'
    }
  },
  connectIcon: {
    width: '627px',
    position: 'relative'
  },
  icon: {
    top: '-1px',
    width: '24px',
    height: '24px',
    position: 'relative'
  },
  iconSpan: {
    width: '24px',
    height: '26px'
  },
  title: {
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px'
    }
  },
  subtitle: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  divider: {
    marginLeft: '0',
    marginTop: '26px',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
      display: 'flex'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  link: {
    fontWeight: '400',
    color: theme.colors.text,
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  linkBox: {
    paddingTop: '10px'
  },
  rememberMe: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  errorMessage: {
    color: theme.colors.errorText,
    fontWeight: '400',
    fontSize: '15px'
  },
  terms: {
    fontWeight: '400',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  linkTerms: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  signWith: {
    width: '100%',
    fontSize: '20px',
    padding: '6px 10px'
  },
  signWithGrid: {
    width: '100%',
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '4px 16px !important'
    },
    [theme.breakpoints.up('md')]: {
      padding: '16px !important'
    }
  },
  boxSignWith: {
    [theme.breakpoints.down('md')]: {
      marginTop: '15px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '40px'
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
      margin: '0px 0px 8px 0px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '16px 0px 8px 0px'
    }
  },
  requestButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '211px'
    }
  },
  singButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '129px'
    }
  }
}))

const SignIn = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [rememberMe, setRemember] = useState(false)

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    email: yup.string().required(t('general.messages.errors.required')).email(t('general.messages.errors.email')),
    password: yup.string().required(t('general.messages.errors.required'))
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async () => {
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

  return (
    <Container>
        <Grid data-testid={'sign_in_page'} container spacing={0} direction='column' alignItems='center' justifyContent='center'>
          <Grid className={classes.mainItem} item xs={12}>
            <Grid container justifyContent='center'>
              <img alt={'Connect AD Platform'} className={classes.connectIcon} src={connectLogo}/>
              <Typography align={'center'} className={classes.signMessage}>
                  {t('sign_in.main_message')}
              </Typography>
            </Grid>

            {/* TODO: buttons not yet needed */}
            <Box className={classes.boxSignWith} hidden={true} >
              <Grid container justifyContent='center' alignItems='center' spacing={4} >
                <Grid item sm={6} className={classes.signWithGrid}>
                  <SignInButton
                    fullWidth
                    className={classes.signWith}
                    type='button'
                    variant='contained'
                    startIcon={<img alt={'google'} className={classes.icon} src={googleIcon}/> }>
                    {t('sign_in.sign_in_google')}
                  </SignInButton>
                </Grid>
                <Grid item sm={6} className={classes.signWithGrid} >
                  <SignInButton
                    fullWidth
                    className={classes.signWith}
                    type='button'
                    variant='contained'
                    startIcon={<img alt={'microsoft'} className={classes.icon} src={microsoftIcon}/>}>
                    {t('sign_in.sign_in_microsoft')}
                  </SignInButton>
                </Grid>
              </Grid>
            </Box>

            <Divider className={classes.divider} variant='inset'/>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                classes={{ root: classes.fields }}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                placeholder={t('sign_in.email_address')}
                name='email'
                autoComplete='off'
                type='text'
                autoFocus
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...register('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineOutlined/>
                    </InputAdornment>
                  ),
                  classes: {
                    notchedOutline: classes.fieldsOutlined
                  }
                }}
                onInput={handleEmailChange}
                value={email}
              />
              <TextField
                classes={{ root: classes.fields }}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                placeholder={t('sign_in.password')}
                type='password'
                id='password'
                autoComplete='current-password'
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                {...register('password')}
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
                onInput={handlePasswordChange}
              />

              <Grid container>
                <Grid item xs >
                  <FormControlLabel classes={{ label: classes.rememberMe }} control={<Checkbox style={{ transform: 'scale(0.6)' }} checked={rememberMe} onChange={handleChangeRemember} color='primary'/>}
                                    label={t('sign_in.remember_me')}/>
                </Grid>
                <Grid item>
                  <Box className={classes.linkBox}>
                    <Link data-testid='forgot_password' className={classes.link} to='/forgot-password' variant='body2'>
                      {t('sign_in.forgot_password')}
                    </Link>
                  </Box>
                </Grid>
              </Grid>

              <Box hidden={!showErrors}>
                <Typography align={'center'} className={classes.errorMessage}>
                  {t('sign_in.messages.wrong_user_password')}
                </Typography>
              </Box>

              <Grid className={classes.buttons} container justifyContent='center' spacing={3}>
                <Grid item xs={7} align="right" >
                  <BasicButton fullWidth data-testid='request_access_button' type='button' variant='contained' onClick={requestAccessClickHandler} >
                    {t('sign_in.request_access')}
                  </BasicButton>
                </Grid>
                <Grid item xs={5}>
                  <HighlightButton id='sign_in_button' data-testid='sign_in_button' disabled={!email || !password} type='submit' variant='contained' >
                    {t('sign_in.sign_in')}
                  </HighlightButton>
                </Grid>
              </Grid>
            </form>

            <Box textAlign='center' pt={2}>
              <Typography component={'span'} align={'center'} className={classes.terms}>
                {t('sign_in.messages.terms_and_conditions')}<br/> <Link to={'FIX ME'} onClick={() => window.open(process.env.REACT_APP_CONDITIONS_URL, '_blank')} className={classes.linkTerms}>{t('sign_in.messages.terms_and_conditions_link')}</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
    </Container>
  )
}

export default SignIn
