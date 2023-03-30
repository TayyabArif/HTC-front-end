import React from 'react'

/** Material UI **/
import { Container, Grid } from '@mui/material'
import { dashboardStyles } from '../styles/classes/DashboardClasses'
import { ReportCard } from '../components/dashboard/ReportCard'

const Dashboard = props => {
  const classes = dashboardStyles()

  return (
    <Container display="flex" just className={classes.globalContainer}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <ReportCard report={'test 1'}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard report={'test 2'}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard />
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard />
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard />
        </Grid>
        <Grid item xs={6} md={4}>
          <ReportCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
