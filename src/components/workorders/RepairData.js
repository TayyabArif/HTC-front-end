/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'

// mui components
import { DescriptionRounded } from '@mui/icons-material'
import { Button, FormLabel, Grid, Divider, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { TaskList } from './repair/TaskList'
import { NotesComponent } from './repair/NotesComponent'
import { PhotoComponent } from './repair/PhotoComponent'
import { SimplePicker } from './repair/SimplePicker'
import { SignatureComponent } from './repair/SignatureComponent'
import { getPhotosFromRepair, getWOstatus } from '../../lib/Global'
import { repairDataStyles } from '../../styles/classes/WorkOrdersClasses'

const cloneDeep = object => {
  return JSON.parse(JSON.stringify(object))
}

export const RepairData = props => {
  const {
    repairData,
    configs,
    woServices,
    woData,
    serviceTypeOptions,
    setPhotos,
    setPhotoIndex,
    disabled,
    configRequired,
    externalUser
  } = props
  const classes = repairDataStyles()
  const { t } = useTranslation()
  const userData = useSelector(state => state.auth?.user?.userInfo)

  const [services, setServices] = useState([])
  const [repair, setRepair] = useState({})
  const [originalData, setOriginalData] = useState({})
  const [servicesConfigs, setServicesConfigs] = useState({})
  const [pickerServiceCatalogs, setPickerServiceCatalogs] = useState({})
  const [numericSuffixCatalog, setNumericSuffixCatalog] = useState({})
  // eslint-disable-next-line
  const [followOrder, setFollowOrder] = useState(false)
  // eslint-disable-next-line
  const [serviceTypeHeader, setServiceTypeHeader] = useState('')

  const [repairInitialized, setRepairInitialized] = useState(false)

  const [beforePhotos, setBeforePhotos] = useState([])
  const [afterPhotos, setAfterPhotos] = useState([])
  const [additionalPhotos, setAdditionalPhotos] = useState([])

  const [partList, setPartList] = useState([])

  const [serviceType, setServiceType] = useState(null)
  const [gated, setGated] = useState(null)

  const [systems, setSystems] = useState([])
  const [multiple, setMultiple] = useState(null)

  const [labor, setLabor] = useState(null)
  const [woExpiredCancelled, setWoExpiredCancelled] = useState(false)

  const NO_RECORD_ITEM = 'no service required'

  class InventoryPart {
    constructor (
      id,
      name,
      description,
      serial_number,
      quantity,
      options,
      location_option
    ) {
      this.id = id
      this.name = name
      this.description = DescriptionRounded
      this.serial_number = serial_number
      this.quantity = quantity
      this.options = options
      this.location_option = location_option
    }
  }

  class Part {
    constructor (description, quantity, options, location_option) {
      this.description = description
      this.quantity = quantity
      this.options = options
      this.location_option = location_option
    }
  }

  useEffect(() => {
    if (userData) {
      const {
        service_headers,
        picker_options,
        picker_header,
        service_placeholders,
        numeric_suffix
      } = userData
      const catalogs = {
        service_headers: service_headers || {},
        picker_options: picker_options || {},
        picker_header: picker_header || {},
        service_placeholders: service_placeholders || {}
      }
      if (numeric_suffix) {
        setNumericSuffixCatalog(numeric_suffix)
      }
      setPickerServiceCatalogs(catalogs)
    }
    if (externalUser) {
      const {
        service_headers,
        picker_options,
        picker_header,
        service_placeholders
      } = externalUser
      const catalogs = {
        service_headers: service_headers || {},
        picker_options: picker_options || {},
        picker_header: picker_header || {},
        service_placeholders: service_placeholders || {}
      }
      setPickerServiceCatalogs(catalogs)
    }
    let newConfigs = configs
    if (configRequired) {
      const { follow_order, header_text } = props.configs.service_type
      setFollowOrder(!!follow_order)
      if (header_text) {
        setServiceTypeHeader(header_text)
      }
      if (repairData?.data?.service_type) {
        newConfigs = {
          ...{ service_type: configs.service_type },
          ...configs.object_options[repairData?.data?.service_type]
        }
      } else {
        // For the time being always initialize with the first option
        newConfigs = {
          service_type: configs.service_type,
          ...configs.object_options[configs.service_type.options[0]]
        }
      }
    }
    setServicesConfigs(newConfigs)
    setOriginalData(cloneDeep(repairData?.data || {}))
    initRepair(
      newConfigs,
      repairData,
      configRequired ? configs.service_type.options : []
    )
    setWoExpiredCancelled(
      getWOstatus(woData) === 'expired' || getWOstatus(woData) === 'cancelled'
    )
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    if (originalData || systems || multiple || labor) {
      setPartList([])
    }
  }, [])

  // Load Repair data
  async function initRepair (configs, repair, options) {
    if (!repair || isEmpty(repair)) {
      repair.work_order_id = woData?.id
      repair.type = 'service'
      repair.data = {}
      repair.user_id = externalUser ? externalUser.id : userData.id
      repair.external_id = woData.external_id
      repair.access = ['adftc']
      repair.status = 'active'
      repair.date_created = Math.round(Date.now() / 1000)
    }

    if (repairInitialized) return

    // Tasks: check if the WO contains tasks in its services
    let servicesToDisplay = []
    if (woServices && woServices.length > 0) {
      servicesToDisplay = woServices.filter(service => {
        return (
          service.tasks &&
          Array.isArray(service.tasks) &&
          service.tasks.length > 0
        )
      })
    }

    // Initialize components
    for (const serviceName in configs) {
      switch (serviceName) {
        case 'tasks':
          // If there are no services on the WO, do not display them
          if (!servicesToDisplay || servicesToDisplay.length < 1) break

          // If there are no services, initialize them
          if (!repair.data?.services || repair.data?.services?.length < 1) {
            repair.data.services = servicesToDisplay.map(service => ({
              id: service.id,
              name: service.name,
              tasks: null
            }))
          }

          // eslint-disable-next-line
          const services = servicesToDisplay.map(service => ({
            id: service.id,
            name: service.name,
            tasks: service.tasks.map(task => ({
              name: task.name,
              id: task.name,
              cost_code: task.cost_code,
              unique_option: configs[serviceName].services?.unique_option
                ? configs[serviceName].services?.unique_option?.includes(
                  task.name.toLowerCase()
                )
                : task.name.toLowerCase() === NO_RECORD_ITEM
            }))
          }))

          // If repair has Service's tasks selected, set those tasks as selected = true
          if (repair.data.services && repair.data.services.length > 0) {
            services.forEach(service => {
              service.tasks.forEach(task => {
                repair.data.services.forEach(repairService => {
                  let repairServiceId = repairService.id
                  if (parseInt(repairServiceId)) {
                    repairServiceId = parseInt(repairServiceId)
                  }
                  if (repairServiceId !== service.id || !repairService.tasks) {
                    return
                  }
                  const tempTasks = repairService.tasks.filter(item => {
                    if (item.name === task.name) return true
                    return false
                  })

                  if (tempTasks.length > 0) task.selected = true
                })
              })
            })
          }
          setServices(services)
          break
        case 'parts':
          // Load initial part list from saved report
          if (repair?.data?.parts) {
            repair.data.parts.forEach(part => {
              // Set selected option
              const options = cloneDeep(props.partOptions)
              const foundOption = options.find(
                option => option.id === part.location_option
              )
              if (foundOption) foundOption.selected = true

              partList.push(
                props.partInventory
                  ? new InventoryPart(
                    part.id,
                    part.name || '',
                    part.description || '',
                    part.serial_number || '',
                    part.quantity || 1,
                    options,
                    part.location_option
                  )
                  : new Part(
                    part.description || '',
                    part.quantity || 1,
                    options,
                    part.location_option
                  )
              )
            })
          }
          break
        case 'service_type':
          // eslint-disable-next-line
          const gated = configs[serviceName].gated ?? null
          setGated(gated)

          // Load initial service type from saved report
          if (repair?.data?.service_type) {
            setServiceType(repair.data.service_type || undefined)
          } else {
            // Initializes service type if there is only one option available
            // Uncomment when functionality is added
            // const options = Object.keys(props.serviceTypeOptions)
            // For the time being initialize with the first option
            if (configRequired) {
              repair.data.service_type = options[0]
              setServiceType(options[0])
              break
            } else {
              if (configs[serviceName].options.length === 1) {
                repair.data.service_type = configs[serviceName].options[0]
                setServiceType(configs[serviceName].options[0])
              }
            }

            if (options.length === 1) {
              repair.data.service_type = options[0]
              setServiceType(options[0])
            }
          }
          break
        case 'systems':
          setMultiple(configs.systems.multi ?? null)

          // Load initial selected systems from saved report
          if (repair?.data?.systems?.length) {
            setSystems(repair.data.systems)
          }
          break
        case 'labor':
          if (repair?.data?.labor) setLabor(repair?.data?.labor)
          break
        case 'photos_before':
          setBeforePhotos(
            getPhotosFromRepair(repair, repair.data?.photos_before)
          )
          break
        case 'photos_after':
          setAfterPhotos(getPhotosFromRepair(repair, repair.data?.photos_after))
          break
        case 'additional_photos':
          setAdditionalPhotos(
            getPhotosFromRepair(repair, repair.data?.additional_photos)
          )
          break
      }
    }
    setRepair(repair)
    setRepairInitialized(true)
  }

  const Gate = ({ children }) => {
    const Gated = () => {
      return (
        <div>
          {serviceType != null
            ? (
            <div>{children}</div>
              )
            : (
            <Button disabled pointerEvents="none">
              {children}
            </Button>
              )}
        </div>
      )
    }

    const NotGated = () => {
      return <div>{children}</div>
    }
    return useMemo(
      () => (
        <div>
          {gated === true &&
          Object.keys(props.serviceTypeOptions).length > 1
            ? (
            <Gated />
              )
            : (
            <NotGated />
              )}
        </div>
      ),
      [serviceTypeOptions, gated, children]
    )
  }

  // On update any value in the repair
  const _updateRepairValue = async (field, value) => {
    repair.data[field] = value
    setRepair({ ...repair })
    props.onUpdate({ ...repair })
  }

  // Add Tasks to the repair
  const onSaveTaskList = () => {
    const repairServices = []
    services.forEach(service => {
      let selectedItems = service.tasks.filter(task => {
        if (task.selected) return true
        return false
      })

      if (selectedItems) {
        selectedItems = selectedItems.map(task => {
          return { name: task.name, cost_code: task.cost_code }
        })
        const repairService = { ...service }
        repairService.tasks = selectedItems
        repairServices.push(repairService)
      }
    })
    repair.data.services = repairServices

    setRepair({ ...repair })
    props.onUpdate({ ...repair })
  }

  const updatePhotos = (serviceName, photos) => {
    let added_photos = null
    if (photos?.length) {
      added_photos = {}
      let index = 0
      photos.forEach(photo => {
        added_photos[`photo_${index}`] = photo.uri
        added_photos[`photo_${index}_title`] = photo.title
          ? photo.title.toString()
          : null
        added_photos[`photo_${index}_attr`] = photo.attributes
          ? photo.attributes
          : null
        index++
      })
    }

    switch (serviceName) {
      case 'photos_before':
        setBeforePhotos(photos)
        if (added_photos === null) delete repair.data.photos_before
        else repair.data.photos_before = added_photos
        break
      case 'photos_after':
        setAfterPhotos(photos)
        if (added_photos === null) delete repair.data.photos_after
        else repair.data.photos_after = added_photos
        break
      default:
        setAdditionalPhotos(photos)
        if (added_photos === null) delete repair.data.additional_photos
        else repair.data.additional_photos = added_photos
    }
    setRepair({ ...repair })
    props.onUpdate({ ...repair })
  }

  const renderQuestions = () => {
    const fields = []
    // Add placeholder for service_type
    fields.push(
      <Box className={classes.serviceType}>
        <Divider className={classes.divider} />
        <FormLabel className={classes.serviceTypeTitle}>
          {t('work_orders.field_service')}
        </FormLabel>
        <Divider className={classes.divider} />
      </Box>
    )
    if (woExpiredCancelled) {
      fields.push(
        <Grid className={classes.repairItem} key={'component-expired'}>
          <FormLabel
            component="legend"
            classes={{ root: classes.fieldMessage }}
          >
            {t(`work_orders.${getWOstatus(woData)}_message`)}
          </FormLabel>
        </Grid>
      )
    }
    for (const serviceName in servicesConfigs) {
      switch (true) {
        case serviceName.includes('photos_before'):
        case serviceName.includes('photos_after'):
        case serviceName.includes('additional_photos'):
          fields.push(
            <Grid
              className={classes.repairItem}
              key={`component-${serviceName}`}
            >
              <Gate key={`component-${serviceName}`}>
                <PhotoComponent
                  disabled={disabled}
                  photosType={serviceName}
                  mandatory={servicesConfigs[serviceName].mandatory}
                  photos={
                    serviceName.includes('photos_before')
                      ? beforePhotos
                      : serviceName.includes('photos_after')
                        ? afterPhotos
                        : additionalPhotos
                  }
                  handleOpenPhotos={handleOpenPhotos}
                  minRequired={servicesConfigs[serviceName]?.min || 0}
                  required={servicesConfigs[serviceName].min > 0}
                  maxPhotos={servicesConfigs[serviceName].max}
                  unique={servicesConfigs[serviceName].titles?.unique}
                  titleOptions={
                    servicesConfigs[serviceName].titles?.options
                      ? servicesConfigs[serviceName].titles.options
                      : null
                  }
                  headerText={servicesConfigs[serviceName].header_text}
                  onUpdate={photos => updatePhotos(serviceName, photos)}
                  notAvailable={woExpiredCancelled}
                />
              </Gate>
            </Grid>
          )
          break
        case serviceName.includes('notes'):
          fields.push(
            <Grid
              className={classes.repairItem}
              key={`component-${serviceName}`}
            >
              <Gate key={`component-${serviceName}`}>
                <NotesComponent
                  mandatory={servicesConfigs[serviceName].mandatory}
                  title={servicesConfigs[serviceName].header_text}
                  notes={repair ? repair.data[serviceName] : ''}
                  disabled={disabled}
                  onUpdate={value => _updateRepairValue(serviceName, value)}
                  notAvailable={woExpiredCancelled}
                />
              </Gate>
            </Grid>
          )
          break
        case serviceName.includes('signature'):
        case serviceName.includes('additional_signature'):
          fields.push(
            <Gate key={`component-${serviceName}`}>
              <SignatureComponent
                disabled={disabled}
                mandatory={
                  servicesConfigs[serviceName].mandatory ||
                  servicesConfigs[serviceName].print_name_mandatory
                }
                handleOpenPhotos={handleOpenPhotos}
                onUpdate={value => _updateRepairValue(serviceName, value)}
                headerText={
                  servicesConfigs[serviceName].header_text ||
                  t('work_orders.trips.signature')
                }
                data={repair ? repair.data[serviceName] : {}}
                notAvailable={woExpiredCancelled}
              />
            </Gate>
          )
          break
        case serviceName.includes('parts'):
          fields.push(
            <Gate key={`component-${serviceName}`}>
              {/* Comment for future use */}
              {/* <PartsComponent
                disabled={gated && serviceType === null}
                headerText={servicesConfigs[serviceName].header_text}
                options={props.partOptions}
                inventory={props.partInventory}
                parts={partList}
                savePartsCallback={setPartList}
                fetchParts={props.fetchParts}
              /> */}
            </Gate>
          )
          break
        case serviceName.includes('service_type'):
          // Remove the placeholder
          fields.shift()
          fields.unshift(
            <Box className={classes.serviceType}>
              <Divider className={classes.divider} />
              <FormLabel className={classes.serviceTypeTitle}>
                {props.serviceTypeOptions[serviceType]}
              </FormLabel>
              <Divider className={classes.divider} />
            </Box>
          )
          break
        case serviceName.includes('systems'):
          fields.push(
            <Gate key={`component-${serviceName}`}>
              {/* Comment for future use */}
              {/* <SystemsComponent
                disabled={gated && serviceType === null}
                headerText={servicesConfigs[serviceName].header_text}
                multiple={multiple}
                systems={systems}
                setSystems={setSystems}
                selectedWo={props.selectedWo}
              /> */}
            </Gate>
          )
          break
        case serviceName.includes('tasks'):
          if (
            services &&
            services.length > 0 &&
            repair.data &&
            repair.data.services
          ) {
            services.map(service => {
              if (!service.tasks || service.tasks.length < 1) {
                return (
                  <Grid
                    className={classes.repairItem}
                    key={`component-${serviceName}`}
                  >
                    <FormLabel
                      component="legend"
                      classes={{ root: classes.fieldMessage }}
                    >
                      {t('work_orders.checkout_message')}
                    </FormLabel>
                  </Grid>
                )
              }
              fields.push(
                <Gate key={`component-${serviceName}`}>
                  <TaskList
                    mandatory={servicesConfigs[serviceName].mandatory}
                    serviceName={serviceName}
                    services={services}
                    disabled={disabled}
                    updateCallback={onSaveTaskList}
                    notAvailable={woExpiredCancelled}
                  />
                </Gate>
              )
              return null
            })
          }
          break
        case serviceName.includes('labor'):
          fields.push(
            <Gate key={`component-${serviceName}`}>
              {/* Comment for future use */}
              {/* <LaborComponent
                enabled={!(gated && serviceType === null)}
                initializedLabor={labor}
                onChange={setLabor}
                configs={servicesConfigs[serviceName]}
                laborOptions={props?.laborOptions}
              /> */}
            </Gate>
          )
          break
        case serviceName.includes('picker'): {
          const options = {}
          if (pickerServiceCatalogs.picker_options) {
            servicesConfigs[serviceName].options.forEach(
              item =>
                (options[item] = pickerServiceCatalogs.picker_options[item])
            )
          } else {
            servicesConfigs[serviceName].options.forEach(
              item => (options[item] = item)
            )
          }

          fields.push(
            <Gate key={`component-${serviceName}`}>
              <SimplePicker
                disabled={disabled}
                mandatory={servicesConfigs[serviceName].mandatory}
                title={servicesConfigs[serviceName].header_text}
                options={options}
                handleChange={value => {
                  _updateRepairValue(serviceName, value)
                }}
                value={repair ? repair.data[serviceName] : ''}
                notAvailable={woExpiredCancelled}
              />
            </Gate>
          )
          break
        }
        case serviceName.includes('numeric'):
          fields.push(
            <Grid
              className={classes.repairItem}
              key={`component-${serviceName}`}
            >
              <Gate key={`component-${serviceName}`}>
                <NotesComponent
                  mandatory={servicesConfigs[serviceName].mandatory}
                  title={servicesConfigs[serviceName].header_text}
                  type="number"
                  notes={repair ? repair.data[serviceName] : ''}
                  disabled={disabled}
                  onUpdate={value => _updateRepairValue(serviceName, value)}
                  decimals={servicesConfigs[serviceName].decimals}
                  catalogs={numericSuffixCatalog}
                  suffix={servicesConfigs[serviceName]?.suffix || ''}
                  notAvailable={woExpiredCancelled}
                />
              </Gate>
            </Grid>
          )
          break
        default:
          break
      }
    }
    return fields
  }

  const handleOpenPhotos = (ind, photos) => {
    setPhotos(photos)
    setPhotoIndex(ind)
  }

  return <div>{renderQuestions()}</div>
}
