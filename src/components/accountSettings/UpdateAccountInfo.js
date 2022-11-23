// main components
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'

import { TextInput } from './TextInput'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAccountSettings } from '../../services/ApiService'

// mui components
import {
  Drawer,
  FormLabel,
  Box,
  Typography,
  Button,
  ThemeProvider,
  Grid
} from '@mui/material'
import { Selector } from './Selector'
import { store } from '../../store'
import { authActions } from '../../store/signIn'
import * as ApiServices from '../../services/ApiService'
import { PhoneInput } from './PhoneInput'
import {
  buttonSettingsDisabled,
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'
import { isEqual } from 'lodash'
import { navBarHeaderHeight } from '../../lib/Constants'

const useStyles = makeStyles(theme => ({
  title: {
    '&.MuiFormLabel-root': {
      color: 'black',
      fontSize: '20px',
      fontWeight: '700',
      fontFamily: 'Rubik Bold',
      margin: '32px 0px 0px 0px'
    }
  },
  save: {
    textTransform: 'none',
    fontSize: '18px',
    font: 'Rubik',
    fontWeight: '700',
    color: theme.colors.backgroundColor,
    borderRadius: '100px',
    borderColor: theme.colors.textGray,
    width: '161px',
    height: '49px',
    backgroundColor: theme.colors.textGray,
    float: 'right',
    marginRight: 36
  },
  errorMessage: {
    color: theme.colors.errorText,
    fontWeight: '400',
    fontSize: '12px'
  },
  avatar: {
    width: '140px',
    height: '140px'
  },
  photoPicker: {
    display: 'none'
  },
  photoPickerButton: {
    borderColor: 'transparent',
    color: theme.colors.basicDisabledButtonColor,
    fontSize: '10px',
    marginTop: '6px'
  },
  imageGroup: {
    alignItems: 'center',
    width: '313px'
  },
  drawerPaper: {
    maxHeight: `calc(100% - calc(${navBarHeaderHeight + ' + 12px'}))`,
    marginTop: navBarHeaderHeight,
    width: '387px',
    borderRadius: '8px',
    overflow: 'auto',
    overflowX: 'hidden',
    zIndex: 1500,
    boxSizing: 'content-box',
    marginRight: '19px',
    marginBottom: '20px',
    display: 'flex'
  },
  footer: {
    marginRight: 20,
    marginBottom: 20,
    height: '49px',
    width: '341px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  drawerContainer: { height: '100%', position: 'relative' },
  drawerTitle: { alignItems: 'center', paddingLeft: '20px' },
  drawerContent: {
    '&.MuiGrid-root': {
    }
  }
}))

export const UpdateAccountInfo = props => {
  const {
    editDrawer,
    handleClosePanel,
    accountInfo,
    roles,
    event,
    updateUsers,
    affiliateId,
    accountOwner,
    mobile
  } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [enableSave, setEnableSave] = useState()

  const passwordPlaceHolder = '********'
  const startingInfo = {
    firstName: accountInfo.userInfo.firstName,
    lastName: accountInfo.userInfo.lastName,
    email: accountInfo.userInfo.email,
    phone: accountInfo.userInfo.phone,
    username: accountInfo.userInfo.username,
    photo_url: accountInfo.userInfo.photo_url,
    roles: accountInfo.userInfo.roles,
    role: accountInfo.userInfo.role,
    password: passwordPlaceHolder,
    employeeId: accountInfo.userInfo.employeeId,
    emailNotifications: accountInfo.userInfo.emailNotifications
  }
  const [updatedInfo, setUpdatedInfo] = useState({ ...startingInfo })

  useEffect(() => {
    if (editDrawer) {
      try {
        setOpen(true)
      } catch (err) {
        console.error(err)
      }
    }
  }, [editDrawer])

  const handleClose = u => {
    setOpen(false)
    handleClosePanel(accountInfo)
  }

  useEffect(() => {
    let save = true
    if (
      !updatedInfo.firstName ||
      !updatedInfo.lastName ||
      !updatedInfo.email ||
      !updatedInfo.username ||
      !updatedInfo.password
    ) {
      save = false
    }

    if (isEqual(updatedInfo, startingInfo)) save = false
    setEnableSave(save)
  }, [updatedInfo])

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(t('account_settings.messages.errors.required')),
    lastName: yup
      .string()
      .required(t('account_settings.messages.errors.required')),
    email: yup
      .string()
      .required(t('account_settings.messages.errors.required'))
      .email(t('account_settings.messages.errors.email')),
    phone: yup
      .string()
      .trim()
      .required(t('account_settings.messages.errors.required'))
      .min(10, t('general.messages.errors.phone')),
    username: yup
      .string()
      .required(t('account_settings.messages.errors.required'))
      .min(6, t('general.messages.errors.length_6')),
    password: yup
      .string()
      .required(t('account_settings.messages.errors.required'))
      .min(6, t('general.messages.errors.length_6')),
    passwordConfirm: yup
      .string()
      .required(t('account_settings.messages.errors.required'))
      .min(6, t('general.messages.errors.length_6'))
      .oneOf(
        [yup.ref('password')],
        t('account_settings.messages.errors.password_match')
      )
  })

  /** End VALIDATIONS **/

  /** Submit Handle **/

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = data => {
    handleChangeUser()
  }

  const handleChangeValues = event => {
    const value = event.target.value
    console.log(event.target.name)
    console.log(value)
    setUpdatedInfo({
      ...updatedInfo,
      [event.target.name]: value
    })
  }

  const handleChangeUser = async () => {
    if (event === 'new') {
      await handleNewUser()
      return
    }
    if (event === 'edit') {
      await handleUpdateUser()
      return
    }
    try {
      setErrorMessage(null)
      clearErrors()

      let newData = {
        firstName: updatedInfo.firstName,
        lastName: updatedInfo.lastName,
        email: updatedInfo.email,
        phone: updatedInfo.phone,
        username: updatedInfo.username,
        photo_url: updatedInfo.photo_url,
        roles: updatedInfo.roles === 'no_value' ? '' : updatedInfo.roles,
        role: updatedInfo.role,
        employeeId: updatedInfo.employeeId,
        emailNotifications: updatedInfo.emailNotifications
      }

      if (updatedInfo.password !== passwordPlaceHolder) {
        newData = { ...newData, password: updatedInfo.password }
      }

      await updateAccountSettings(newData)
      setOpen(false)

      const newUserData = JSON.parse(JSON.stringify(accountInfo))

      newUserData.userInfo.firstName = newData.firstName
      newUserData.userInfo.lastName = newData.lastName
      newUserData.userInfo.email = newData.email
      newUserData.userInfo.phone = newData.phone
      newUserData.userInfo.username = newData.username
      newUserData.userInfo.photo_url = newData.photo_url
      newUserData.userInfo.roles = newData.roles
      newUserData.userInfo.role = newData.role
      newUserData.userInfo.password = newData.password
      newUserData.userInfo.employeeId = newData.employeeId
      newUserData.userInfo.emailNotifications = newData.emailNotifications

      store.dispatch(authActions.setUser(newUserData))
      handleClosePanel(newUserData)
    } catch (e) {
      console.error(e)
      if (e.code === 400) {
        setErrorMessage(e.message)
      } else {
        setOpen(false)
      }
    }
  }

  const handleNewUser = async () => {
    try {
      setErrorMessage(null)
      clearErrors()

      await ApiServices.createClientUser(
        affiliateId,
        updatedInfo.firstName,
        updatedInfo.lastName,
        updatedInfo.email,
        updatedInfo.phone,
        updatedInfo.username,
        updatedInfo.photo_url,
        props.mobile ? 'no_value' : roles[0].id,
        updatedInfo.role,
        updatedInfo.password
      )
      handleClose()
      updateUsers()
    } catch (e) {
      console.error(e)
      setErrorMessage(e)
    }
  }

  const handleUpdateUser = async () => {
    try {
      setErrorMessage(null)
      clearErrors()
      await ApiServices.updateClientUser(accountInfo.userInfo.id, {
        firstName: updatedInfo.firstName,
        lastName: updatedInfo.lastName,
        email: updatedInfo.email,
        phone: updatedInfo.phone,
        username: updatedInfo.username,
        photo_url: updatedInfo.photo_url,
        roles: updatedInfo.roles === 'no_value' ? '' : updatedInfo.roles,
        role: updatedInfo.role,
        password:
          updatedInfo.password === passwordPlaceHolder
            ? undefined
            : updatedInfo.password
      })
      handleClose()
      updateUsers()
    } catch (e) {
      console.error(e)
      if (e.details && e.details?.details?.length > 0) {
        const error = e.details.details[0]
        const name =
          error.path.substr(1, error.path.length - 1) === 'role'
            ? 'title'
            : error.path.substr(1, error.path.length - 1)
        setErrorMessage(name + ' ' + error.message)
      } else if (e.message) {
        setErrorMessage(t('company_profile.error.general_error'))
      } else setErrorMessage(e)
    }
  }

  const onError = (errors, e) => console.error(errors, e)

  /** End Submit Handle **/

  return (
    <div>
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.drawerPaper }}
        disableAutoFocus
      >
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          onReset={reset}
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerTitle}>
              <FormLabel component="legend" className={classes.title}>
                {event === 'new'
                  ? t('account_settings.info_card.new_user_title')
                  : t('account_settings.info_card.title')}
              </FormLabel>
            </div>

            <Grid container xs={12} p={3} pt={0}>
              <Grid item xs={12}>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={6}>
                    <TextInput
                        value={updatedInfo.firstName}
                        id="firstName"
                        name="firstName"
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.first_name')}
                        error={!!errors.firstName}
                        helperText={errors.firstName && errors.firstName.message}
                        {...register('firstName')}
                        inputStyle={{
                          width: '100%',
                          borderRightColor: 'red',
                          borderRightWidth: '1px',
                          borderRightStyle: 'solid',
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          borderColor: '#B8B8B8'
                        }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                        value={updatedInfo.lastName}
                        id="lastName"
                        name="lastName"
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.last_name')}
                        error={!!errors.lastName}
                        helperText={errors.lastName && errors.lastName.message}
                        {...register('lastName')}
                        inputStyle={{
                          width: '100%',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0
                        }}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                        value={updatedInfo.email}
                        id="email"
                        name="email"
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.email')}
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                        {...register('email')}
                        endAdornment={true}
                        inputStyle={{
                          width: '100%',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0
                        }}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <PhoneInput
                        value={updatedInfo.phone}
                        id="phone"
                        name="phone"
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.phone_number')}
                        error={!!errors.phone}
                        helperText={errors.phone && errors.phone.message}
                        inputStyle={{
                          width: '100%',
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0
                        }}
                        {...register('phone')}
                    />
                  </Grid>
                </Grid>

                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <Selector
                        id={'roles'}
                        value={
                          mobile
                            ? t('company_settings.mobile_only')
                            : roles
                              ? roles[0].name
                              : ''
                        }
                        label={t('account_settings.info_card.company_role')}
                        handleChange={handleChangeValues}
                        options={
                          mobile
                            ? [
                                {
                                  id: 'no_value',
                                  name: t('company_settings.mobile_only')
                                }
                              ]
                            : roles && roles.length > 0
                              ? [...roles]
                              : []
                        }
                        error={!!errors.roles}
                        helperText={errors.roles && errors.roles.message}
                        disabled={accountOwner}
                        {...register('roles')}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <Selector
                        id={'role'}
                        value={
                            t('create_account.user_roles', {
                              returnObjects: true
                            })[updatedInfo.role] ?? ''
                        }
                        label={t('company_settings.users_card.role')}
                        handleChange={handleChangeValues}
                        options={Object.keys(
                          t('create_account.user_roles', { returnObjects: true })
                        ).map(key => {
                          return {
                            id: key,
                            name: t('create_account.user_roles', {
                              returnObjects: true
                            })[key]
                          }
                        })}
                        error={!!errors.role}
                        helperText={errors.role && errors.role.message}
                        {...register('role')}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <Selector
                        id={'emailNotifications'}
                        value={
                            t('create_account.email_notifications', {
                              returnObjects: true
                            })[updatedInfo.emailNotifications] ?? ''
                        }
                        label={t('company_settings.users_card.notifications')}
                        handleChange={handleChangeValues}
                        options={Object.keys(
                          t('create_account.email_notifications', { returnObjects: true })
                        ).map(key => {
                          return {
                            id: key,
                            name: t('create_account.email_notifications', {
                              returnObjects: true
                            })[key]
                          }
                        })}
                        {...register('emailNotifications')}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                        value={updatedInfo.employeeId}
                        id="employeeId"
                        name="employeeId"
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.employee_id')}
                        error={!!errors.employeeId}
                        helperText={errors.employeeId && errors.employeeId.message}
                        {...register('employeeId')}
                        variant="filled"
                        inputStyle={{
                          width: '100%',
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0
                        }}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                        value={updatedInfo.username}
                        id="username"
                        handleChange={handleChangeValues}
                        label={
                            t('account_settings.info_card.username') +
                            ' ' +
                            t('account_settings.form.username_chars')
                        }
                        error={!!errors.username}
                        helperText={errors.username && errors.username.message}
                        endAdornment={true}
                        {...register('username')}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                        value={updatedInfo.password}
                        id="password"
                        name="password"
                        type="password"
                        placeholder={'********'}
                        handleChange={handleChangeValues}
                        label={t('account_settings.info_card.password')}
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                        endAdornment={true}
                        {...register('password')}
                    />
                  </Grid>
                </Grid>
                <Box pt={1} hidden={!errorMessage}>
                  <Typography align={'left'} className={classes.errorMessage}>
                    {props.errorMessage
                      ? t('account_settings.form.' + props.errorMessage)
                      : errorMessage}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <div className={classes.footer}>
              <ThemeProvider theme={buttonSettingsDisabled}>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  type="submit"
                  disabled={!enableSave}
                  style={!enableSave ? disableButtonStyle : enableButtonStyle}
                >
                  {event === 'new'
                    ? t('company_settings.bes_notifications_panel.create')
                    : t('account_settings.form.save')}
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </form>
      </Drawer>
    </div>
  )
}
