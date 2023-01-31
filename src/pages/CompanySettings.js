/* eslint-disable camelcase */
// main components
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getCompanyProfile,
  getCompanyUsers,
  updateCompany,
  uploadCompanyFile
} from '../services/ApiService'
import { getRoles } from '../lib/Api'

import { RolesCard } from '../components/companySettings/RolesCard'
import { UsersCard } from '../components/companySettings/UsersCard'
import { SupportCard } from '../components/companySettings/SupportCard'
import { PreferencesCard } from '../components/companySettings/PreferencesCard'

// mui components
import {
  Typography,
  Container,
  Box,
  Card,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from '@mui/material'
import { useSelector } from 'react-redux'
import { ProfileInfoCard } from '../components/companySettings/ProfileInfoCard'
import { cloneDeep } from 'lodash'
import { CompanyProfileComponent } from '../components/companyprofile/CompanyProfileComponent'
import { InsuranceComponent } from '../components/companyprofile/InsuranceComponent'
import { ClientsComponent } from '../components/companyprofile/ClientsComponent'
import {
  getBase64,
  getSelectedZiCodesNumber,
  profileMandatoryValidation,
  validateEmail
} from '../lib/Global'
import { maxFileSize } from '../lib/Constants'
import { companySettingsStyles } from '../styles/classes/CompanySettingsClasses'

const CompanySettings = props => {
  const { t } = useTranslation()
  const classes = companySettingsStyles()
  const userStore = useSelector(state => state.auth.user)
  const [company, setCompany] = useState(null)
  const [afterHoursPhone, setAfterHoursPhone] = useState(null)
  const [updatedCompany, setUpdatedCompany] = useState(null)
  const [roles, setRoles] = useState(null)
  const [ftcUsers, setFtcUsers] = useState([])
  const [mobileUsers, setMobileUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [logoData, setLogoData] = useState()
  const [component, setComponent] = useState('')
  const [states, setStates] = useState()
  const [fileError, setFileError] = useState({
    w9: false,
    coi: false,
    comp: false,
    bank: false
  })
  const [logoError, setLogoError] = useState(false)
  const [validHours, setValidHours] = useState(true)
  const [reloadServiceArea, setRealoadServiceArea] = useState(false)
  const [complianceFields, setComplianceFields] = useState({})

  useEffect(() => {
    initialMethod()
  }, [])

  const initialMethod = async () => {
    try {
      setComplianceFields(
        userStore.userInfo?.configurations?.onboarding?.compliance
      )
      const response = await getCompanyProfile(userStore.userInfo.company_id)
      setAfterHoursPhone(response?.after_hours?.phone)
      setCompany(response)
      if (response?.service_area) {
        response.service_area[0].zip = await getZipCodesFiltered(
          response?.service_area[0]
        )
        parseDataToMapView(response.service_area[0])
      }
    } catch (error) {
      console.error('Error retrieving company profile: ', error)
    }
    updateRoles()
    updateUsers()
  }

  useEffect(() => {
    changeServiceArea()
  }, [reloadServiceArea])

  const changeServiceArea = async () => {
    if (reloadServiceArea) {
      if (updatedCompany?.service_area) {
        updatedCompany.service_area[0].zip = await getZipCodesFiltered(
          updatedCompany?.service_area[0]
        )
        parseDataToMapView(updatedCompany.service_area[0])
      }
      setRealoadServiceArea(false)
    }
  }

  useEffect(() => {
    setUpdatedCompany({ ...company })
  }, [company])

  useEffect(() => {
    handleValidations(updatedCompany)
  }, [fileError, validHours])

  useEffect(() => {
    loadAsyncStates()
  }, [company])

  const loadAsyncStates = async () => {
    setStates([])
  }

  const updateRoles = async () => {
    try {
      const response = await getRoles(userStore.userInfo.company_id)
      setRoles(response)
    } catch (error) {
      console.error(error)
      setRoles([])
    }
  }

  const updateUsers = async () => {
    try {
      setMobileUsers([])
      setFtcUsers([])
      const response = await getCompanyUsers(userStore.userInfo.company_id)
      const mobile = response.filter(
        user => !user.roles || user.roles === 'no_value'
      )
      setMobileUsers(mobile)
      const ftc = response.filter(
        user => user.roles && user.roles !== 'no_value'
      )
      setFtcUsers(ftc)
    } catch (error) {
      console.error(error)
      setMobileUsers([])
      setFtcUsers([])
    }
  }

  const parseDataToMapView = async serviceAreaSelected => {
  }

  const handleClose = () => {
    setOpen(false)
    setOpenConfirm(false)
    setUpdatedCompany({ ...company })
  }
  const parseAreaServiceToApi = serviceAreaList => {
    const newServiceAreaArray = []
    for (const serviceArea of serviceAreaList) {
      const newServiceArea = cloneDeep(serviceArea)
      if (newServiceArea.zip) {
        newServiceArea.zip_length = getSelectedZiCodesNumber(newServiceArea.zip)
        delete newServiceArea.zip
      }
      newServiceAreaArray.push(newServiceArea)
    }
    return newServiceAreaArray
  }

  const getZipCodesFiltered = async serviceArea => {
  }

  const handleSave = async (data) => {
    try {
      const newProfile = { ...data }
      delete newProfile.company
      delete newProfile.id
      delete newProfile.external_token
      delete newProfile.client_ids
      newProfile.compliance = calculateCompliance()
        ? parseInt(calculateCompliance().split('%')[0])
        : undefined
      newProfile.update_information = true
      // set step to control file upload only on Insurance info edit
      if (component === 'insurance') {
        newProfile.step = 1
      }
      if (component === 'service') {
        newProfile.service_area = parseAreaServiceToApi(newProfile.service_area)
        setRealoadServiceArea(true)
      }
      // format fields to save on SF
      if (newProfile?.clients) {
        newProfile.formatted_clients = [...newProfile?.clients]
          .map(client => {
            return t('company_profile.clients.' + client)
          })
          .join(', ')
      }
      if (newProfile?.states_registered) {
        newProfile.formatted_states = [...newProfile?.states_registered]
          .map(state => {
            return state.license
              ? state.state + ' - ' + state.license
              : state.state
          })
          .join(', ')
      }
      await updateCompany(userStore.userInfo.company_id, newProfile)
      // get updated object
      const response = await getCompanyProfile(userStore.userInfo.company_id)
      setAfterHoursPhone(response?.after_hours?.phone)
      setCompany(response)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  function editComponent (targetComponent) {
    switch (targetComponent) {
      case 'profile':
        return (
          <CompanyProfileComponent
            profile={updatedCompany}
            handleChange={handleChange}
            showLogo={false}
            setValidHours={setValidHours}
            requiredFields={complianceFields?.information?.fields}
            afterHoursPhone={afterHoursPhone}
          />
        )
      case 'insurance':
        return (
          <InsuranceComponent
            profile={updatedCompany}
            handleChange={handleChange}
            states={states}
            handleFileChange={handleFileChange}
            setFileUploaded={setFileUploaded}
            fileError={fileError}
            setFileError={setFileError}
            requiredFields={complianceFields?.insurance?.fields}
          />
        )
      case 'trades':
        return (
          <ClientsComponent profile={company} handleChange={handleChange} />
        )
      default:
        break
    }
  }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleChange = (value, field) => {
    let data = { ...updatedCompany }
    if (!field) return
    if (field.match(/coi_.*/)) {
      const tempData = { ...data?.coi }
      tempData[field] = value
      data.coi = { ...tempData }
    } else if (field.match(/comp_.*/)) {
      const tempData = { ...data?.comp }
      tempData[field] = value
      data.comp = { ...tempData }
    } else if (field.match(/bank_.*/)) {
      const tempData = { ...data?.bank }
      tempData[field] = value
      data.bank = { ...tempData }
    } else if (field.match(/q_.*/)) {
      const tempData = { ...data?.insurance_questions }
      tempData[field] = value
      data.insurance_questions = { ...tempData }
    } else if (field === 'country') {
      const countries = typeof value === 'string' ? value.split(',') : value
      data.country = countries
    } else {
      data = { ...data, [field]: value }
    }
    setUpdatedCompany({ ...data })
    handleValidations(data)
  }

  const setFileUploaded = (fileData, field, fileName) => {
    const data = { ...updatedCompany }
    const tempData = { ...data[field] }
    tempData.url = fileData
    tempData.file_name = fileName
    data[field] = { ...tempData }
    setUpdatedCompany({ ...data })
    handleValidations(data)
  }
  const handleFileChange = async (file, field) => {
    const errorTmp = { ...fileError }
    const fileSize = file.size / 1024 / 1024
    if (fileSize > maxFileSize) {
      errorTmp[field] = true
      setFileError(errorTmp)
      setFileUploaded('', field, '')
    } else {
      const extension = file.name.split('.').pop()
      const fileName =
        field + '_' + userStore.userInfo.company_id + '.' + extension
      const uploadPath =
        userStore.userInfo.company_id + '/' + field + '/' + fileName
      errorTmp[field] = false
      setFileError(errorTmp)
      getBase64(file, async result => {
        const data = {
          data: result,
          path: uploadPath,
          contentType: file.type,
          encrypt: true
        }
        const response = await uploadCompanyFile(
          userStore.userInfo.company_id,
          data
        )
        setFileUploaded(response, field, file.name)
      })
    }
  }

  function equalObjects (object1, object2) {
    if (!object1 || !object2) return
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
      return false
    }
    for (const key of keys1) {
      const val1 = object1[key]
      const val2 = object2[key]
      const areObjects = isObject(val1) && isObject(val2)
      if (
        (areObjects && !equalObjects(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false
      }
    }
    return true
  }
  function isObject (object) {
    return object != null && typeof object === 'object'
  }

  const calculateCompliance = () => {
    if (!company) return
    if (!userStore.userInfo?.configurations?.onboarding?.compliance) return

    const requirements = userStore.userInfo.configurations.onboarding.compliance

    let total = 0
    // COMPANY INFORMATION
    for (const field in requirements.information.fields) {
      if (company[field]) {
        total +=
          (requirements.information.section_total *
            requirements.information.fields[field]) /
          100
      }
    }

    // COMPANY INSURANCE
    for (const field in requirements.insurance.fields) {
      if (company[field]) {
        total +=
          (requirements.insurance?.section_total *
            requirements.insurance.fields[field]) /
          100
      }
    }

    // COMPANY TRADES AND SERVICES
    if (
      Array.isArray(company?.trades) &&
      company?.trades?.length > 0 &&
      company?.trades[0].services?.length > 0
    ) {
      total += requirements.tradesServices.section_total
    }

    // COMPANY SERVICE AREA
    if (
      Array.isArray(company?.service_area) &&
      company?.service_area.length > 0
    ) {
      total += requirements.serviceArea.section_total
    }

    // COMPANY USERS
    if (mobileUsers.length + ftcUsers.length > 0) {
      total += requirements.users.section_total
    }

    return total + '% ' + t('company_settings.compliant')
  }
  const handleImageChange = event => {
    const file = event.target.files[0]
    const fileSize = file.size / 1024 / 1024
    if (fileSize > maxFileSize) {
      setLogoError(true)
      setOpenConfirm(true)
    } else {
      setLogoError(false)
      getBase64(file, result => openConfirmDialog(result))
    }
    event.target.value = null
  }
  const openConfirmDialog = imageData => {
    setLogoData(imageData)
    setOpenConfirm(true)
  }

  const updateProfileLogo = async () => {
    const data = { ...company }
    data.logo = { ...data.logo, url: logoData }
    setUpdatedCompany(data)
    handleClose()
    await handleSave(data)
    setAfterHoursPhone(data?.after_hours?.phone)
    setCompany(data)
  }
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleValidations = data => {
    switch (component) {
      case 'profile':
        setButtonDisabled(!profileValidation(data))
        break
      case 'insurance':
        setButtonDisabled(!insuranceValidation(data))
        break
      case 'trades':
        setButtonDisabled(!clientsAndTradesValidation(data))
        break
      case 'service':
        setButtonDisabled(!serviceAreaValidation(data))
        break
      default:
        setButtonDisabled(true)
        break
    }
  }

  const profileValidation = data => {
    if (!(data.country && data.country.length > 0)) {
      return false
    }
    if (!data.name) {
      return false
    }
    if (!data?.email || !validateEmail(data?.email)) {
      return false
    }
    if (!data?.invoice_email || !validateEmail(data?.invoice_email)) {
      return false
    }
    return true
  }

  const insuranceValidation = data => {
    const d = new Date()
    const currentMonth = d.getMonth() + 1
    const currentYear = d.getFullYear()
    let coiValidation = true
    let compValidation = true
    let stateValidation = false
    const states = data?.states_registered
    states?.length > 1 &&
      states?.forEach(register => {
        if (!register.state) {
          stateValidation = true
        }
      })
    if (data?.coi?.coi_month > 0 || data?.coi?.coi_year > 0) {
      coiValidation = data?.coi?.coi_month && data?.coi?.coi_year
      if (
        currentYear === data?.coi?.coi_year &&
        data?.coi?.coi_month < currentMonth
      ) {
        coiValidation = false
      }
    }
    if (data?.comp?.comp_month > 0 || data?.comp?.comp_year > 0) {
      compValidation = data?.comp?.comp_month && data?.comp?.comp_year
      if (
        currentYear === data?.comp?.comp_year &&
        data?.comp?.comp_month < currentMonth
      ) {
        compValidation = false
      }
    }
    const validateFileError =
      fileError.bank || fileError.coi || fileError.comp || fileError.w9

    const mandatoryValidation = profileMandatoryValidation(
      complianceFields?.insurance?.fields,
      data
    )
    return (
      mandatoryValidation &&
      coiValidation &&
      compValidation &&
      !validateFileError &&
      !stateValidation
    )
  }

  const clientsAndTradesValidation = data => {
    // check if at least one client and trade are selected
    const validateClients = data?.clients
    const validateTrades = data?.trades
    const validateServices = validateTrades?.filter(
      trade => trade.services.length > 0
    )
    return (
      validateClients?.length > 0 &&
      validateTrades?.length > 0 &&
      validateServices.length > 0
    )
  }

  const serviceAreaValidation = data => {
    return data.service_area?.length
  }

  return (
    <Container data-testid={'company_settings_page'} className={classes.container}>
      <Box
        className={classes.background}
        style={{ width: '30%' }}
      />
      <Box display="flex" flexDirection="row">
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.title')}
        </Typography>
      </Box>
      <Box className={classes.cardsContainer}>
        <Box flex={1}>
          {/* Logo card */}
          <Card data-testid='logo_card' className={classes.card}>
            <Box display="flex" flexDirection="row">
              <Avatar
                alt="profile"
                src={company?.logo?.url ?? null}
                className={
                  company?.logo?.url ? classes.avatar : classes.emptyAvatar
                }
                imgProps={{ style: { objectFit: 'contain' } }}
              >
                {' '}
              </Avatar>
              {!company?.logo?.url &&
                <label htmlFor="profile-logo" className={classes.labelUpload}>
                  <Button id="profile-logo"
                    component="label" className={classes.uploadButton} >
                    {t('company_settings.upload_logo')}
                    <input
                      hidden
                      accept="image/png, image/jpeg, image/jpg, image/bitmap"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>
                </label>}
              {company?.logo?.url &&
                <label htmlFor="profile-logo" className={classes.editButton}>
                  <Button
                    id="profile-logo"
                    component="label"
                    className={classes.editButton}
                  >
                    {t('company_settings.buttons.edit')}
                    <input
                      hidden
                      accept="image/png, image/jpeg, image/jpg, image/bitmap"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </Button>
                </label>}
            </Box>
          </Card>
          {/* Profile card */}
          <ProfileInfoCard
            profile={company}
            setOpen={setOpen}
            setComponent={setComponent}
          />
          <PreferencesCard />
          <SupportCard
            company={company}
          />
        </Box>
        <Box flex={1} marginBottom="4em">
          {/* Web portal users */}
          <UsersCard
            roles={roles}
            company={company}
            cardtitle={t('company_settings.card.web_users')}
            users={ftcUsers}
            updateUsers={updateUsers}
            mobile={false}
          />
          <RolesCard updateRoles={updateRoles} roles={roles} />
        </Box>
      </Box>
      {/* Edit profile dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        className={classes.editComponent}
      >
        <DialogContent dividers={scroll === 'paper'}>
          {editComponent(component)}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleSave(updatedCompany)}
            className={classes.saveButton}
            disabled={equalObjects(company, updatedCompany) || buttonDisabled}
          >
            {t('company_settings.card.save')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography classes={{ root: classes.dialogTitle }}>
            {t('company_settings.card.update')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={classes.dialogText}
          >
            {logoError
              ? t('company_profile.error.file_size').replace(
                '$size$',
                maxFileSize
              )
              : t('company_settings.card.update_question')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('company_settings.card.cancel')}
          </Button>
          {logoError
            ? (
                ''
              )
            : (
              <Button onClick={updateProfileLogo} autoFocus>
                {t('company_settings.card.save')}
              </Button>
              )}
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default CompanySettings
