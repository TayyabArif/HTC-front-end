import { React, useEffect, useState } from 'react'

// mui components
import {
  Container,
  ThemeProvider,
  Box,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import GlobalSelect from '../form/Select'
import GlobalInput from '../form/TextInput'
import {
  buttonSettingsDisabled,
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'
import { Button } from 'antd'
import GlobalNumberInput from '../form/NumberInput'
import { createClientUser } from '../../services/ApiService'
import * as yup from 'yup'
import { useFormik } from 'formik'
import customTheme from '../../styles/mui_theme'
import { userCardStyles } from '../../styles/classes/CompanySettingsClasses'

export const UserCard = props => {
  const { t } = useTranslation()
  const { roles, affiliateId, mobileOnly, updateUser } = props
  const classes = userCardStyles()
  const [saveEnabled, setSaveEnabled] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  /** VALIDATIONS **/
  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .required(t('account_settings.messages.errors.required')),
    lastName: yup
      .string()
      .trim()
      .required(t('account_settings.messages.errors.required')),
    role: yup
      .string()
      .trim()
      .required(t('account_settings.messages.errors.required')),
    roles: yup.string(),
    email: yup
      .string()
      .trim()
      .email(t('account_settings.messages.errors.email'))
      .required(t('account_settings.messages.errors.required')),
    phone: yup
      .string()
      .trim()
      .required(t('account_settings.messages.errors.required'))
      .min(14, t('general.messages.errors.phone')),
    username: yup
      .string()
      .trim()
      .min(6, t('general.messages.errors.length_6'))
      .required(t('account_settings.messages.errors.required')),
    password: yup
      .string()
      .trim()
      .min(6, t('general.messages.errors.length_6'))
      .required(t('account_settings.messages.errors.required'))
  })
  /** End VALIDATIONS **/

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      roles: '',
      email: '',
      phone: '',
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      saveUser(values)
    }
  })

  const textStyle = {
    ...(formik.values.createdAt ? { color: customTheme.colors.grey_3 } : {})
  }

  useEffect(() => {
    updateUser({ ...formik.values })
    validateUser()
  }, [formik.values])

  function handleBlur (event) {
    formik.handleBlur(event)
    validateUser()
  }

  function handleChange (event) {
    formik.handleChange(event)
    validateUser()
  }

  useEffect(() => {
    let role = ''
    switch (props.idx) {
      case 0:
        role = 'dispatcher'
        break
      case 1:
        role = 'account_manager'
        break
      case 2:
        role = 'administrator'
        break
      case 3:
        role = 'operations_manager'
        break
      default:
        break
    }
    formik.setFieldValue('role', role)
  }, [])

  const validateUser = () => {
    let save = true
    if (
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.email ||
      !formik.values.phone ||
      !formik.values.username ||
      !formik.values.role ||
      !formik.values.password ||
      (mobileOnly ? false : !formik.values.roles)
    ) {
      save = false
    }
    setSaveEnabled(save && formik.isValid)
  }

  const saveUser = async () => {
    try {
      const createdUser = await createClientUser(
        affiliateId,
        formik.values.firstName,
        formik.values.lastName,
        formik.values.email,
        formik.values.phone,
        formik.values.username,
        '',
        mobileOnly ? 'no_value' : formik.values.roles,
        formik.values.role,
        formik.values.password
      )
      formik.setValues({ ...formik.values, ...createdUser })
    } catch (e) {
      switch (true) {
        case e.includes('email'):
          formik.setFieldError(
            'email',
            t('account_settings.messages.errors.email_taken')
          )
          break
        case e.includes('Username'):
          formik.setFieldError(
            'username',
            t('account_settings.messages.errors.username_taken')
          )
          break
        default:
          setOpenDialog(true)
          break
      }
    }
  }

  return (
    <Container>
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => setOpenDialog(false)}
        classes={{ paper: classes.dialogPaper }}
        BackdropProps={{ invisible: true }}
        style={{ zIndex: 2000 }}
        disableAutoFocus={false}
      >
        <DialogTitle
          disableTypography={true}
          classes={{ root: classes.dialogTitle }}
        >
          {t('general.messages.errors.user_creation_title')}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormLabel className={classes.dialogContentFont}>
            {t('general.messages.errors.user_creation')}
          </FormLabel>

          <Box className={classes.dialogButtonContainer}>
            <ThemeProvider theme={buttonSettingsDisabled}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                type="submit"
                style={{
                  ...enableButtonStyle,
                  marginRight: 0
                }}
                onClick={() => setOpenDialog(false)}
              >
                {t('company_profile.continue')}
              </Button>
            </ThemeProvider>
          </Box>
        </DialogContent>
      </Dialog>
      <form onSubmit={formik.handleSubmit} className={classes.userContainer}>
        <div className={classes.column}>
          <GlobalInput
            label={t('account_settings.info_card.first_name')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.first_name'
            )}`}
            style={textStyle}
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            disabled={formik.values.createdAt}
            validate
          />
          <GlobalInput
            label={t('account_settings.info_card.email')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.email'
            )}`}
            style={textStyle}
            field="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={formik.values.createdAt}
            validate
          />
          <GlobalInput
            label={t('account_settings.info_card.username')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.username'
            )}`}
            style={textStyle}
            field="username"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            disabled={formik.values.createdAt}
            validate
          />
          <GlobalSelect
            label={t('account_settings.info_card.user_title')}
            options={Object.keys(
              t(
                mobileOnly
                  ? 'create_account.user_roles'
                  : 'create_account.admin_roles',
                { returnObjects: true }
              )
            ).map(key => {
              return {
                value: key,
                label: t(
                  mobileOnly
                    ? 'create_account.user_roles'
                    : 'create_account.admin_roles',
                  {
                    returnObjects: true
                  }
                )[key]
              }
            })}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.user_title'
            )}`}
            style={textStyle}
            field="role"
            id="role"
            name="role"
            displayValue
            value={formik.values.role}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            disabled={formik.values.createdAt}
            validate
          />
        </div>
        <div className={classes.separation}></div>
        <div className={classes.column}>
          <GlobalInput
            label={t('account_settings.info_card.last_name')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.last_name'
            )}`}
            style={textStyle}
            field="lastName"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            disabled={formik.values.createdAt}
            validate
          />
          <GlobalNumberInput
            label={t('account_settings.info_card.phone_number')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.phone_number'
            )}`}
            style={textStyle}
            field="phone"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            format="(###) ### ####"
            disabled={formik.values.createdAt}
            validate
          />
          <GlobalInput
            label={t('account_settings.info_card.password')}
            placeholder={`${t('account_settings.form.enter')} ${t(
              'account_settings.info_card.password'
            )}`}
            type="password"
            style={textStyle}
            field="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={formik.values.createdAt}
            validate
          />
          {mobileOnly
            ? (
            <GlobalInput
              label={t('account_settings.info_card.access_type')}
              value={t('company_settings.mobile_only')}
              style={textStyle}
              disabled
            />
              )
            : (
            <GlobalSelect
              label={t('account_settings.info_card.access_type')}
              options={
                mobileOnly
                  ? [
                      {
                        value: 'no_value',
                        label: t('company_settings.mobile_only')
                      }
                    ]
                  : roles && roles.length > 0
                    ? [
                        ...roles.map(item => ({
                          value: item.id,
                          label: item.name
                        }))
                      ]
                    : []
              }
              placeholder={`${t('account_settings.form.enter')} Access Type`}
              style={textStyle}
              value={formik.values.roles}
              field="roles"
              id="roles"
              name="roles"
              displayValue
              onChange={handleChange}
              onBlur={handleBlur}
              error={formik.touched.roles && Boolean(formik.errors.roles)}
              helperText={formik.touched.roles && formik.errors.roles}
              disabled={formik.values.createdAt}
              validate
            />
              )}

          <Box className={classes.buttonContainer}>
            <ThemeProvider theme={buttonSettingsDisabled}>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                disabled={!saveEnabled || formik.values.createdAt}
                style={{
                  ...(!saveEnabled || formik.values.createdAt
                    ? disableButtonStyle
                    : enableButtonStyle),
                  marginRight: 0
                }}
                type="submit"
                onClick={saveUser}
              >
                {formik.values.createdAt
                  ? t('company_profile.labels.created')
                  : t('invoices.in_actions.create')}
              </Button>
            </ThemeProvider>
          </Box>
        </div>
      </form>
    </Container>
  )
}
