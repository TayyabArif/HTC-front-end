import {
  Box,
  Button,
  Card,
  Typography
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GlobalInput from '../form/TextInput'
import { profileInfoCardStyles } from '../../styles/classes/CompanySettingsClasses'
import { conformToMask } from 'react-text-mask'
import { useWindowSize } from '@react-hook/window-size'

// Constants
import { profileCardLimits } from '../../lib/Constants'

const EditButton = props => {
  const classes = profileInfoCardStyles()
  return (
        <Button data-testid='edit_company_info_button' className={classes.editButton} onClick={props.onClick}>
            {props.label}
        </Button>
  )
}

export const ProfileInfoCard = props => {
  const classes = profileInfoCardStyles()
  const [wWidth] = useWindowSize()
  const { t } = useTranslation()

  const handleEditProfile = () => {
    props.setComponent('profile')
    props.setOpen(true)
  }

  const maskValue = (value) => {
    if (value) {
      const result = conformToMask(
        value,
        ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
        { guide: false }
      )
      return result.conformedValue
    } else {
      return 'N/A'
    }
  }

  return (
        <Card data-testid='profile_info_card' className={classes.card}>
            <Box display="flex" flexDirection="row">
                <Typography classes={{ root: classes.cardTitle }}>
                    {t('company_settings.card.profile')}
                </Typography>
                <EditButton
                    label={t('company_settings.buttons.edit')}
                    onClick={handleEditProfile}
                />
            </Box>
            <Box className={classes.marginContainer}>
                <Box
                    flexDirection="row"
                    className={classes.boxContainer}
                >
                    <Box flex={2}>
                        <GlobalInput
                            field="name"
                            value={props?.profile?.name ?? 'N/A'}
                            label={t('company_profile.labels.company_legal')}
                            disabled
                            className={classes.disabledText}
                        />
                    </Box>
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection="row"
                        className={classes.boxContainer}
                    />
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    className={classes.boxContainer}
                >
                    <Box flex={2}>
                        <GlobalInput
                            field="address"
                            value={
                                props?.profile?.address?.address?.length
                                  ? props?.profile?.address?.address
                                  : 'N/A'
                            }
                            label={t('company_profile.labels.address')}
                            disabled
                            className={classes.disabledText}
                        />
                    </Box>
                    <Box flex={1}>
                        <GlobalInput
                            field="countries"
                            value={
                                props?.profile?.country?.length
                                  ? props?.profile?.country.join(', ')
                                  : 'N/A'
                            }
                            label={wWidth > profileCardLimits.top || wWidth < profileCardLimits.bottom ? t('company_profile.labels.country') : t('company_profile.labels.country').slice(0, -7) + '.'}
                            disabled
                            className={classes.disabledText}
                        />
                    </Box>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    className={classes.boxContainer}
                >
                    <Box
                        flex={2}
                        display="flex"
                        flexDirection="row"
                        className={classes.boxContainer}
                    >
                        <GlobalInput
                            field="business_hours_phone"
                            value={maskValue(props?.profile?.business_hours?.phone)}
                            label={wWidth > profileCardLimits.top || wWidth < profileCardLimits.bottom ? t('company_profile.labels.business_hours') : t('company_profile.labels.business_hours_ab')}
                            disabled
                            className={classes.disabledText}
                        />
                        <GlobalInput
                            field="after_hours_phone"
                            value={maskValue(props?.profile?.after_hours?.phone)}
                            label={wWidth > profileCardLimits.top || wWidth < profileCardLimits.bottom ? t('company_profile.labels.after_hours') : t('company_profile.labels.after_hours_ab')}
                            disabled
                            className={classes.disabledText}
                        />
                    </Box>
                    <Box flex={1}></Box>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    className={classes.boxContainer}
                >
                    <Box
                        flex={2}
                        display="flex"
                        flexDirection="row"
                        className={classes.boxContainer}
                    >
                        <GlobalInput
                            field="businesshours_phone"
                            value={props?.profile?.email ?? 'N/A'}
                            label={t('company_profile.labels.email')}
                            disabled
                            className={classes.disabledText}
                        />
                        <GlobalInput
                            field="countries"
                            value={props?.profile?.invoice_email ?? 'N/A'}
                            label={t('company_profile.labels.invoice_email')}
                            disabled
                            className={classes.disabledText}
                        />
                    </Box>
                    <Box flex={1}></Box>
                </Box>
            </Box>
        </Card>
  )
}
