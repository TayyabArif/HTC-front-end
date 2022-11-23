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

const EditButton = props => {
  const classes = profileInfoCardStyles()
  return (
        <Button className={classes.editButton} onClick={props.onClick}>
            {props.label}
        </Button>
  )
}

export const ProfileInfoCard = props => {
  const classes = profileInfoCardStyles()
  const { t } = useTranslation()

  const handleEditProfile = () => {
    props.setComponent('profile')
    props.setOpen(true)
  }

  return (
        <Card className={classes.card}>
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
                    display="flex"
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
                                  ? props?.profile?.country
                                  : 'N/A'
                            }
                            label={t('company_profile.labels.country')}
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
                            field="businesshours_phone"
                            value={props?.profile?.business_hours?.phone ?? 'N/A'}
                            label={t('company_profile.labels.business_hours')}
                            disabled
                            className={classes.disabledText}
                        />
                        <GlobalInput
                            field="countries"
                            value={props?.profile?.after_hours?.phone ?? 'N/A'}
                            label={t('company_profile.labels.after_hours')}
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
