import React from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Grid, Typography } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'

/** Components **/
import { MapCounter } from '../../../styles/mui_custom_components'
/** Redux **/
import { useSelector } from 'react-redux'

// Styles
import { mapCountersStyles } from '../../../styles/classes/LocationsClasses'

export const MapCounters = (props) => {
  const classes = mapCountersStyles()
  const { t } = useTranslation()
  const locationsStore = useSelector((state) => state.locations)

  if (props.searchResults) {
    if (locationsStore.showSiteViewPanel) {
      return <div></div>
    }

    return (<div className={classes.containerDiv}>
          <Grid container display={'flex'} className={classes.mapButtonsCounters}>
            <Grid item classes={{ root: classes.gridItem }}>
              <MapCounter>
                <Typography component={'span'} className={classes.font12}>
                  {t('sites.total_sites')}
                </Typography>
                <Typography className={classes.font12}>
                  {props.searchResults.meta.total_result ?? 0}
                </Typography>
              </MapCounter>
            </Grid>

            <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
              <MapCounter>
                <Typography component={'span'} className={classes.font12}>
                  {t('sites.active_sites')}
                  <FiberManualRecord className={classes.activeWork}/>
                </Typography>
                <Typography className={classes.font12}>
                  {props.searchResults.meta.active_sites ?? 0}
                </Typography>
              </MapCounter>
            </Grid>

            <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
              <MapCounter>
                <Typography component={'span'} className={classes.font12}>
                  {t('sites.no_activity')}
                  <FiberManualRecord className={classes.noActivity}/>
                </Typography>
                <Typography className={classes.font12}>
                  {props.searchResults.meta.no_activity_sites ?? 0}
                </Typography>
              </MapCounter>
            </Grid>

            <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
              <MapCounter>
                <Typography component={'span'} className={classes.font12}>
                  {t('sites.completed_wo')}
                  <FiberManualRecord className={classes.completedWork}/>
                </Typography>
                <Typography className={classes.font12}>
                  {props.searchResults.meta.completed_work_orders ?? 0}
                </Typography>
              </MapCounter>
            </Grid>

            <Grid item hidden={locationsStore.advancedFiltersSelected} classes={{ root: classes.gridItem }}>
              <MapCounter>
                <Typography component={'span'} className={classes.font12}>
                  {t('sites.report_date')}
                </Typography>
                <Typography className={classes.font12}>
                  {t('sites.filters.date.' + props.date)}
                </Typography>
              </MapCounter>
            </Grid>
          </Grid>
        </div>
    )
  } else {
    return <div/>
  }
}
