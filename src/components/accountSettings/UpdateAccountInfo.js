// main components
import React, { useState, useEffect } from 'react'
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
import { isEqual } from 'lodash'

/**
 * Styles
 **/
import {
  buttonSettingsDisabled,
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'
import { UpdateAccountInfoClasses } from '../../styles/classes/AccountSettingsClasses'
import { useSelector } from 'react-redux'

export const UpdateAccountInfo = props => {
  const {
    editDrawer,
    handleClosePanel,
    accountInfo,
    roles,
    event,
    updateUsers,
    affiliateId,
    mobile
  } = props
  const classes = UpdateAccountInfoClasses()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [enableSave, setEnableSave] = useState()
  const user = useSelector(state => state.auth.user)
  const [finalRoles, setFinalRoles] = useState([])

  // inline styles
  const styles = {
    emailNotifications: {
      display: 'none'
    },
    employeeId: {
      display: 'none'
    }
  }

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
    employeeId: accountInfo.userInfo.employee_id,
    password: passwordPlaceHolder,
    passwordConfirm: passwordPlaceHolder
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
      .matches(/\([0-9]{3}\) [0-9]{3} [0-9]{4}\b$/, t('general.messages.errors.phone')),
    employeeId: yup
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

  useEffect(() => {
    let save = true
    if (
      !updatedInfo.firstName ||
      !updatedInfo.lastName ||
      !updatedInfo.email ||
      !updatedInfo.phone ||
      (updatedInfo.password && !updatedInfo.passwordConfirm) ||
      (!updatedInfo.password && updatedInfo.passwordConfirm) ||
      (!updatedInfo.password && !updatedInfo.passwordConfirm) ||
      errors?.email?.message ||
      errors?.phone?.message ||
      errors?.password?.message ||
      errors?.passwordConfirm?.message ||
      (updatedInfo.password !== updatedInfo.passwordConfirm)
    ) {
      save = false
    }

    if (isEqual(updatedInfo, startingInfo)) save = false

    setEnableSave(save)
  }, [updatedInfo, errors])

  useEffect(() => {
    const currentRoles = roles?.filter((role) => role.id === user.userInfo.roles)
    if (currentRoles?.length > 0) {
      const updatedRoles = []
      roles.forEach((role) => {
        if (role.name === 'Super Admin' && currentRoles[0].name !== 'Super Admin') {
          updatedRoles.push({ ...role, disabled: true })
        } else {
          updatedRoles.push({ ...role, disabled: false })
        }
      })
      setFinalRoles(updatedRoles)
    }
  }, [open])

  const onSubmit = data => {
    handleChangeUser()
  }

  const handleChangeValues = event => {
    const value = event.target.value
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
        employee_id: updatedInfo.employeeId
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
      newUserData.userInfo.employee_id = newData.employee_id

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
        updatedInfo.email,
        updatedInfo.photo_url,
        props.mobile ? 'no_value' : roles[0].id,
        updatedInfo.role,
        updatedInfo.password,
        updatedInfo.employeeId
      )
      updateUsers()
      handleClose()
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
        employee_id: updatedInfo.employeeId,
        password:
          updatedInfo.password === passwordPlaceHolder
            ? undefined
            : updatedInfo.password
      })
      updateUsers()
      handleClose()
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
                  : event === 'edit'
                    ? t('account_settings.info_card.edit_user_title')
                    : t('account_settings.info_card.title')}
              </FormLabel>
            </div>

            <Grid container p={3} pt={0}>
              <Grid item xs={12}>
                <Grid container mt={2}>
                  <Grid item xs={6}>
                    <TextInput
                      value={updatedInfo.firstName}
                      id="firstName"
                      name="firstName"
                      handleChange={handleChangeValues}
                      label={t('account_settings.info_card.first_name')}
                      placeholder={t('account_settings.info_card.placeholder_first')}
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
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextInput
                      value={updatedInfo.lastName}
                      id="lastName"
                      name="lastName"
                      handleChange={handleChangeValues}
                      label={t('account_settings.info_card.last_name')}
                      placeholder={t('account_settings.info_card.placeholder_last')}
                      error={!!errors.lastName}
                      helperText={errors.lastName && errors.lastName.message}
                      {...register('lastName')}
                      inputStyle={{
                        width: '100%',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                      value={updatedInfo.email}
                      id="email"
                      name="email"
                      handleChange={handleChangeValues}
                      label={t('account_settings.info_card.email')}
                      placeholder={t('account_settings.info_card.placeholder_email')}
                      error={!!errors.email}
                      helperText={errors.email && errors.email.message}
                      {...register('email')}
                      endAdornment={true}
                      inputStyle={{
                        width: '100%',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <PhoneInput
                      value={updatedInfo.phone}
                      id="phone"
                      name="phone"
                      handleChange={handleChangeValues}
                      label={t('account_settings.info_card.phone_number')}
                      placeholder={t('account_settings.info_card.placeholder_phone')}
                      error={!!errors.phone}
                      helperText={errors.phone && errors.phone.message}
                      inputStyle={{
                        width: '100%',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                      }}
                      InputLabelProps={{ shrink: true }}
                      {...register('phone')}
                    />
                  </Grid>
                </Grid>

                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <Selector
                      id={'roles'}
                      value={roles && updatedInfo.roles && roles.find(role => role.id === updatedInfo.roles)
                        ? roles.find(role => role.id === updatedInfo.roles).name
                        : ''}
                      label={t('company_settings.users_card.role')}
                      handleChange={handleChangeValues}
                      options={
                        mobile
                          ? [
                              {
                                id: 'no_value',
                                name: t('company_settings.mobile_only')
                              }
                            ]
                          : finalRoles && finalRoles.length > 0
                            ? [...finalRoles]
                            : []
                      }
                      error={!!errors.roles}
                      helperText={errors.roles && errors.roles.message}
                      {...register('roles')}
                    />
                  </Grid>
                </Grid>
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <Selector
                      id={'role'}
                      value={
                        t('request_access.user_roles', {
                          returnObjects: true
                        })[updatedInfo.role] ?? ''
                      }
                      label={t('company_settings.users_card.panel_role')}
                      placeholder={t('account_settings.info_card.placeholder_select')}
                      handleChange={handleChangeValues}
                      options={Object.keys(
                        t('request_access.user_roles', { returnObjects: true })
                      ).map(key => {
                        return {
                          id: key,
                          name: t('request_access.user_roles', {
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
                <Grid container mt={2} sx={styles.emailNotifications}>
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
                <Grid container mt={2} >
                  <Grid item xs={12}>
                    <TextInput
                      value={updatedInfo.employeeId}
                      id="employeeId"
                      name="employeeId"
                      handleChange={handleChangeValues}
                      label={t('account_settings.info_card.employee_id')}
                      placeholder={t('account_settings.info_card.placeholder_employee')}
                      error={!!errors.employeeId}
                      helperText={errors.employeeId && errors.employeeId.message}
                      {...register('employeeId')}
                      inputStyle={{
                        width: '100%'
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid container mt={2}>
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
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <TextInput
                      value={updatedInfo.passwordConfirm}
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      handleChange={handleChangeValues}
                      placeholder={'********'}
                      label={t('account_settings.info_card.password_confirm')}
                      error={!!errors.passwordConfirm}
                      endAdornment={true}
                      helperText={
                        errors.passwordConfirm && errors.passwordConfirm.message
                      }
                      {...register('passwordConfirm')}
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
