import { React, useEffect, useState } from 'react'

// mui components
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
  FormLabel
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GlobalInput from '../form/TextInput'
import GlobalSelect from '../form/Select'
import GlobalAddressInput from '../form/AddressInput'
import NumberInput from '../form/NumberInput'
import { companyProfileStyles } from '../../styles/classes/CompanySettingsClasses'
import { validateEmail } from '../../lib/Global'

export const CompanyProfileComponent = props => {
  const classes = companyProfileStyles()
  const { t } = useTranslation()
  const { profile, handleChange, handleImageChange, afterHoursPhone } = props
  const [address, setAddress] = useState()
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorInvoice, setErrorInvoice] = useState(null)

  useEffect(() => {
    setAddress({ ...profile.address })
  }, [])

  useEffect(() => {
    handleChange(address, 'address')
  }, [address])

  const countries = [
    { value: 'United States', label: 'United States (US)' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Mexico', label: 'Mexico' }
  ]

  const handleBusinessHours = (value, field) => {
    const newObj = { ...profile.business_hours }
    newObj[field] = value
    handleChange(newObj, 'business_hours')
  }

  const handleAfterHours = (value, field) => {
    const newObj = { ...profile.after_hours }
    newObj[field] = value
    handleChange(newObj, 'after_hours')
  }

  const addressChanged = (value, field, addressInfo) => {
    const newAddress = {
      address: value,
      address1: addressInfo?.address1,
      city: addressInfo?.city,
      country: addressInfo?.country,
      state: addressInfo?.state,
      zipCode: addressInfo?.zipCode
    }
    setAddress(newAddress)
  }
  const handleFocus = event => event.target.select()

  const handleBlurEmail = () => {
    console.log('blur email!')
    if (profile?.email && profile?.email !== '' && !validateEmail(profile?.email)) {
      setErrorEmail(t('company_profile.error.email'))
    }
  }

  const handleBlurInvoice = () => {
    console.log('blur invoice!')
    if (profile?.invoice_email && profile?.invoice_email !== '' && !validateEmail(profile?.invoice_email)) {
      setErrorInvoice(t('company_profile.error.email'))
    }
  }

  const handleFocusEmail = () => {
    console.log('focus mail!')
    setErrorEmail(null)
  }

  const handleFocusInvoice = () => {
    console.log('focus invoice!')
    setErrorInvoice(null)
  }

  return (
    <Container data-testid='company_edit_container' classes={{ root: classes.infoContainer }}>
      <Grid container className={classes.itemContainer}>
        <Grid item xs={12}>
          <Typography classes={{ root: classes.title }}>
            {t('company_profile.company_profile')}
          </Typography>
          <Typography classes={{ root: classes.subtitle }}>
            {t('company_profile.message.company_profile')}
          </Typography>
        </Grid>
      </Grid>
      {props.showLogo
        ? (
          <Box display="flex" className={classes.headerContainer}>
            <Box flex={1} display="flex" alignItems="center">
              {props.logoError && (
                <Avatar alt="profile" className={classes.errorAvatar}>
                  <FormLabel className={classes.error}>
                    {props.helperText}
                  </FormLabel>
                </Avatar>
              )}
              {!props.logoError && (
                <Avatar
                  alt="profile"
                  src={profile?.logo?.url ?? null}
                  className={
                    profile?.logo?.url ? classes.avatar : classes.emptyAvatar
                  }
                  imgProps={{ style: { objectFit: 'contain' } }}
                >
                  <FontAwesomeIcon icon={['fal', 'building']} size="4x" />
                </Avatar>
              )}
            </Box>
            <Box flex={4} display="flex" alignItems="center">
              <Button
                id="profile-logo"
                variant="contained"
                component="label"
                className={classes.uploadButton}
              >
                {t('company_profile.labels.upload')}
                <input
                  hidden
                  accept="image/png, image/jpeg, image/jpg, image/bitmap"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
          </Box>
          )
        : (
            ''
          )}
      <Box className={classes.formContainer}>
        <GlobalInput
          onChange={handleChange}
          field="name"
          placeholder={t('company_profile.placeholder.company_legal')}
          value={profile?.name}
          label={t('company_profile.labels.company_legal')}
          required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'name')}
        />
        <GlobalAddressInput
          id="address"
          field="address"
          name="address"
          label={t('company_settings.info_card.address')}
          value={profile?.address?.address ?? ''}
          onChange={addressChanged}
          onFocus={handleFocus}
          required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'address')}
        />
        <GlobalSelect
          options={countries}
          onChange={handleChange}
          label={t('company_profile.labels.country')}
          field="country"
          placeholder={`${t('company_profile.placeholder.country')}`}
          value={profile?.country ?? []}
          multiple={true}
          required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'country')}
        />
        <Box display="flex">
          <Box marginRight="5px" flex={1} key="business_hours_box">
            <NumberInput
              key="business_hours_input"
              onChange={handleBusinessHours}
              field="phone"
              placeholder={t('company_profile.placeholder.business_hours')}
              value={profile?.business_hours?.phone}
              label={t('company_profile.labels.business_hours')}
              format="(###) ### ####"
            />
          </Box>
          <Box marginLeft="5px" flex={1} key="after_hours_box" >
            <NumberInput
              key="after_hours_input"
              onChange={handleAfterHours}
              field="phone"
              placeholder={t('company_profile.placeholder.after_hours')}
              value={afterHoursPhone}
              label={t('company_profile.labels.after_hours')}
              format="(###) ### ####"
            />
          </Box>
        </Box>
        <GlobalInput
          id="email"
          onChange={handleChange}
          field="email"
          placeholder={t('company_profile.placeholder.dispatch')}
          value={profile?.email}
          label={t('company_profile.labels.email')}
          onBlur={handleBlurEmail}
          onFocus={handleFocusEmail}
          error={!!errorEmail}
          helperText={errorEmail}
          required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'email')}
        />
        <GlobalInput
          id="invoice_email"
          onChange={handleChange}
          field="invoice_email"
          placeholder={t('company_profile.placeholder.invoice_email')}
          value={profile?.invoice_email}
          label={t('company_profile.labels.invoice_email')}
          onBlur={handleBlurInvoice}
          onFocus={handleFocusInvoice}
          error={!!errorInvoice}
          helperText={errorInvoice}
          required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'invoice_email')}
        />
      </Box>
    </Container>
  )
}
