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

// mui components
import {
  Typography,
  Container,
  makeStyles,
  Box,
  Card,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { ProfileInfoCard } from '../components/companysettings/ProfileInfoCard'
import { TradesServicesCard } from '../components/companysettings/TradesServicesCard'
import { cloneDeep } from 'lodash'
import { CompanyProfileComponent } from '../components/companyprofile/CompanyProfileComponent'
import { InsuranceComponent } from '../components/companyprofile/InsuranceComponent'
import { ClientsComponent } from '../components/companyprofile/ClientsComponent'
import { ServiceComponent } from '../components/companyprofile/ServiceComponent'
import {
  getBase64,
  getSelectedZiCodesNumber,
  parseMapPin,
  profileMandatoryValidation,
  validateEmail
} from '../lib/Global'
import {
  callLocationApi,
  callZipApi,
  parsePolygonList,
  parseStateList,
  parseZipList
} from '../services/ApiLocationService'
import { maxFileSize } from '../lib/Constants'

const useStyles = makeStyles(theme => ({
  '@global': {
    '.pac-container': {
      zIndex: '999999 !important',
      width: '303px !important'
    }
  },
  container: {
    padding: '0px',
    margin: '0px',
    maxWidth: '100%',
    width: '100%',
    height: '400px'
  },
  cardsContainer: {
    gap: '3em',
    margin: '0px 47px'
  },
  card: {
    borderRadius: '8px',
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    marginBottom: '2em',
    padding: '1em'
  },
  title: {
    fontSize: '20px',
    fontWeight: '900',
    color: theme.colors.text,
    padding: '24px 0px 30px 42px'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '900',
    color: theme.colors.text
  },
  avatar: {
    width: '140px',
    height: '140px',
    '&.MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  emptyAvatar: {
    width: '140px',
    height: '140px',
    backgroundColor: 'white',
    border: '4px solid black'
  },
  editButton: {
    marginLeft: 'auto',
    marginRight: '0',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    lineHeight: '19px'
  },
  dialog: {
    width: '80%'
  },
  saveButton: {
    background: theme.colors.iconBlue,
    color: 'white',
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '36px',
    width: '160px',
    alignSelf: 'flex-end',
    marginRight: '84px',
    marginBottom: '37px',
    marginTop: '48px'
  },
  editComponent: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: '70%',
      minWidth: '70%'
    },
    '& .MuiDialogContent-root': {
      padding: '0px'
    }
  },
  error: {
    color: theme.colors.workOrderColors.no_work_order
  },
  compliant: {
    color: theme.colors.workOrderColors.approved
  },
  dialogTitle: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  dialogText: {
    fontSize: '18px',
    fontWeight: '500'
  },
  background: {
    maxWidth: '100%',
    backgroundColor: theme.colors.complianceBlue,
    height: '400px',
    position: 'absolute',
    top: 0,
    zIndex: -1
  }
}))

const CompanySettings = props => {
  const { t } = useTranslation()
  const classes = useStyles()
  const userStore = useSelector(state => state.auth.user)
  const [company, setCompany] = useState(null)
  const [updatedCompany, setUpdatedCompany] = useState(null)
  const [roles, setRoles] = useState(null)
  const [ftcUsers, setFtcUsers] = useState([])
  const [mobileUsers, setMobileUsers] = useState([])
  const [compliance, setCompliance] = useState('')
  // Map components
  const [markers, setMarkers] = useState([])
  const [paths, setPaths] = useState([])
  const [initialPosition, setInitialPosition] = useState()
  const [centerRadius, setCenterRadius] = useState(null)
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [logoData, setLogoData] = useState()
  const [component, setComponent] = useState('')
  const [states, setStates] = useState()
  const [dispatchError, setDispatchError] = useState(false)
  const [invoiceError, setInvoiceError] = useState(false)
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

  useEffect(async () => {
    try {
      setComplianceFields(
        userStore.userInfo?.configurations?.onboarding?.compliance
      )
      const response = await getCompanyProfile(userStore.userInfo.company_id)
      setCompany(response)
      // TODO concat all service areas
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
  }, [])

  useEffect(async () => {
    if (reloadServiceArea) {
      if (updatedCompany?.service_area) {
        updatedCompany.service_area[0].zip = await getZipCodesFiltered(
          updatedCompany?.service_area[0]
        )
        parseDataToMapView(updatedCompany.service_area[0])
      }
      setRealoadServiceArea(false)
    }
  }, [reloadServiceArea])

  useEffect(() => {
    setUpdatedCompany({ ...company })
    setCompliance(calculateCompliance())
  }, [company])

  useEffect(() => {
    setCompliance(calculateCompliance())
  }, [ftcUsers, mobileUsers])

  useEffect(() => {
    handleValidations(updatedCompany)
  }, [fileError, validHours])

  useEffect(async () => {
    // load states/territories
    setStates(await loadAsyncStates())
  }, [company])

  const loadAsyncStates = async () => {
    const countries = company?.country?.length
    let statesArray = []
    if (countries === 1) {
      const statesData = await callLocationApi('POST', '/states', {
        country: company?.country[0]
      })
      if (statesData?.data?.states) {
        statesArray = parseStateList(statesData?.data?.states)
      }
    } else if (countries > 1) {
      const newCountries = [...company.country]
      const index = newCountries.indexOf('Mexico')
      if (index > -1) newCountries.splice(newCountries.indexOf('Mexico'), 1)
      newCountries.forEach(async element => {
        const statesData = await callLocationApi('POST', '/states', {
          country: element
        })
        statesArray.push(...parseStateList(statesData?.data?.states))
      })
    }
    return statesArray
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
    const selectionZipArray = cloneDeep(serviceAreaSelected.zip)
    if (!selectionZipArray?.length) return
    if (serviceAreaSelected.radius) {
      setCenterRadius({
        lat: serviceAreaSelected.lat,
        lng: serviceAreaSelected.lng,
        radius: ~~serviceAreaSelected.radius
      })
    }
    const cities = selectionZipArray
    const markList = parseMapPin(cities)
    setMarkers(markList)

    findCenter(markList)
    // zip id list to query polygons
    const zipIds = []
    markList?.map(async marker => {
      zipIds.push(marker.id)
    })
    // query polygon data for selected area
    const zipResponse = await callZipApi('POST', '/areas/', {
      zipId: JSON.stringify(zipIds)
    })
    const pathList = []
    // parse pathlist from response
    pathList.push(parsePolygonList(zipResponse))
    setPaths(pathList)
  }

  const [zoom, setZoom] = useState()
  const findCenter = markers => {
    let minLat = 90
    let maxLat = -90
    let minLng = 180
    let maxLng = -180
    markers?.forEach(mark => {
      if (mark.lat < minLat) minLat = mark.lat
      if (mark.lat > maxLat) maxLat = mark.lat
      if (mark.lng < minLng) minLng = mark.lng
      if (mark.lng > maxLng) maxLng = mark.lng
    })
    const mapCenter = {
      lat: minLat + (maxLat - minLat) / 2,
      lng: minLng + (maxLng - minLng) / 2
    }
    const coordDiff = Math.abs(maxLat - minLat) + Math.abs(maxLng - minLng)
    let zoomCalc
    if (coordDiff < 1) zoomCalc = 9
    else if (coordDiff < 2) zoomCalc = 8
    else if (coordDiff < 4) zoomCalc = 7
    else zoomCalc = 6

    setZoom(zoomCalc)
    setInitialPosition(mapCenter)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenConfirm(false)
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
    const { state_code, city, radius, lat, lng, unselected } = serviceArea
    let zip = []
    if (radius && lat && lng) {
      zip = await callZipApi('GET', `/radius/${radius}/${lat}/${lng}`)
    } else {
      if (city?.includes('All Cities')) {
        zip = await callZipApi('GET', `/state/${state_code}`)
      } else {
        zip =
          (await callZipApi('POST', `/cities/state/${state_code}`, {
            cities: JSON.stringify(city)
          })) ?? []
        if (zip?.length) {
          zip = zip?.filter(
            item =>
              item._source?.state === state_code &&
              city.includes(item._source?.primary_city) &&
              item._score > 8
          )
        }
      }
    }
    zip = parseZipList(zip)
    if (unselected) {
      zip = filterUnselectedZipCodes(zip, unselected)
    }
    return zip
  }

  const filterUnselectedZipCodes = (zipCodeList, unselected) => {
    if (!zipCodeList?.length) return []
    const { cities, zip, county } = unselected
    const newZipList = []
    for (const item of zipCodeList) {
      if (
        cities?.includes(item.city) ||
        zip?.includes(item.zip) ||
        county?.includes(item.county)
      ) {
        item.selected = false
      }
      newZipList.push(item)
    }
    return newZipList
  }

  const handleSave = async () => {
    try {
      const newProfile = { ...updatedCompany }
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
      setCompany(response)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  function editComponent(targetComponent) {
    switch (targetComponent) {
      case 'profile':
        return (
          <CompanyProfileComponent
            profile={updatedCompany}
            handleChange={handleChange}
            showLogo={false}
            dispatchError={dispatchError}
            invoiceError={invoiceError}
            setValidHours={setValidHours}
            requiredFields={complianceFields?.information?.fields}
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
      case 'service':
        return (
          <ServiceComponent profile={company} handleChange={handleChange} />
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
    const data = { ...updatedCompany }
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
      data[field] = value
    }
    // restore default values
    if (data.support_24_7) {
      data.after_hours = {
        phone: '',
        weekend_days: 'weekend',
        time_from: null,
        time_to: null,
        weekend_time_from: null,
        weekend_time_to: null
      }
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

  function equalObjects(object1, object2) {
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
  function isObject(object) {
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
    data.logo.url = logoData
    setUpdatedCompany(data)
    handleClose()
    await handleSave()
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
    if (data?.dispatch_email && !validateEmail(data?.dispatch_email)) {
      setDispatchError(true)
      return false
    }
    if (data?.invoice_email && !validateEmail(data?.invoice_email)) {
      setInvoiceError(true)
      return false
    }
    setDispatchError(false)
    setInvoiceError(false)
    const mandatoryValidation = profileMandatoryValidation(
      complianceFields?.information?.fields,
      data
    )
    return mandatoryValidation && validHours
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
    <Container className={classes.container}>
      <Box
        className={classes.background}
        style={{ width: compliance ? compliance.split('%')[0] + '%' : '100%' }}
      />
      <Box display="flex" flexDirection="row">
        <Typography classes={{ root: classes.title }}>
          {t('company_settings.title')}
        </Typography>
        <Typography
          className={`${classes.title} ${
            compliance?.includes('100%') ? classes.compliant : classes.error
          }`}
        >
          {compliance}
        </Typography>
      </Box>
      <Box display="flex" className={classes.cardsContainer}>
        <Box flex={1}>
          {/* Logo card */}
          <Card className={classes.card}>
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
              </label>
            </Box>
          </Card>
          {/* Profile card */}
          <ProfileInfoCard
            profile={company}
            setOpen={setOpen}
            setComponent={setComponent}
          />
          {/* trades & services card */}
          <TradesServicesCard
            profile={company}
            setOpen={setOpen}
            setComponent={setComponent}
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
          {/* Mobile only users */}
          <UsersCard
            roles={roles}
            company={company}
            cardtitle={t('company_settings.card.field_users')}
            users={mobileUsers}
            updateUsers={updateUsers}
            mobile={true}
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
            onClick={handleSave}
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
          {logoError ? (
            ''
          ) : (
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
