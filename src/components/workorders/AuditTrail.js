import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

// mui components
import { makeStyles } from '@mui/styles'
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

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0px',
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
    fontWeight: '400'
  },
  trailContainer: { display: 'flex', flexDirection: 'row' },
  date: {
    fontSize: '10px',
    color: theme.colors.columnTitle,
    width: '65px',
    paddingTop: '6px',
    height: '45px'
  },
  type: {
    fontSize: '14px',
    color: theme.colors.basicDisabledButtonColor
  },
  author: {
    fontSize: '10px',
    color: theme.colors.grey
  },
  stepper: {
    position: 'relative',
    '& .MuiStepConnector-line': {
      position: 'absolute',
      left: '72px',
      top: '22px',
      height: '37px',
      borderColor: theme.colors.disabledField
    },
    '& .MuiStepLabel-iconContainer': {
      alignSelf: 'flex-start',
      paddingTop: '6px'
    },
    '& ..MuiStepLabel-root': {
      alignSelf: 'flex-start'
    }
  },
  roundItem: {
    width: '16px',
    height: '16px',
    borderRadius: '15px'
  },
  created: { backgroundColor: theme.colors.text },
  checkIn: { backgroundColor: theme.colors.workOrderColors.in_progress },
  checkOut: { backgroundColor: theme.colors.workOrderColors.completed },
  invoiceCreated: { backgroundColor: theme.colors.invoiceColors.invoice_created },
  submit: { backgroundColor: theme.colors.invoiceColors.dark_grey },
  decline: { backgroundColor: theme.colors.invoiceColors.red_error },
  approve: { backgroundColor: theme.colors.invoiceColors.invoice_approved },
  smallAdornment: {
    borderTop: `1px solid ${theme.colors.disabledField}`,
    marginLeft: '69px',
    width: '8px'
  },
  bigAdornment: {
    borderTop: `1px solid ${theme.colors.disabledField}`,
    marginLeft: '67px',
    marginBottom: '3px',
    marginTop: '-23px',
    width: '12px'
  },
  adornmentEnd: {
    '& .MuiStepConnector-line': {
      height: '9px',
      minHeight: 0
    }
  },
  stepperContainer: {
    paddingLeft: '5px',
    paddingTop: 0
  }
}))

export const AuditTrail = props => {
  const { workOrders } = props
  const classes = useStyles()
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
          list.push({ type: log.type, time: log.date_created })
        }
      })
      // invoice audit trail
      wo.invoice?.history?.forEach(log => {
        list.push({ type: log.action === 'create' ? 'invoiceCreated' : log.action, time: log.timestamp })
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
