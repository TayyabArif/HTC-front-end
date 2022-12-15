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
            <Grid container >
              <Grid xs={12} >
                <Typography component={'span'} className={classes.font12}>
                  {t('locations.all_locations')}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.font12}>
                  {props.searchResults.meta.total_result ?? 0}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.rangeLabel}>
                  {t(`locations.date_ranges.${locationsStore.sitesDateRange}`)}
                </Typography>
              </Grid>
            </Grid>
          </MapCounter>
        </Grid>

        <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
          <MapCounter>
            <Grid container >
              <Grid xs={12} >
                <Typography component={'span'} className={classes.font12}>
                  {t('locations.open')}
                  <FiberManualRecord className={classes.activeWork} />
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.font12}>
                  {props.searchResults.meta.active_sites ?? 0}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.rangeLabel}>
                  {t(`locations.date_ranges.${locationsStore.sitesDateRange}`)}
                </Typography>
              </Grid>
            </Grid>
          </MapCounter>
        </Grid>

        <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
          <MapCounter>
            <Grid container >
              <Grid xs={12} >
                <Typography component={'span'} className={classes.font12}>
                  {t('locations.in_progress')}
                  <FiberManualRecord className={classes.inProgressWork} />
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.font12}>
                  {props.searchResults.meta.no_activity_sites ?? 0}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.rangeLabel}>
                  {t(`locations.date_ranges.${locationsStore.sitesDateRange}`)}
                </Typography>
              </Grid>
            </Grid>
          </MapCounter>
        </Grid>

        <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
          <MapCounter>
            <Grid container >
              <Grid xs={12} >
                <Typography component={'span'} className={classes.font12}>
                  {t('locations.completed')}
                  <FiberManualRecord className={classes.completedWork} />
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.font12}>
                  {props.searchResults.meta.completed_work_orders ?? 0}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.rangeLabel}>
                  {t(`locations.date_ranges.${locationsStore.sitesDateRange}`)}
                </Typography>
              </Grid>
            </Grid>
          </MapCounter>
        </Grid>

        <Grid item hidden={locationsStore.activeTab === 'all_sites'} classes={{ root: classes.gridItem }}>
          <MapCounter>
            <Grid container >
              <Grid xs={12} >
                <Typography component={'span'} className={classes.font12}>
                  {t('locations.no_activity')}
                  <FiberManualRecord className={classes.noActivity} />
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.font12}>
                  {props.searchResults.meta.completed_work_orders ?? 0}
                </Typography>
              </Grid>
              <Grid xs={6} className={classes.gridCounter} >
                <Typography className={classes.rangeLabel}>
                  {t(`locations.date_ranges.${locationsStore.sitesDateRange}`)}
                </Typography>
              </Grid>
            </Grid>
          </MapCounter>
        </Grid>
      </Grid>
    </div>
    )
  } else {
    return <div />
  }
}
