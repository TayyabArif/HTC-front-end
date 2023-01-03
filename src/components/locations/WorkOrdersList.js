import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Components **/
import { WorkOrderCard } from './WorkOrderCard.js'

/** Material UI **/
import { Box, Typography } from '@mui/material'

/** React Virtualized **/
import { List, AutoSizer } from 'react-virtualized'

/** Redux **/
import { useSelector } from 'react-redux'

/* Utils */
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size'
import { mobileBreakpoint } from '../../lib/Constants'

// Styles
import { searchResultsStyles } from '../../styles/classes/LocationsClasses'

export const WorkOrdersList = (props) => {
  const { workOrders } = props
  const classes = searchResultsStyles()
  const wWidth = useWindowWidth()
  const { t } = useTranslation()
  const wHeight = useWindowHeight()
  const locationsStore = useSelector((state) => state.locations)
  const [keyAutoSizer, setKeyAutoSizer] = useState(0)

  useEffect(() => {
    setKeyAutoSizer(value => value + 1)
  }, [locationsStore.activeTab])

  const woRowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const row = workOrders[index]
    return <WorkOrderCard activeTab={props.activeTab} key={row.id} info={row} style={style}/>
  }

  const getRowHeight = ({ index }) => {
    const site = workOrders[index] ?? {}
    const contentRowLength = site.address?.length +
        site.city?.length +
        site.state?.length +
        site.zipcode?.length

    switch (props.activeTab) {
      case 'active_work_orders':
        return 108
      case 'all_sites':
        return contentRowLength > 55 ? 95 : 78
      default:
        return 120
    }
  }

  if (workOrders.length > 0) {
    return <AutoSizer key={keyAutoSizer}>
        {({ width }) => (
            <List
                width={width}
                height={wWidth > mobileBreakpoint ? wHeight - 205 : wHeight - 180}
                rowCount={workOrders.length}
                rowHeight={getRowHeight}
                rowRenderer={woRowRenderer}
            />
        )}
      </AutoSizer>
  } else {
    return (
        <Box pt={5}>
          <Typography className={classes.font12} align='center'>
            {t('locations.no_results')}
          </Typography>
          <Typography className={classes.font12} align='center'>
            {t('locations.update_search')}
          </Typography>
        </Box>
    )
  }
}
