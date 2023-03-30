import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Dialog, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { dashboardStyles } from '../../styles/classes/DashboardClasses'

export const ReportCard = props => {
  const classes = dashboardStyles()
  const { t } = useTranslation()
  // flag to check if report finished loading
  const [ready, setReady] = useState(false)
  // add report dialog control
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // TODO load report based on props.report
    // remove timeout after logic has been implemented
    setTimeout(() => {
      setReady(true)
    }, 4000)
  }, [])

  function getReport () {
    return (
      <Box height="100%">
        <Box height="15%">report name</Box>
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

  const handleOpenAddReport = () => {
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
            className={classes.addButton}
            variant="text"
            onClick={handleOpenAddReport}
          >
            {t('dashboard.addReport')}
          </Button>
        )}
      <Dialog open={open} onClose={handleCloseAddReport}>
        {/* TODO */}
        {'Add report container'}
      </Dialog>
    </Paper>
  )
}
