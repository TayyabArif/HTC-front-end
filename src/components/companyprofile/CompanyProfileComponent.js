import { React, useEffect, useState } from 'react'

// mui components
import {
  makeStyles,
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
import { legalEntities } from '../../lib/Constants'
import GlobalInput from '../form/TextInput'
import GlobalSelect from '../form/Select'
import { YesNoQuestion } from '../form/YesNoQuestion'
import GlobalLaborHours from '../form/LaborHours'
import GlobalAddressInput from '../form/AddressInput'

const useStyles = makeStyles(theme => ({
  infoContainer: {
    fontSize: '14px',
    fontWeight: '600',
    paddingTop: '24px'
  },
  itemContainer: {
    padding: '24px 80px 0px 80px',
    [theme.breakpoints.down('md')]: {
      padding: '24px 0 0 0'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: theme.colors.black,
    lineHeight: '24px',
    letterSpacing: '0.05em'
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '17px',
    color: theme.colors.black,
    paddingTop: '9px'
  },
  avatar: {
    width: '200px',
    height: '200px',
    '&.MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  emptyAvatar: {
    width: '200px',
    height: '200px',
    background: theme.colors.profile.avatar_bg,
    color: theme.colors.profile.avatar_icon
  },
  errorAvatar: {
    width: '200px',
    height: '200px',
    background: theme.colors.profile.avatar_bg,
    color: theme.colors.errorColor,
    border: '1px dashed ' + theme.colors.errorColor
  },
  uploadButton: {
    background: theme.colors.grey_2,
    color: theme.colors.profile.text_grey,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    borderRadius: '100px',
    width: '13em',
    height: '36px',
    boxShadow: 'none',
    marginLeft: '3em'
  },
  labels: {
    fontSize: '16px',
    color: theme.colors.grey,
    paddingBottom: '7px'
  },
  outlinedInput: {
    borderRadius: '50px',
    width: '100%',
    height: '36px',
    fontSize: '12px',
    color: theme.colors.profile.text_grey
  },
  formContainer: {
    gap: '4em',
    margin: '2em 6em 0 6em',
    [theme.breakpoints.down('md')]: {
      margin: '2em 0 0 0',
      flexDirection: 'column'
    }
  },
  headerContainer: {
    gap: '1em',
    margin: '2em 6em 0 6em',
    [theme.breakpoints.down('md')]: {
      margin: '2em 0 0 0'
    }
  },
  error: {
    marginLeft: '5px',
    marginTop: '0.5em',
    fontSize: '12px',
    color: theme.colors.errorText
  }
}))

export const CompanyProfileComponent = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { profile, handleChange, handleImageChange, setValidHours } = props
  const [address, setAddress] = useState()
  const [hoursError, setHoursError] = useState({
    weekdays: false,
    weekend: false
  })
  const [afterhoursError, setAfterhoursError] = useState({
    weekdays: false,
    weekend: false
  })

  useEffect(() => {
    setAddress({ ...profile.address })
  }, [])

  useEffect(() => {
    handleChange(address, 'address')
  }, [address])

  useEffect(() => {
    let laborHours = true
    if (
      hoursError.weekdays ||
      hoursError.weekend ||
      afterhoursError.weekdays ||
      afterhoursError.weekend
    ) {
      laborHours = false
    }
    setValidHours(laborHours)
  }, [hoursError, afterhoursError])

  const countries = [
    { value: 'United States', label: 'United States (US)' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Mexico', label: 'Mexico' }
  ]

  const handleSupportChange = (value, field) => {
    if (value) {
      setAfterhoursError(false)
    }
    handleChange(value, field)
  }
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

  return (
    <Container classes={{ root: classes.infoContainer }}>
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
      {props.showLogo ? (
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
      ) : (
        ''
      )}
      <Box display="flex" className={classes.formContainer}>
        <Box flex={1}>
          <GlobalInput
            onChange={handleChange}
            field="name"
            placeholder={t('company_profile.placeholder.company_legal')}
            value={profile?.name}
            label={t('company_profile.labels.company_legal')}
            required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'name')}
          />
          <GlobalSelect
            options={legalEntities}
            onChange={handleChange}
            label={t('company_profile.labels.entity')}
            field="legal_entity"
            placeholder={`${t('company_profile.placeholder.entity')}`}
            value={profile?.legal_entity ?? ''}
            required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'legal_entity')}
          />
          <GlobalInput
            onChange={handleChange}
            field="dba"
            placeholder={t('company_profile.placeholder.dba')}
            value={profile?.dba}
            label={t('company_profile.labels.full_dba')}
            required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'dba')}
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
          <GlobalInput
            onChange={handleChange}
            field="dispatch_email"
            placeholder={t('company_profile.placeholder.dispatch')}
            value={profile?.dispatch_email}
            label={t('company_profile.labels.dispatch')}
            error={props.dispatchError}
            helperText={t('company_profile.error.email')}
            required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'dispatch_email')}
          />
          <GlobalInput
            onChange={handleChange}
            field="invoice_email"
            placeholder={t('company_profile.placeholder.invoice_email')}
            value={profile?.invoice_email}
            label={t('company_profile.labels.invoice_email')}
            error={props.invoiceError}
            helperText={t('company_profile.error.email')}
            required={props.requiredFields && Object.prototype.hasOwnProperty.call(props?.requiredFields, 'invoice_email')}
          />
        </Box>
        <Box flex={1}>
          <YesNoQuestion
            label={t('company_profile.questions.support_hours')}
            field="support_24_7"
            onChange={handleSupportChange}
            value={profile?.support_24_7 ? 'yes' : 'no'}
          />
          <GlobalLaborHours
            labeldays={t('company_profile.labels.days_operation')}
            labelhours={t('company_profile.labels.times_operation')}
            laborhours={{ ...profile?.business_hours }}
            field="business_hours"
            onChange={handleBusinessHours}
            hoursError={hoursError}
            setHoursError={setHoursError}
          />
          <GlobalLaborHours
            labeldays={t('company_profile.labels.days_operation_after')}
            labelhours={t('company_profile.labels.times_operation_after')}
            laborhours={{ ...profile?.after_hours }}
            field="after_hours"
            onChange={handleAfterHours}
            disableComponent={profile?.support_24_7}
            hoursError={afterhoursError}
            setHoursError={setAfterhoursError}
          />
        </Box>
      </Box>
    </Container>
  )
}
