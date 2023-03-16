import React from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Chip, Typography } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'

/** Styles **/
import { panelCountsMobileStyles } from '../../styles/classes/LocationsClasses'

export const PanelCountsMobile = (props) => {
  const classes = panelCountsMobileStyles()
  const { t } = useTranslation()

  const labelComp = (label, count) => {
    return <Typography display="inline" className={classes.labelTypo}>
      <Typography display="inline" className={classes.labelTypoBold}>{count}</Typography>&nbsp;
      {label}
    </Typography>
  }

  return (
    <div className={classes.mainDiv}>
      <Chip
        label={labelComp(t('locations.total_locations'), props.searchResults?.meta?.total_site_count ?? 0)}
        variant="filled"
        className={classes.font12}
      />
      <Chip
        label={labelComp(t('locations.open'), props.searchResults?.meta?.sites_open_wo ?? 0)}
        onDelete={() => {}}
        variant="filled"
        className={classes.font12}
        deleteIcon={<FiberManualRecord className={classes.activeWork} />}
      />
      <Chip
        label={labelComp(t('locations.in_progress'), props.searchResult?.meta?.sites_in_progress_wo ?? 0)}
        onDelete={() => {}}
        variant="filled"
        className={classes.font12}
        deleteIcon={<FiberManualRecord className={classes.inProgressWork} />}
      />
      <Chip
        label={labelComp(t('locations.completed'), props.searchResults?.meta?.sites_completed_wo ?? 0)}
        onDelete={() => {}}
        variant="filled"
        className={classes.font12}
        deleteIcon={<FiberManualRecord className={classes.completedWork} />}
      />
      <Chip
        label={labelComp(t('locations.no_activity'), props.searchResults?.meta?.no_activity_sites ?? 0)}
        onDelete={() => {}}
        variant="filled"
        className={classes.font12}
        deleteIcon={<FiberManualRecord className={classes.noActivity} />}
      />
    </div>
  )
}
