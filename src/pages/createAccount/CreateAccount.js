import React, { useEffect, useState } from 'react'

/** Material UI **/
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material'

/** Validations **/
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

/** Components **/
import { SignInContainer } from '../../components/SignInContainer'

import { useTranslation } from 'react-i18next'
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material'
import { RoundedButton } from '../../styles/mui_custom_components'
import { LoadingSplash } from '../../components/LoadingSplash'

/** Services **/
import { createUser } from '../../services/ApiService'
import { useLocation } from 'react-router-dom'

/** Styles **/
import { createAccountStyles } from '../../styles/classes/CreateAccountClasses'

const CreateAccount = () => {
  const classes = createAccountStyles()
  const { t } = useTranslation()
  const [enableSave, setEnableSave] = useState()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorPass, setErrorPass] = useState(null)

  const { search } = useLocation()
  const query = new URLSearchParams(search)

  // sx styles
  const labelStyle = {
    '& label': {
      top: '-20px'
    },
    '& legend': {
      display: 'none'
    },
    '& .MuiInputLabel-root.Mui-required': {
      display: 'flex',
      flexDirection: 'row-reverse'
    }
  }

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    first_name: yup
      .string()
      .required(t('general.messages.errors.required')),
    last_name: yup
      .string()
      .required(t('general.messages.errors.required')),
    password: yup
      .string()
      .required(t('general.messages.errors.required'))
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    let save = true
    if (
      !firstName ||
      !lastName ||
      password.length < 6
    ) {
      save = false
    }
    setEnableSave(save)
  }, [firstName, lastName, password, errors])

  useEffect(() => {
    setErrorPass(null)
  }, [password])

  useEffect(() => {
    setEmail(query.get('originEmail'))
    setAccessCode(query.get('affiliateId'))
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await createUser(
        accessCode,
        firstName,
        lastName,
        email,
        'manager',
        email,
        password
      )
    } catch (error) {
      switch (error.type) {
        case 'email':
          setEmailError(error.message)
          break
      }
      setLoading(false)
    }
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleBlurPass = () => {
    if (password.length < 6) {
      setErrorPass(t('general.messages.errors.length_6'))
    }
  }

  return loading
    ? <LoadingSplash />
    : <SignInContainer>
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
              <Box mt={6}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            label={t('create_account.label.firstName')}
                            className={classes.customField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            type="text"
                            placeholder={t('create_account.placeholder.firstName')}
                            name="first_name"
                            autoComplete="off"
                            sx={labelStyle}
                            error={!!errors.first_name}
                            helperText={errors.first_name && errors.first_name.message}
                            onKeyUp={handleFirstNameChange}
                            {...register('first_name')}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonOutlineIcon />
                                </InputAdornment>
                              ),
                              classes: {
                                notchedOutline: classes.fieldsOutlined
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={11}>
                          <TextField
                            label={t('create_account.label.lastName')}
                            sx={labelStyle}
                            className={classes.customField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            type="text"
                            onKeyUp={handleLastNameChange}
                            placeholder={t('create_account.placeholder.lastName')}
                            name="last_name"
                            autoComplete="off"
                            error={!!errors.last_name}
                            helperText={errors.last_name && errors.last_name.message}
                            {...register('last_name')}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonOutlineIcon />
                                </InputAdornment>
                              ),
                              classes: {
                                notchedOutline: classes.fieldsOutlined
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} mt={4}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            label={t('create_account.label.password')}
                            sx={labelStyle}
                            className={classes.customField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            type="password"
                            placeholder={t('create_account.placeholder.password')}
                            name="password"
                            autoComplete="new-password"
                            error={!!errorPass}
                            helperText={errorPass}
                            {...register('password')}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonOutlineIcon />
                                </InputAdornment>
                              ),
                              classes: {
                                notchedOutline: classes.fieldsOutlined
                              }
                            }}
                            inputProps={{
                              onBlur: () => handleBlurPass()
                            }}
                            onKeyUp={handlePasswordChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {emailError && <Grid container>
                    <Grid item>
                      <p className={classes.emailErrors}>*{emailError}</p>
                    </Grid>
                  </Grid>}
                  <Grid container justifyContent="right">
                    <Grid item xs={12} sm={12} md={2} mt={4}>
                      <Grid container direction="column">
                        <Grid align="right" item>
                          <Box className={classes.sendButtonBox}>
                            <RoundedButton
                              data-testid={'submit_button'}
                              disabled={!enableSave}
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
}

export default CreateAccount
