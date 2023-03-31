import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Paper,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { dashboardStyles } from '../../styles/classes/DashboardClasses'
import { AddReport } from './AddReport'
import ButtonSelect from '../form/ButtonSelect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

export const ReportCard = props => {
  const classes = dashboardStyles()
  const { t } = useTranslation()
  // flag to check if report finished loading
  const [ready, setReady] = useState(false)
  // add report dialog control
  const [open, setOpen] = useState(false)
  // date selected
  const [reportDate, setReportDate] = useState('today')
  // date range
  const [dateRange, setDateRange] = useState({
    from: moment().format('MM/DD/YY'),
    to: moment().format('MM/DD/YY')
  })

  const dateOptions = [
    {
      id: 'today',
      name: t('dashboard.date_ranges.today')
    },
    {
      id: 'last_3_days',
      name: t('dashboard.date_ranges.last_3_days')
    },
    {
      id: 'last_5_days',
      name: t('dashboard.date_ranges.last_5_days')
    },
    {
      id: 'last_7_days',
      name: t('dashboard.date_ranges.last_7_days')
    },
    {
      id: 'last_30_days',
      name: t('dashboard.date_ranges.last_30_days')
    },
    {
      id: 'custom',
      name: t('dashboard.date_ranges.custom')
    }
  ]

  useEffect(() => {
    setReportDate('today')
    // TODO load report based on props.report
    // remove timeout after logic has been implemented
    setTimeout(() => {
      setReady(true)
    }, 4000)
  }, [])

  useEffect(() => {
    console.log('>>>> report date: ', reportDate)
    let from = moment()
    const to = moment()
    switch (reportDate) {
    case 'last_3_days':
      from = from.subtract(3, 'days')
      break
    case 'last_5_days':
      from = from.subtract(5, 'days')
      break
    case 'last_7_days':
      from = from.subtract(7, 'days')
      break
    case 'last_30_days':
      from = from.subtract(30, 'days')
      break
    case 'custom':
      // TODO date selection
      break
    default:
      break
    }
    setDateRange({
      from: from.format('MM/DD/YY'),
      to: to.format('MM/DD/YY')
    })
  }, [reportDate])

  function getReport () {
    return (
      <Box height="100%">
        {reportHeader()}
        {ready
          ? (
            <Box>{props.report}</Box>
          )
          : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="inherit"
            >
              <CircularProgress />
            </Box>
          )}
      </Box>
    )
  }

  const reportHeader = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        className={classes.reportHeader}
      >
        <Typography className={classes.reportTitle}>
          {t('dashboard.reports.' + props.report)}
        </Typography>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <ButtonSelect
              options={dateOptions}
              value={reportDate}
              setValue={setReportDate}
            />
            <FontAwesomeIcon
              id="edit"
              icon="fa-regular fa-pen"
              className={classes.editReport}
              onClick={handleOpenAddReport}
            />
          </Box>
          <Typography className={classes.reportDates}>
            {dateRange.from} - {dateRange.to}
          </Typography>
        </Box>
      </Box>
    )
  }

  const handleOpenAddReport = event => {
    // TODO display Add or Edit component
    console.log('>>> action: ', event.target.id)
    setOpen(true)
  }
  const handleCloseAddReport = () => {
    setOpen(false)
  }

  return (
    <Paper
      className={`${classes.reportPaper} ${
        props.report ? '' : classes.emptyPaper
      }`}
    >
      {props.report
        ? (
          getReport()
        )
        : (
          <Button
            id="add"
            className={classes.addButton}
            variant="text"
            onClick={handleOpenAddReport}
          >
            {t('dashboard.addReport')}
          </Button>
        )}
      <Dialog open={open} onClose={handleCloseAddReport}>
        {/* TODO */}
        <AddReport />
      </Dialog>
    </Paper>
  )
}
