// main components
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { TextInput } from './TextInput'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAccountSettings } from '../../services/ApiService'

import imageToBase64 from 'image-to-base64/browser'
import avatarImage from '../../assets/images/account_avatar.jpeg'

// mui components
import {
  Avatar,
  FormGroup,
  Link,
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

// styles
import { updateAccountInfoStyles } from '../../styles/classes/AccountSettingsClasses'

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
  const photoPicker = useRef()
  const photo = useRef()
  const classes = updateAccountInfoStyles()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [photoBase64, setPhotoBase64] = useState()
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
    passwordConfirm: passwordPlaceHolder
  }
  const [updatedInfo, setUpdatedInfo] = useState({ ...startingInfo })

  /* Image Handling */
  let firstRender = true
  useEffect(() => {
    try {
      if (firstRender) {
        let newBase64
        imageToBase64(accountInfo.userInfo.photo_url ?? avatarImage)
          .then(response => {
            newBase64 = `data:image/jpeg;base64,${response}`
            setPhotoBase64(newBase64)
          })
          .catch(error => {
            console.error(error)
          })
        firstRender = false
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const changeFileHandler = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setPhotoBase64(reader.result)
      setUpdatedInfo({ ...updatedInfo, photo_url: reader.result })
    }
    reader.onerror = function (error) {
      console.error('Error: ', error)
    }
  }

  const handleImagePicker = event => {
    photoPicker.current.click()
  }

  /* End Image Handling */
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
      (updatedInfo.password && !updatedInfo.passwordConfirm) ||
      (!updatedInfo.password && updatedInfo.passwordConfirm) ||
      (!updatedInfo.password && !updatedInfo.passwordConfirm)
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
        role: updatedInfo.role
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
              <FormLabel component="legend" classes={{ root: classes.title }}>
                {event === 'new'
                  ? t('account_settings.info_card.new_user_title')
                  : t('account_settings.info_card.title')}
              </FormLabel>
            </div>

            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.drawerContent}>
                <FormGroup classes={{ root: classes.imageGroup }}>
                  <Avatar
                    alt="profile"
                    src={photoBase64}
                    ref={photo}
                    classes={{ root: classes.avatar }}
                  />

                  <Link
                    size="small"
                    onClick={handleImagePicker}
                    color="primary"
                    classes={{ root: classes.photoPickerButton }}
                    type="button"
                  >
                    {t(
                      updatedInfo.photo_url
                        ? 'account_settings.form.edit'
                        : 'account_settings.form.add'
                    )}
                  </Link>
                  <input
                    ref={photoPicker}
                    style={{ display: 'none' }}
                    type="file"
                    name="file"
                    onChange={changeFileHandler}
                  />
                </FormGroup>

                <div style={{ marginTop: 12 }}></div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxWidth: '309px',
                    overflow: 'hidden'
                  }}
                >
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
                </div>

                <TextInput
                  value={updatedInfo.email}
                  id="email"
                  name="email"
                  handleChange={handleChangeValues}
                  label={t('account_settings.info_card.email')}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                  {...register('email')}
                />

                <PhoneInput
                  value={updatedInfo.phone}
                  id="phone"
                  name="phone"
                  handleChange={handleChangeValues}
                  label={t('account_settings.info_card.phone_number')}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                  {...register('phone')}
                />

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
                  {...register('username')}
                />

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
                  {...register('password')}
                />

                <TextInput
                  value={updatedInfo.passwordConfirm}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  handleChange={handleChangeValues}
                  placeholder={'********'}
                  label={t('account_settings.info_card.password_confirm')}
                  error={!!errors.passwordConfirm}
                  helperText={
                    errors.passwordConfirm && errors.passwordConfirm.message
                  }
                  {...register('passwordConfirm')}
                />

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
                    ? t('account_settings.form.create')
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
