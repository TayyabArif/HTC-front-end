import { React, useEffect, useState } from 'react'

// mui components
import {
  Container,
  Grid,
  Typography,
  Box,
  InputLabel
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import GlobalUploadFile from '../form/UploadFile'
import GlobalInput from '../form/TextInput'
import { ExpirationDate } from '../form/ExpirationDate'
import { YesNoQuestion } from '../form/YesNoQuestion'
import { StatesComponent } from './StatesComponent'
import { maxFileSize } from '../../lib/Constants'
import { getCompanyFile } from '../../services/ApiService'
import { insuranceComponentStyles } from '../../styles/classes/CompanySettingsClasses'

export const InsuranceComponent = props => {
  const classes = insuranceComponentStyles()
  const { t } = useTranslation()
  const { profile, handleChange, handleFileChange, setFileUploaded } = props
  const [statesRegistered, setStatesRegistered] = useState()

  useEffect(async () => {
    if (profile?.states_registered) {
      setStatesRegistered([...profile?.states_registered])
    }
  }, [])

  useEffect(() => {
    if (profile) {
      handleChange(statesRegistered, 'states_registered')
    }
  }, [statesRegistered])

  function handleClear (field) {
    setFileUploaded(null, field)
  }

  async function handleFileDownload (event, name) {
    try {
      const response = await getCompanyFile(name)
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
    <Container classes={{ root: classes.infoContainer }}>
      <Grid container className={classes.titleContainer}>
        <Grid item xs={12}>
          <Typography classes={{ root: classes.title }}>
            {t('company_profile.info_insurance')}
          </Typography>
          <Typography classes={{ root: classes.subtitle }}>
            {t('company_profile.message.company_profile')}
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex" className={classes.itemContainer}>
        <Box flex={1} className={classes.componentDivider}>
          <StatesComponent
            states={props.states}
            data={statesRegistered}
            updateData={setStatesRegistered}
            required={
              props.requiredFields &&
              Object.prototype.hasOwnProperty.call(
                props?.requiredFields,
                'states_registered'
              )
            }
          />
          <Box
            display="flex"
            flexDirection="row"
            className={classes.questionDivider}
          >
            <Box flex={5}>
              <InputLabel className={classes.question}>
                {props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'q_trucks'
                  ) && <span className={classes.required}>*</span>}
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
                {props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'q_field_employees'
                  ) && <span className={classes.required}>*</span>}
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
                {props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'q_administrative_employees'
                  ) && <span className={classes.required}>*</span>}
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
                {props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'q_business_years'
                  ) && <span className={classes.required}>*</span>}
                {t('company_profile.questions.years')}
              </InputLabel>
            </Box>
          </Box>
          <Box>
            <YesNoQuestion
              label={t('company_profile.questions.subcontractors')}
              field="q_subcontractors"
              onChange={handleChange}
              value={
                profile?.insurance_questions?.q_subcontractors ? 'yes' : 'no'
              }
            />
          </Box>
        </Box>
        {/* right column components */}
        <Box
          flex={1}
          className={`${classes.componentDivider} ${classes.rightColumn}`}
        >
          <Box display="flex" flexDirection="row">
            <Box flex={1} className={classes.componentDivider}>
              <GlobalUploadFile
                buttonLabel={t('company_profile.labels.upload_file')}
                label={t('company_profile.upload.w9')}
                onChange={handleFileChange}
                field="w9"
                accept=".pdf, image/*"
                value={profile?.w9?.url}
                fileName={profile?.w9?.file_name}
                handleClear={handleClear}
                error={props.fileError.w9}
                helperText={t('company_profile.error.file_size').replace(
                  '$size$',
                  maxFileSize
                )}
                loadingLabel={t('company_profile.labels.loading')}
                handleFileDownload={handleFileDownload}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'w9'
                  )
                }
              />
            </Box>
            <Box flex={1} className={classes.componentDivider}></Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex={1} className={classes.componentDivider}>
              <GlobalUploadFile
                buttonLabel={t('company_profile.labels.upload_file')}
                label={t('company_profile.upload.coi')}
                onChange={handleFileChange}
                field="coi"
                accept=".pdf, image/*"
                value={profile?.coi?.url}
                fileName={profile?.coi?.file_name}
                handleClear={handleClear}
                error={props.fileError.coi}
                helperText={t('company_profile.error.file_size').replace(
                  '$size$',
                  maxFileSize
                )}
                loadingLabel={t('company_profile.labels.loading')}
                handleFileDownload={handleFileDownload}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'coi'
                  )
                }
              />
            </Box>
            <Box flex={1} className={classes.componentDivider}>
              <ExpirationDate
                label={t('company_profile.questions.coi')}
                month={profile?.coi?.coi_month}
                year={profile?.coi?.coi_year}
                month_field="coi_month"
                year_field="coi_year"
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '215px'
                    }
                  }
                }}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'coi_date'
                  )
                }
              />
            </Box>
          </Box>
          <Box className={classes.componentDivider}>
            <GlobalInput
              onChange={handleChange}
              field="coi_policy"
              placeholder={t('company_profile.placeholder.coi')}
              value={profile?.coi?.coi_policy}
              label={t('company_profile.labels.coi')}
              required={
                props.requiredFields &&
                Object.prototype.hasOwnProperty.call(
                  props?.requiredFields,
                  'coi_policy'
                )
              }
            />
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex={1} className={classes.componentDivider}>
              <GlobalUploadFile
                buttonLabel={t('company_profile.labels.upload_file')}
                label={t('company_profile.upload.comp')}
                onChange={handleFileChange}
                field="comp"
                accept=".pdf, image/*"
                value={profile?.comp?.url}
                fileName={profile?.comp?.file_name}
                handleClear={handleClear}
                error={props.fileError.comp}
                helperText={t('company_profile.error.file_size').replace(
                  '$size$',
                  maxFileSize
                )}
                loadingLabel={t('company_profile.labels.loading')}
                handleFileDownload={handleFileDownload}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'comp'
                  )
                }
              />
            </Box>
            <Box flex={1} className={classes.componentDivider}>
              <ExpirationDate
                label={t('company_profile.questions.comp')}
                month={profile?.comp?.comp_month}
                year={profile?.comp?.comp_year}
                month_field="comp_month"
                year_field="comp_year"
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: '215px'
                    }
                  }
                }}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'comp_date'
                  )
                }
              />
            </Box>
          </Box>
          <Box className={classes.componentDivider}>
            <GlobalInput
              onChange={handleChange}
              field="comp_policy"
              placeholder={t('company_profile.placeholder.comp')}
              value={profile?.comp?.comp_policy}
              label={t('company_profile.labels.comp')}
              required={
                props.requiredFields &&
                Object.prototype.hasOwnProperty.call(
                  props?.requiredFields,
                  'comp_policy'
                )
              }
            />
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex={1} className={classes.componentDivider}>
              <GlobalUploadFile
                buttonLabel={t('company_profile.labels.upload_file')}
                label={t('company_profile.upload.void')}
                onChange={handleFileChange}
                field="bank"
                accept=".pdf, image/*"
                value={profile?.bank?.url}
                fileName={profile?.bank?.file_name}
                handleClear={handleClear}
                error={props.fileError.bank}
                helperText={t('company_profile.error.file_size').replace(
                  '$size$',
                  maxFileSize
                )}
                loadingLabel={t('company_profile.labels.loading')}
                handleFileDownload={handleFileDownload}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'bank'
                  )
                }
              />
            </Box>
            <Box flex={1} className={classes.componentDivider}>
              <GlobalInput
                onChange={handleChange}
                field="bank_name"
                placeholder={t('company_profile.placeholder.bank')}
                value={profile?.bank?.bank_name}
                label={t('company_profile.labels.bank')}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'bank_name'
                  )
                }
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex={1} className={classes.componentDivider}>
              <GlobalInput
                onChange={handleChange}
                field="bank_account"
                placeholder={t('company_profile.placeholder.account_number')}
                value={profile?.bank?.bank_account}
                label={t('company_profile.labels.account_number')}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'bank_account'
                  )
                }
              />
            </Box>
            <Box flex={1} className={classes.componentDivider}>
              <GlobalInput
                onChange={handleChange}
                field="bank_routing"
                placeholder={t('company_profile.placeholder.routing_number')}
                value={profile?.bank?.bank_routing}
                label={t('company_profile.labels.routing_number')}
                required={
                  props.requiredFields &&
                  Object.prototype.hasOwnProperty.call(
                    props?.requiredFields,
                    'bank_routing'
                  )
                }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
