import React from 'react'
// import { useTranslation } from 'react-i18next'
import moment from 'moment'

// mui components
import { makeStyles } from '@mui/styles'
import { FormLabel, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    padding: '9px',
    boxShadow: '6px 9px 43px ' + theme.colors.workOrders.detailsCardBorderColor
  },
  field: {
    marginLeft: '5px',
    marginBottom: '5px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '900'
  },
  fieldData: {
    marginLeft: '5px',
    marginBottom: '30px',
    color: theme.colors.text,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    letterSpacing: '1px'
  }
}))

export const WoDetails = props => {
  const { workOrder } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Card className={classes.root}>
      <CardContent style={{ paddingBottom: '3px' }}>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.location')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.store_name}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.address')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.address}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.nte')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.nte
            ? `$${workOrder?.nte}`
            : t('general.labels.not_available')}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.priority')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.priority}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.start_date')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {moment(new Date(workOrder?.open_date * 1000)).format(
            'MM/DD/yyyy hh:mm A'
          )}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.end_date')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.expiration_date === 0
            ? ''
            : moment(new Date(workOrder?.expiration_date * 1000)).format(
              'MM/DD/yyyy hh:mm A'
            )}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.trade')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder?.category}
        </FormLabel>
        <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.services')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}>
          {workOrder.services?.map(item => item.name).join(', ')}
        </FormLabel>

        {workOrder?.contact_person &&
          (workOrder.contact_person[0] || workOrder.contact_person[1]) && (
            <>
              <FormLabel component="legend" className={classes.field}>
                {t('work_orders.wo_details.location_contacts')}
              </FormLabel>
              <FormLabel component="legend" className={classes.fieldData}>
                {workOrder?.contact_person && workOrder?.contact_person[0]}
                {workOrder?.contact_person && workOrder?.contact_person[1]}
              </FormLabel>
            </>
        )}
        {workOrder?.notes && (
          <>
            <FormLabel component="legend" className={classes.field}>
              {t('work_orders.wo_details.notes')}
            </FormLabel>
            <FormLabel component="legend" className={classes.fieldData}>
              {workOrder?.notes}
            </FormLabel>
          </>
        )}
        {/* Comment until defined */}
        {/* <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.attachments')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}></FormLabel> */}
      </CardContent>
    </Card>
  )
}
