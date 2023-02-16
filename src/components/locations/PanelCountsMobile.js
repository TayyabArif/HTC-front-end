import React from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Chip } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'

/** Styles **/
import { panelCountsMobileStyles } from '../../styles/classes/LocationsClasses'

export const PanelCountsMobile = (props) => {
  const classes = panelCountsMobileStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.mainDiv}>
        <Chip
            label={`${props.searchResults?.meta?.total_site_count ?? 0}  ${t('locations.total_locations')}`}
            variant="filled"
            className={classes.font12}
        />
        <Chip
            label={`${props.searchResults?.meta?.sites_open_wo ?? 0}  ${t('locations.open')}`}
            onClick={() => {}}
            onDelete={() => {}}
            variant="filled"
            className={classes.font12}
            deleteIcon={<FiberManualRecord className={classes.activeWork} />}
        />
        <Chip
            label={`${props.searchResult?.meta?.sites_in_progress_wo ?? 0}  ${t('locations.in_progress')}`}
            onClick={() => {}}
            onDelete={() => {}}
            variant="filled"
            className={classes.font12}
            deleteIcon={<FiberManualRecord className={classes.inProgressWork} />}
        />
        <Chip
            label={`${props.searchResults?.meta?.sites_completed_wo ?? 0}  ${t('locations.completed')}`}
            onClick={() => {}}
            onDelete={() => {}}
            variant="filled"
            className={classes.font12}
            deleteIcon={<FiberManualRecord className={classes.completedWork} />}
        />
        <Chip
            label={`${props.searchResults?.meta?.no_activity_sites ?? 0}  ${t('locations.no_activity')}`}
            onClick={() => {}}
            onDelete={() => {}}
            variant="filled"
            className={classes.font12}
            deleteIcon={<FiberManualRecord className={classes.noActivity} />}
        />
    </div>
  )
}
