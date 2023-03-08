import React from 'react'
// import { useTranslation } from 'react-i18next'
import moment from 'moment'

// mui components
import { FormLabel, Card, CardContent, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { woDetailsStyles } from '../../styles/classes/WorkOrdersClasses'

export const WoDetails = props => {
  const { workOrder } = props
  const classes = woDetailsStyles()
  const { t } = useTranslation()

  return (
    <Grid container>
      <Grid item xs={12} p={0}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
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
                <Grid container>
                  <Grid item xs={12}>
                    <FormLabel component="legend" className={classes.field}>
                      {t('work_orders.wo_details.location_contacts')}
                    </FormLabel>
                    <FormLabel component="legend" className={classes.fieldData}>
                      {workOrder?.contact_person && workOrder?.contact_person[0]}
                      {workOrder?.contact_person && workOrder?.contact_person[1]}
                    </FormLabel>
                  </Grid>
                </Grid>
            )}
            {workOrder?.notes && (
              <Grid container>
                <Grid item xs={12}>
                  <FormLabel component="legend" className={classes.field}>
                    {t('work_orders.wo_details.notes')}
                  </FormLabel>
                  <FormLabel component="legend" className={classes.fieldData}>
                    {workOrder?.notes}
                  </FormLabel>
                </Grid>
              </Grid>
            )}
            {/* Comment until defined */}
            {/* <FormLabel component="legend" className={classes.field}>
          {t('work_orders.wo_details.attachments')}
        </FormLabel>
        <FormLabel component="legend" className={classes.fieldData}></FormLabel> */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
