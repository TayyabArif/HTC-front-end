import {
  Box,
  Button,
  Card,
  InputLabel,
  Link,
  Typography
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getCompanyFile } from '../../services/ApiService'
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

const FileCard = props => {
  const classes = profileInfoCardStyles()
  const { t } = useTranslation()

  function toMonthName (monthNumber) {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    // using visitor's default locale
    return date.toLocaleString([], {
      month: 'short'
    })
  }

  async function handleFileDownload (event, name) {
    try {
      const response = await getCompanyFile(props.data)
      const byteArray = new Uint8Array(response.body.data)
      const blob = new Blob([byteArray], { type: response.contentType })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('File could not be downloaded ', error)
    }
  }
  return (
        <Card className={classes.fileCard}>
            <Box>
                <Typography className={classes.fileTitle}>{props.label}</Typography>
                {props.number && (
                    <Typography className={classes.fileData}>{props.number}</Typography>
                )}
                {props.data
                  ? (
                    <Link
                        onClick={async event => await handleFileDownload(event, props.name)}
                        target="_blank"
                        rel="noopener"
                    >
                        <Typography className={classes.fileLink}>
                            {props.name ?? 'file'}
                        </Typography>
                    </Link>
                    )
                  : (
                    <Typography className={classes.fileData}>
                        {t('company_settings.card.no_file')}
                    </Typography>
                    )}

                <Typography className={classes.fileData}>
                    {t('company_settings.card.expiration') +
                        ': ' +
                        (props.year ? toMonthName(props.month) + ' ' + props.year : 'N/A')}
                </Typography>
            </Box>
        </Card>
  )
}

export const ProfileInfoCard = props => {
  const classes = profileInfoCardStyles()
  const { t } = useTranslation()

  const handleEditProfile = () => {
    props.setComponent('profile')
    props.setOpen(true)
  }
  const handleEditInsurance = () => {
    props.setComponent('insurance')
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
                <Box className={classes.sectionDivider}>
                    <Typography classes={{ root: classes.cardSubtitle }}>
                        {t('company_settings.card.name')}
                    </Typography>
                </Box>
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
                    >
                        <GlobalInput
                            field="entity"
                            value={props?.profile?.legal_entity ?? 'N/A'}
                            label={t('company_profile.labels.entity')}
                            disabled
                            className={classes.disabledText}
                        />
                        <GlobalInput
                            field="dba"
                            value={props?.profile?.dba ?? 'N/A'}
                            label={t('company_profile.labels.dba')}
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
                    <Box flex={2}>
                        <GlobalInput
                            field="address"
                            value={
                                props?.profile?.address?.address?.length
                                  ? props?.profile?.address?.address
                                  : 'N/A'
                            }
                            label={t('company_profile.labels.headquarters')}
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
                            value={props?.profile?.dispatch_email ?? 'N/A'}
                            label={t('company_profile.labels.dispatch')}
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

            <Box
                display="flex"
                flexDirection="row"
                className={classes.sectionDivider}
            >
                <Typography classes={{ root: classes.cardSubtitle }}>
                    {t('company_settings.card.insurance')}
                </Typography>
                <EditButton
                    label={t('company_settings.buttons.edit')}
                    onClick={handleEditInsurance}
                />
            </Box>
            {/* Insurance info */}
            <Box display="flex">
                <Box flex={2} marginRight="1em">
                    <GlobalInput
                        field="ein"
                        value={props?.profile?.ein ?? 'N/A'}
                        label={t('company_profile.labels.ein')}
                        disabled
                        className={classes.disabledText}
                    />
                    {props.profile?.states_registered?.map(register => {
                      return (
                            <Box
                                display="flex"
                                flexDirection="row"
                                className={classes.boxContainer}
                                key={register.license}
                            >
                                <GlobalInput
                                    field="state"
                                    value={register.state ?? 'N/A'}
                                    label={t('company_profile.labels.state')}
                                    disabled
                                    className={classes.disabledText}
                                />
                                <GlobalInput
                                    field="license"
                                    value={register.license ?? 'N/A'}
                                    label={t('company_profile.labels.contractor_licence')}
                                    disabled
                                    className={classes.disabledText}
                                />
                            </Box>
                      )
                    })}
                    {props.profile?.states_registered?.length === 0 && (
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.boxContainer}
                        >
                            <GlobalInput
                                field="state"
                                value={'N/A'}
                                label={t('company_profile.labels.state')}
                                disabled
                                className={classes.disabledText}
                            />
                            <GlobalInput
                                field="license"
                                value={'N/A'}
                                label={t('company_profile.labels.contractor_licence')}
                                disabled
                                className={classes.disabledText}
                            />
                        </Box>
                    )}
                    <Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.questionDivider}
                        >
                            <Box flex={5}>
                                <InputLabel className={classes.question}>
                                    {t('company_profile.questions.trucks')}
                                </InputLabel>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.questionDivider}
                        >
                            <Box flex={5}>
                                <InputLabel className={classes.question}>
                                    {t('company_profile.questions.field_employees')}
                                </InputLabel>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.questionDivider}
                        >
                            <Box flex={5}>
                                <InputLabel className={classes.question}>
                                    {t('company_profile.questions.administrative_employees')}
                                </InputLabel>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.questionDivider}
                        >
                            <Box flex={5}>
                                <InputLabel className={classes.question}>
                                    {t('company_profile.questions.years')}
                                </InputLabel>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            className={classes.questionDivider}
                        >
                            <Box flex={5}>
                                <InputLabel className={classes.question}>
                                    {t('company_profile.questions.subcontractors')}
                                </InputLabel>
                            </Box>
                            <Box flex={1}>
                                <GlobalInput
                                    field="q_trucks"
                                    value={
                                        props?.profile?.insurance_questions?.q_subcontractors
                                          ? t('company_profile.yes')
                                          : t('company_profile.no') ?? 'N/A'
                                    }
                                    className={classes.disabledTextCenter}
                                    disabled
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box flex={1}>
                    <FileCard
                        label={t('company_settings.card.w9')}
                        data={props.profile?.w9?.url}
                        name={props.profile?.w9?.file_name}
                    />
                    <FileCard
                        label={t('company_settings.card.coi')}
                        data={props.profile?.coi?.url}
                        name={props.profile?.coi?.file_name}
                        month={props.profile?.coi?.coi_month}
                        year={props.profile?.coi?.coi_year}
                        number={props.profile?.coi?.coi_policy}
                    />
                    <FileCard
                        label={t('company_settings.card.comp')}
                        data={props.profile?.comp?.url}
                        name={props.profile?.comp?.file_name}
                        month={props.profile?.comp?.comp_month}
                        year={props.profile?.comp?.comp_year}
                        number={props.profile?.comp?.comp_policy}
                    />
                </Box>
            </Box>
        </Card>
  )
}
