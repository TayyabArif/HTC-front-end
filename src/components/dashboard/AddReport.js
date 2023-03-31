import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import { Container, Typography, Grid, Box, Button } from '@mui/material'
import GlobalSelect from './Selector'
import { reports, accesses } from '../../lib/Constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RoundedButton } from '../../styles/mui_custom_components'
import {
  disableButtonStyle,
  enableButtonStyle
} from '../../styles/mui_custom_theme'

import { dashboardStyles } from '../../styles/classes/DashboardClasses'

export const AddReport = () => {
  const { t } = useTranslation()
  const classes = dashboardStyles()
  const [access, setAccess] = useState(['All Access'])
  const [report, setReport] = useState()
  const [noneSelected, setNoneSelected] = useState()
  const [barSelected, setBarSelected] = useState()
  const [columnSelected, setColumnSelected] = useState()
  const [pieSelected, setPieSelected] = useState()
  const [scatterSelected, setScatterSelected] = useState()
  const [lineSelected, setLineSelected] = useState()
  const [enableContinue, setEnableContinue] = useState()

  const handleChange = e => {
    setReport(e)
  }
  const AccessHandleChange = e => {
    setAccess(e)
  }
  useEffect(() => {
    let save = true
    if (
      !access ||
      !report ||
      (!noneSelected &&
        !barSelected &&
        !columnSelected &&
        !pieSelected &&
        !scatterSelected &&
        !lineSelected)
    ) {
      save = false
    }
    setEnableContinue(save)
  }, [
    access,
    report,
    noneSelected,
    barSelected,
    columnSelected,
    pieSelected,
    scatterSelected,
    lineSelected
  ])

  const handleClickNone = () => {
    setNoneSelected(true)
    setBarSelected(false)
    setColumnSelected(false)
    setPieSelected(false)
    setScatterSelected(false)
    setLineSelected(false)
  }
  const handleClickBar = () => {
    setNoneSelected(false)
    setBarSelected(true)
    setColumnSelected(false)
    setPieSelected(false)
    setScatterSelected(false)
    setLineSelected(false)
  }
  const handleClickColumn = () => {
    setNoneSelected(false)
    setBarSelected(false)
    setColumnSelected(true)
    setPieSelected(false)
    setScatterSelected(false)
    setLineSelected(false)
  }
  const handleClickPie = () => {
    setNoneSelected(false)
    setBarSelected(false)
    setColumnSelected(false)
    setPieSelected(true)
    setScatterSelected(false)
    setLineSelected(false)
  }
  const handleClickScatter = () => {
    setNoneSelected(false)
    setBarSelected(false)
    setColumnSelected(false)
    setPieSelected(false)
    setScatterSelected(true)
    setLineSelected(false)
  }
  const handleClickLine = () => {
    setNoneSelected(false)
    setBarSelected(false)
    setColumnSelected(false)
    setPieSelected(false)
    setScatterSelected(false)
    setLineSelected(true)
  }

  return (
    <Container>
      <Grid mt={3}>
        <Grid item xs={12}>
          <Typography mb={1} className={classes.title}>
            {t('dashboard.addReport')}
          </Typography>
          <Typography className={classes.subtitle} mb={5}>
            {t('dashboard.add_report.subtitle')}
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex">
        <Box className={classes.formContainer}>
          <Typography className={classes.sectionTitle}>
            {t('dashboard.add_report.access')}
          </Typography>
          <GlobalSelect
            value={access}
            onChange={AccessHandleChange}
            options={accesses}
          />
          <Typography className={classes.sectionTitle}>
            {t('dashboard.add_report.select_report')}
          </Typography>
          <GlobalSelect
            value={report}
            onChange={handleChange}
            options={reports}
            placeholder="Select"
          />
          <Typography className={classes.sectionTitle}>
            {t('dashboard.add_report.display_as')}
          </Typography>
          <Grid className={classes.btn} mb={5} mt={5}>
            <Button
              className={!noneSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickNone}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-input-numeric"
                className={classes.icon}
              />
              <p className={classes.iconLabel}>
                {t('dashboard.add_report.none')}
              </p>
            </Button>
            <Button
              className={!barSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickBar}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-chart-simple-horizontal"
                className={classes.icon}
              />
              <p className={classes.iconLabel}>
                {t('dashboard.add_report.bar')}
              </p>
            </Button>
            <Button
              className={!columnSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickColumn}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-chart-simple"
                className={classes.icon}
              />
              <p className={classes.iconLabel}>
                {t('dashboard.add_report.column')}
              </p>
            </Button>
          </Grid>
          <Grid className={classes.btn} mb={5}>
            <Button
              className={!pieSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickPie}
            >
              <span>
                <FontAwesomeIcon
                  icon="fa-regular fa-chart-pie"
                  className={classes.icon}
                />
              </span>
              <span className={classes.iconLabel}>
                {t('dashboard.add_report.pie')}
              </span>
            </Button>
            <Button
              className={!scatterSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickScatter}
            >
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-chart-scatter"
                  className={classes.icon}
                />
              </span>
              <span className={classes.iconLabel}>
                {t('dashboard.add_report.scatter')}
              </span>
            </Button>{' '}
            <Button
              className={!lineSelected ? classes.flex : classes.iconClicked}
              onClick={handleClickLine}
            >
              <span>
                <FontAwesomeIcon
                  icon="fa-solid fa-chart-line"
                  className={classes.icon}
                />
              </span>
              <span className={classes.iconLabel}>
                {t('dashboard.add_report.line')}
              </span>
            </Button>
          </Grid>
        </Box>
      </Box>
      <Grid align="right" item pb={2}>
        <Box className={classes.sendButtonBox}>
          <RoundedButton
            className={classes.sendButton}
            type="submit"
            variant="contained"
            disabled={!enableContinue}
            style={!enableContinue ? disableButtonStyle : enableButtonStyle}
          >
            {t('dashboard.add_report.continue')}
          </RoundedButton>
        </Box>
      </Grid>
    </Container>
  )
}
