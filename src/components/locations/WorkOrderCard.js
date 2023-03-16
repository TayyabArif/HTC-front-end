import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Paper, Typography, useTheme } from '@mui/material'

/** Redux **/
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from '../../store/locations'

// Styles
import { woCardStyles } from '../../styles/classes/LocationsClasses'

import { getWOstatus } from '../../lib/Global'

const moment = require('moment')

export const WorkOrderCard = (props) => {
  const { info } = props
  const theme = useTheme()
  const dispatch = useDispatch()
  const locationsStore = useSelector((state) => state.locations)
  const userStore = useSelector((state) => state.auth.user)
  const { t } = useTranslation()

  const styleProps = {
    activeWorkCircleColor: theme.colors.locations.noActivity
  }

  if (props.info?.work_orders_summary?.active > 0) {
    styleProps.activeWorkCircleColor = theme.palette.primary.light
  }

  const classes = woCardStyles(styleProps)

  const handleClickWo = () => {
    dispatch(locationsActions.setSelectedWorkOrder({
      ...info,
      store_name: locationsStore?.selectedSite?.name,
      address: locationsStore?.selectedSite?.address
    }))
  }

  const getServicesLabel = () => {
    let label = ''
    info?.services.forEach((element, index) => {
      if ((index + 1) === info?.services.length) {
        label += element.name
      } else {
        label += `${element.name}, `
      }
    })
    return label
  }

  const getTradeColor = (trade) => {
    const tradesConfigs = userStore?.userInfo?.configurations?.trade_configs
    if (trade && tradesConfigs) {
      const tradeConfig = tradesConfigs[trade.toLowerCase()]
      if (tradeConfig) {
        return tradeConfig.color
      } else {
        return tradesConfigs.default?.color ?? theme.colors.divBack
      }
    } else {
      return theme.colors.divBack
    }
  }

  const renderLocation = useMemo(() => {
    return (
      <Box className={'sitesCard'} pb={0.5} style={props.style} >
        <Paper className={classes.locationTile} elevation={1}
          onClick={handleClickWo}
        >
          <Box className={classes.serviceNameDiv} style={{ backgroundColor: getTradeColor(info?.category) }}>
            <Typography className={classes.serviceName} >
              {info?.category ? (info?.category.length < 17 ? info?.category : info?.category.slice(0, 14) + '...') : ''}
            </Typography>
          </Box>
          <Box display="flex" width="100%">
            <Box flex={5}>
              <Typography className={classes.woNumber} display="inline" align='left'>
                {(info?.customer_po && info?.customer_po !== '') ? 'WO#' + info?.customer_po : <br></br>}
              </Typography>
              <Typography marginBottom={0.3} className={classes.clientTracking} align='left'>
                {(info?.client_tracking_number && info?.client_tracking_number !== '')
                  ? t('locations.work_orders.tracking') + '#' + info?.client_tracking_number
                  : <br></br>}
              </Typography>
              <Typography marginBottom={0.3} className={classes.woType} align='left'>
                {(info?.call_type && info?.call_type !== '') ? info?.call_type : <br></br>}
              </Typography>
              <Typography marginBottom={0.3} className={classes.startLabel} align='left'>
                {(info?.open_date && info?.open_date !== '')
                  ? t('locations.work_orders.start') + (info?.open_date)
                    ? moment.unix(info.open_date).format('DD/MM/YY hh:mm a')
                    : ''
                  : <br></br>}
              </Typography>
              <Typography marginBottom={0.3} className={classes.woType} align='left'>
                {getServicesLabel() !== '' ? t('locations.work_orders.service_details') + ':' + getServicesLabel() : ''}
              </Typography>
            </Box>
            <Box flex={3} pr={1}>
              <Typography marginBottom={0.3} className={classes.woStatus} align='left' color={`${theme.colors.workOrderColors[getWOstatus(info)]}`}>
                {t(`work_orders.wo_states.${getWOstatus(info)}`)}
              </Typography>
              {(info?.priority && info?.priority !== '') && <Typography marginBottom={0.3} className={classes.priority} align='left'>
                {info?.priority}
              </Typography>}
              {(info?.expiration_date && info?.expiration_date !== '') && <Typography marginBottom={0.3} className={classes.endLabel} align='left'>
                {t('locations.work_orders.end')} {info?.expiration_date ? moment.unix(info.expiration_date).format('DD/MM/YY hh:mm a') : ''}
              </Typography>}
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }, [info, locationsStore.activeTab])

  return renderLocation
}
