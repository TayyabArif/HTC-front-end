/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import workingIcon from '../../assets/icons/working.svg'

import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Box,
  FormLabel,
  Grid,
  Grow,
  ThemeProvider,
  Button,
  Divider
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material'
import { RepairData } from './RepairData'
import { useSelector } from 'react-redux'
import { EtaSelect } from './EtaSelect'
// eslint-disable-next-line
import { createLog } from '../../services/ApiService'
// eslint-disable-next-line
import { getWoByIdWithAuth, uploadRepair } from '../../lib/Api'
import {
  buttonSettingsDisabled,
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'
import { cloneDeep } from 'lodash'
import { woFixedStatus } from '../../lib/Constants'
import { getWOstatus } from '../../lib/Global'
import {
  activitiesCardStyle,
  repairDataStyles
} from '../../styles/classes/WorkOrdersClasses'

export const ActivitiesCard = props => {
  const {
    data,
    setPhotos,
    setPhotoIndex,
    updateWoData,
    setReady,
    type,
    getWindowHeight,
    externalUser,
    setMessage,
    etaTime
  } = props
  const wHeight = getWindowHeight ? getWindowHeight() : null
  const classes = activitiesCardStyle()
  const repairClasses = repairDataStyles()
  const [expanded, setExpanded] = useState(false)
  const [pendingTasks, setPendingTasks] = useState(false)
  const [newRepair, setNewRepair] = useState({})
  const { t } = useTranslation()
  const configurations = useSelector(
    state => state.auth?.user?.userInfo?.configurations
  )
  const userData = useSelector(state => state.auth?.user?.userInfo)
  const serviceTypeOptions =
    useSelector(state => state.auth?.user?.userInfo?.service_types) ?? []
  const [configs, setConfigs] = useState(null)
  const [configRequired, setConfigRequired] = useState(false)

  useEffect(() => {
    const category = data?.category?.toLowerCase()
    let eq_services = null
    if (type === 'iframe') {
      eq_services = externalUser.configurations.wo_action?.eq_services
    } else eq_services = configurations.wo_action?.eq_services
    let configs = eq_services.default
    if (
      eq_services[category] &&
      Object.keys(eq_services[category]).length > 0
    ) {
      configs = eq_services[category]
    }
    const { service_type, multiple_service } = configs
    if (service_type) {
      const { config_required, options } = service_type
      if (config_required) {
        // Set the new object structure
        setConfigRequired(true)
        const objectOptions = {}
        if (options.length) {
          for (const key of options) {
            objectOptions[key] = eq_services[key]
          }
          configs = {
            service_type,
            multiple_service,
            object_options: objectOptions
          }
        }
      }
    }

    // Set repairs for the pre render functionality
    if (
      (!data.service || data.service.length === 0) &&
      multiple_service?.pre_render
    ) {
      const arrayOfRepairs = []
      for (const service of service_type.options) {
        const repair = {
          work_order_id: data?.id,
          type: 'service',
          data: {
            service_type: service
          },
          user_id: (type === 'iframe' ? externalUser : userData).id,
          external_id: data.external_id,
          access: ['adftc'],
          status: 'active',
          date_created: Math.round(Date.now() / 1000)
        }
        arrayOfRepairs.push(repair)
      }
      data.service = arrayOfRepairs
    }

    setConfigs(configs)
  }, [])

  useEffect(() => {
    if (props.index === 0) {
      setExpanded(true)
    }
  }, [props])

  useEffect(() => {
    if (!configs) return
    _setPendingTasks()
  }, [data, newRepair, configs])

  const handleExpandClick = ind => {
    setExpanded(!expanded)
  }

  const noCheckInComp = () => (
    <Box marginBottom={'20px'}>
      <FormLabel component="legend" classes={{ root: classes.field }}>
        {t('work_orders.trips.checkin')}
      </FormLabel>
      <FormLabel
        component="legend"
        classes={{ root: classes.fieldDisabledData }}
      >
        {t('work_orders.trips.no_checkin')}
      </FormLabel>
      <FormLabel component="legend" classes={{ root: classes.field }}>
        {t('work_orders.trips.checkout')}
      </FormLabel>
      <FormLabel
        component="legend"
        classes={{ root: classes.fieldDisabledData }}
      >
        {t('general.labels.not_available')}
      </FormLabel>
    </Box>
  )

  const _setPendingTasks = () => {
    let pendingServices = 0
    if (!data?.service || data.service.length === 0) {
      pendingServices += _checkPendingServices(configs, newRepair)
    } else {
      for (let i = 0; i < data?.service.length; i++) {
        pendingServices += _checkPendingServices(configs, data?.service[i])
      }
    }
    setPendingTasks(pendingServices)
    return pendingServices
  }

  const validWoTasks = workOrder => {
    // If WO doesn't have any tasks return false
    let tasks = []
    if (workOrder.services && workOrder.services.length > 0) {
      tasks = workOrder.services.filter(service => {
        return (
          service.tasks &&
          Array.isArray(service.tasks) &&
          service.tasks.length > 0
        )
      })
    }

    return !(!tasks || tasks.length < 1)
  }

  const checkPhotoRequirements = (configs, repairData) => {
    let hasAll = true
    const newFormat =
      configs.titles?.options && typeof configs.titles?.options[0] === 'object'
    if (newFormat && configs.titles?.unique) {
      const mandatoryTitles = configs.titles.options
        .filter(title => title.mandatory)
        .map(title => title.title)
      let availableTitles = 0
      for (let i = 0; i < configs.max; i++) {
        if (
          !!repairData[`photo_${i}_title`] &&
          mandatoryTitles.includes(repairData[`photo_${i}_title`])
        ) {
          availableTitles++
        }
      }
      if (availableTitles < configs.min) hasAll = false
    } else {
      for (let i = 0; i < configs.min; i++) {
        if (!repairData[`photo_${i}`]) hasAll = false
      }
    }

    return hasAll
  }

  const _checkPendingServices = (servicesConfig, repair) => {
    let count = 0
    let serviceForCheck = cloneDeep(servicesConfig)
    const { service_type, object_options } = servicesConfig
    if (service_type?.config_required && object_options) {
      const { data } = repair
      const serviceType = data?.service_type
        ? object_options[data.service_type]
        : null
      if (serviceType) serviceForCheck = cloneDeep(serviceType)
    }
    for (const service in serviceForCheck) {
      switch (true) {
        case service.includes('photos_before'):
        case service.includes('photos_after'):
        case service.includes('additional_photos'): {
          if (serviceForCheck[service].min < 1) break

          if (
            !repair.data ||
            !repair.data[service] ||
            Object.keys(repair.data[service]).length < 1
          ) {
            count++
            continue
          }

          const hasAll = checkPhotoRequirements(
            serviceForCheck[service],
            repair.data[service]
          )
          if (hasAll === false) count++
          break
        }
        case service.includes('signature'):
          if (!serviceForCheck[service]?.mandatory) continue
          if (!repair?.data?.[service]?.image) count++
          if (
            serviceForCheck?.[service].print_name_mandatory &&
            !repair?.data?.[service]?.name
          ) {
            count++
          }
          break
        case service.includes('tasks'):
        case service.includes('cost_code_materials'): {
          // If WO doesn't have any tasks don't do anything
          if (!validWoTasks(data)) continue
          if (!data.services || data.services.length < 1) {
            continue
          }
          if (!serviceForCheck[service].mandatory) continue
          let tasksPending = false
          if (!repair.data || !repair.data?.services || repair.data.services.length < 1) {
            tasksPending = true
          } else {
            repair.data.services.forEach(repairService => {
              switch (service) {
                case 'tasks':
                  if (!repairService.tasks || repairService.tasks.length < 1) {
                    tasksPending = true
                  }
                  break
                case 'cost_code_materials':
                  repairService.tasks.forEach(task => {
                    if (task.daily.length < 1) tasksPending = true
                  })
                  break
              }
            })
          }

          if (tasksPending) count++
          break
        }
        case service.includes('parts'): {
          const partsOptions =
            (type === 'iframe' ? externalUser : userData)?.parts_options || {}
          const validateParts =
            (serviceForCheck[service]?.options?.length > 0 &&
              Object.keys(partsOptions)?.length > 0) ||
            false
          const inventoryParts = serviceForCheck[service]?.inventory || false
          let incompletePartDescription = false
          let incompletePartOption = false

          if (repair.data.parts?.length) {
            repair.data.parts.forEach(part => {
              if (!incompletePartDescription && !part.description) {
                incompletePartDescription = true
              }
              if (!incompletePartOption && !part.location_option) {
                incompletePartOption = true
              }
            })
          }

          if (incompletePartDescription && !inventoryParts) count++
          if (incompletePartOption && validateParts) count++
          break
        }
        case service.includes('service_type'):
          if (!repair.data || !repair.data?.service_type) {
            count++
          }
          break
        case service.includes('labor'): {
          for (const laborConfig in serviceForCheck[service]) {
            if (serviceForCheck[service][laborConfig].mandatory) {
              if (!repair.data || !repair.data.labor || !repair.data.labor[laborConfig]) {
                count++
              }
            }
          }
          break
        }
        case service.includes('picker'):
        case service.includes('numeric'):
        case service.includes('notes'):
          if (serviceForCheck[service]?.mandatory && (!repair.data || !repair?.data[service])) {
            count++
          }
          break
      }
    }
    return count
  }

  const handleSubmit = async () => {
    setReady(false)
    const checkOutLogData = {}
    if (!data.logs || data?.status === 'open') {
      setMessage(t('work_orders.upload_messages.clock_in'))
      // Check into the WO
      const response = await createLog(
        'checkIn',
        data?.id,
        type === 'iframe' ? externalUser : userData,
        null,
        type === 'iframe'
      )
      data.logs.push(response)
      checkOutLogData.id = response.checkout_log_id
      checkOutLogData.timeZone = response.timeZone
      checkOutLogData.date_created = response.date_created
      data.status = 'in_progress'
    }

    if (!data?.service || data.service.length === 0) {
      data.service = [newRepair]
      setNewRepair({})
    }

    for (let i = 0; i < data?.service.length || 0; i++) {
      setMessage(
        data.service[i].data.service_type &&
          serviceTypeOptions[data.service[i].data.service_type]
          ? t('work_orders.upload_messages.repair').replace(
            '{v1}',
            // Make sure the Form word is not repeated
            serviceTypeOptions[data.service[i].data.service_type].replace(
              ' Form',
              ''
            )
          )
          : t('work_orders.field_service')
      )
      const response = await uploadRepair(data.service[i], type === 'iframe')
      data.service[i] = response
    }

    // Check out the WO
    const existingLog = data?.logs?.filter(
      log => log.type === 'checkOut' && log.status === 'incomplete'
    )

    setMessage(t('work_orders.upload_messages.clock_out'))
    if (existingLog.length > 0) {
      const newLog = await createLog(
        'checkOut',
        data?.id,
        type === 'iframe' ? externalUser : userData,
        existingLog[0],
        type === 'iframe'
      )
      data.logs = data?.logs?.map(log => {
        if (log.id === newLog.id) return newLog
        return log
      })
    } else {
      const response = await createLog(
        'checkOut',
        data?.id,
        type === 'iframe' ? externalUser : userData,
        checkOutLogData,
        type === 'iframe'
      )
      data.logs.push(response)
    }
    data.status = 'completed'
    // Download WO with invoice
    const updatedWo = await getWoByIdWithAuth(type === 'iframe', data.id)
    updateWoData(updatedWo)
    setReady(true)
    setMessage(null)
  }

  return (
    <Card
      className={classes.root}
      style={type ? { overflowY: 'auto', height: wHeight } : null}
    >
      <CardActions
        disableSpacing
        onClick={type !== 'iframe' ? handleExpandClick : null}
        className={classes.actions}
      >
        <Grid container className={classes.cardActionsContainer} alignItems="center">
          <Grid item md={12} className={classes.tripGrid}>
            <FormLabel
              component="legend"
              className={classes.trip}
            >{`Service Appt. ${data?.trip}`}</FormLabel>
            <FormLabel
              classes={{ root: classes.chipRoot, label: classes.chipLabel }}
            >
              {t(`work_orders.wo_states.${data?.status}`)}
            </FormLabel>
            {type !== 'iframe'
              ? (
              <>
                {expanded
                  ? (
                  <Grow in={expanded}>
                    <IconButton aria-expanded={expanded} aria-label="show more">
                      <ExpandLessIcon />
                    </IconButton>
                  </Grow>
                    )
                  : (
                  <Grow in={!expanded}>
                    <IconButton
                      aria-expanded={!expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Grow>
                    )}
              </>
                )
              : (
              <IconButton disabled />
                )}
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {
          <CardContent style={{ paddingBottom: '3px' }}>
            {data.status !== 'open' && (
            <EtaSelect
              data={data?.est_service_start ? data?.est_service_start : etaTime}
              disabled={getWOstatus(data) !== 'open'}
              woId={data.id}
              type={type}
              onUpdate={eta =>
                updateWoData({ ...data, est_service_start: eta })
              }
              maxDate={data?.scheduled_date}
            />)}

            <div>
              {/* Check In */}
              {data?.logs?.length > 0 &&
                data.logs.map((log, index) => {
                  if (log.type === 'checkIn') {
                    return (
                      <div key={index}>
                        <FormLabel
                          component="legend"
                          classes={{ root: classes.field }}
                        >
                          {t('work_orders.trips.checkin')}
                        </FormLabel>
                        <FormLabel
                          component="legend"
                          classes={{ root: classes.fieldData }}
                        >
                          {moment(new Date(log.date_created * 1000)).format(
                            'MM/DD/yyyy hh:mm A'
                          )}
                        </FormLabel>
                      </div>
                    )
                  }
                  return null
                })}
              {/* Check Out */}
              {data?.logs?.length > 0 &&
                data.logs.map((log, index) => {
                  if (log.type === 'checkOut') {
                    return (
                      <div key={index}>
                        <FormLabel
                          component="legend"
                          classes={{ root: classes.field }}
                        >
                          {t('work_orders.trips.checkout')}
                        </FormLabel>
                        <FormLabel
                          component="legend"
                          classes={{
                            root:
                              log.status !== 'incomplete'
                                ? classes.fieldData
                                : classes.fieldMessage
                          }}
                        >
                          {log.status !== 'incomplete'
                            ? moment(new Date(log.date_created * 1000)).format(
                              'MM/DD/yyyy hh:mm A'
                            )
                            : t('work_orders.checkout_message')}
                        </FormLabel>
                      </div>
                    )
                  }
                  return null
                })}
            </div>
            {data.status === 'completed' &&
              data?.service &&
              data.service.map(service => (
                <RepairData
                  disabled={
                    woFixedStatus.includes(data.status) ||
                    getWOstatus(data) === 'expired'
                  }
                  configRequired={configRequired}
                  key={service.id}
                  woData={data}
                  repairData={service ?? {}}
                  configs={configs}
                  woServices={data.services ?? []}
                  setPhotos={setPhotos}
                  setPhotoIndex={setPhotoIndex}
                  serviceTypeOptions={
                    type === 'iframe'
                      ? externalUser.service_types
                      : serviceTypeOptions
                  }
                  onUpdate={repair => {
                    service = repair
                    _setPendingTasks()
                  }}
                  externalUser={externalUser}
                />
              ))}
            {data?.logs?.length === 0 && noCheckInComp()}
            {data.status === 'completed' &&
              (!data?.service || data?.service.length === 0) && (
                <RepairData
                  disabled={
                    woFixedStatus.includes(data.status) ||
                    getWOstatus(data) === 'expired'
                  }
                  configRequired={configRequired}
                  key={0}
                  woData={data}
                  repairData={newRepair}
                  configs={configs}
                  woServices={data.services ?? []}
                  setPhotos={setPhotos}
                  setPhotoIndex={setPhotoIndex}
                  serviceTypeOptions={
                    type === 'iframe'
                      ? externalUser.service_types
                      : serviceTypeOptions
                  }
                  onUpdate={setNewRepair}
                  externalUser={externalUser}
                />
            )}
            {data.status === 'completed' &&
              !(
                woFixedStatus.includes(data.status) ||
                getWOstatus(data) === 'expired'
              ) && (
                <Grid item xs={12} className={classes.errorContainer}>
                  {pendingTasks > 0 && (
                    <Grid item xs={12} className={classes.errorBox}>
                      <FormLabel className={classes.error}>
                        {t('work_orders.trips.fields_required')}
                      </FormLabel>
                    </Grid>
                  )}
                  <ThemeProvider theme={buttonSettingsDisabled}>
                    <Button
                      size="medium"
                      disabled={pendingTasks > 0}
                      style={
                        pendingTasks > 0
                          ? disableButtonStyle
                          : enableButtonStyle
                      }
                      onClick={handleSubmit}
                    >
                      {t('general.labels.submit')}
                    </Button>
                  </ThemeProvider>
                </Grid>
            )}
            {data.status !== 'completed' && (
              <div>
                <Box className={repairClasses.serviceType}>
                  <Divider className={repairClasses.divider} />
                  <FormLabel className={repairClasses.serviceTypeTitle}>
                    {t('work_orders.field_service')}
                  </FormLabel>
                  <Divider className={repairClasses.divider} />
                </Box>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                  className={classes.container}
                >
                  <Grid item xs={12} textAlign="center" alignSelf="center">
                    <img src={workingIcon} alt="Connectad Platform" />
                  </Grid>
                  <Grid item xs={12} textAlign="center" alignSelf="center">
                    <div className={repairClasses.disabledText}>
                      {t('work_orders.field_service_before_clockout_message')}
                    </div>
                  </Grid>
                </Grid>
              </div>
            )}
          </CardContent>
        }
      </Collapse>
    </Card>
  )
}
