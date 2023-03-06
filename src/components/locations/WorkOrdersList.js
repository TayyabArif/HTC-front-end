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

/** Utils **/
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size'
import { mobileBreakpoint, locationWorkOrdersPerPage } from '../../lib/Constants'

/** Styles **/
import { searchResultsStyles } from '../../styles/classes/LocationsClasses'

/** Services **/
import { getLocationWorkOrders } from '../../services/ApiService.js'

export const WorkOrdersList = (props) => {
  const { searchValue } = props
  const userStore = useSelector(state => state.auth.user)
  const classes = searchResultsStyles()
  const wWidth = useWindowWidth()
  const { t } = useTranslation()
  const wHeight = useWindowHeight()
  const locationsStore = useSelector((state) => state.locations)
  const [keyAutoSizer, setKeyAutoSizer] = useState(0)
  const [page, setPage] = useState(1)
  const [workOrders, setWorkOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const timer1 = setTimeout(() => handleGetWorkOrders(), 500)
    return () => {
      clearTimeout(timer1)
    }
  }, [page, userStore.clientId, searchValue, locationsStore.woListFilters, locationsStore.selectedSite, locationsStore.showSiteViewPanel])

  useEffect(() => {
    setPage(1)
  }, [searchValue, locationsStore.locationFilters, locationsStore.selectedSite])

  useEffect(() => {
    setLoading(false)
  }, [workOrders])

  const handleGetWorkOrders = async () => {
    try {
      if (locationsStore.showSiteViewPanel && locationsStore.selectedSite) {
        const filters = locationsStore.woListFilters
        const response = await getLocationWorkOrders(
          locationsStore.selectedSite.id,
          searchValue,
          locationWorkOrdersPerPage,
          page,
          filters.startDate,
          filters.endDate,
          filters.status === 'all' ? '' : filters.status,
          filters.trade === 'all' ? '' : filters.trade,
          filters.service === 'all' ? '' : filters.service,
          filters.type === 'all' ? '' : filters.type,
          filters.sortBy === 'none' ? '' : filters.sortBy)
        setHasMore(response.work_orders.length === locationWorkOrdersPerPage)
        if (page === 1) {
          setWorkOrders(response.work_orders)
        } else {
          setWorkOrders(prevList => [...prevList, ...response.work_orders])
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    setKeyAutoSizer(value => value + 1)
  }, [locationsStore.selectedSite])

  const woRowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const row = workOrders[index]
    if ((workOrders.length - 1) === index && isVisible && hasMore && !loading) {
      setLoading(true)
      setPage(page + 1)
    }
    if (row) {
      return <WorkOrderCard activeTab={props.activeTab} key={row.id} info={row} style={style} />
    }
  }

  const getRowHeight = ({ index }) => {
    const site = workOrders[index] ?? {}
    const contentRowLength = site.address?.length +
      site.city?.length +
      site.state?.length +
      site.zipcode?.length

    switch (props.activeTab) {
      case 'active_work_orders':
        return 120
      case 'all_sites':
        return contentRowLength > 55 ? 95 : 78
      default:
        return 110
    }
  }

  if (workOrders.length > 0) {
    return <AutoSizer key={keyAutoSizer}>
      {({ width }) => (
        <List
          width={width < wWidth ? width : wWidth}
          height={wWidth > mobileBreakpoint ? wHeight - 210 : wHeight - 190}
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
