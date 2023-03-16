import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

// mui components
import {
  Card,
  CardContent,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'
import { auditTrailStyles } from '../../styles/classes/WorkOrdersClasses'

export const AuditTrail = props => {
  const { workOrders } = props
  const classes = auditTrailStyles()
  const [eventList, setEventList] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    const list = []
    workOrders.forEach(wo => {
      list.push({
        type: 'created',
        time: wo.date_created,
        trip: wo.trip
      })
      wo.logs?.forEach(log => {
        if (log.status === 'complete') {
          list.push({ type: log.type, time: log.type === 'checkOut' ? log.date_created + 1 : log.date_created })
        }
      })
    })
    setEventList(list.sort((a, b) => b.time - a.time))
  }, [workOrders])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Stepper
            orientation="vertical"
            connector={() => null}
            className={classes.stepperContainer}
          >
            {eventList.map((event, idx) => (
              <Step key={idx} className={classes.stepper}>
                <div className={classes.trailContainer} key={idx}>
                  <Typography className={classes.date}>
                    {moment(new Date(event.time * 1000)).format('MM/DD/yy')}
                  </Typography>
                  <StepLabel
                    StepIconComponent={() => (
                      <div
                        className={`${classes.roundItem} ${
                          classes[event.type]
                        }`}
                      />
                    )}
                  >
                    <div>
                      <Typography className={classes.type}>
                        {t(`work_orders.audit_trail.${event.type}`).replace(
                          '{v1}',
                          event.trip
                        )}
                      </Typography>
                      <Typography className={classes.author}>
                        {moment(new Date(event.time * 1000)).format('hh:mm a')}
                      </Typography>
                    </div>
                  </StepLabel>
                </div>
                {idx !== eventList.length - 1
                  ? (
                    <StepConnector />
                  )
                  : (
                    <StepConnector className={classes.adornmentEnd} />
                  )}
              </Step>
            ))}
            <div className={classes.bigAdornment} />
            <div className={classes.smallAdornment} />
          </Stepper>
        </Grid>
      </CardContent>
    </Card>
  )
}
