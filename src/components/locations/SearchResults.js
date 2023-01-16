import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/** Components **/
import { LocationCard } from './LocationCard.js'

/** Material UI **/
import { Box, Typography } from '@mui/material'

/** React Virtualized **/
import { List, AutoSizer } from 'react-virtualized'

/** Redux **/
import { useSelector } from 'react-redux'

/* Utils */
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size'
import { mobileBreakpoint, locationsPerPage } from '../../lib/Constants'

// Styles
import { searchResultsStyles } from '../../styles/classes/LocationsClasses'

export const SearchResults = (props) => {
  const { sites } = props
  const classes = searchResultsStyles()
  const wWidth = useWindowWidth()
  const { t } = useTranslation()
  const wHeight = useWindowHeight()
  const locationsStore = useSelector((state) => state.locations)
  const loading = useSelector((state) => state.loading.loading)
  const [keyAutoSizer, setKeyAutoSizer] = useState(0)

  const observer = useRef()
  const lastTableElement = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && (sites.length % locationsPerPage) === 0) {
          props.setTablePage(prevTablePage => prevTablePage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, sites]
  )

  useEffect(() => {
    setKeyAutoSizer(value => value + 1)
  }, [locationsStore.activeTab])

  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const row = sites[index]
    let tableReference = null
    if (sites.length === index + 1) {
      tableReference = lastTableElement
    }
    return <LocationCard ref={tableReference} activeTab={props.activeTab} key={row.id} info={row} style={style} />
  }

  const getRowHeight = ({ index }) => {
    const site = sites[index] ?? {}
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
        return 110
    }
  }

  if (sites) {
    if (sites.length > 0) {
      return <AutoSizer key={keyAutoSizer}>
        {({ width }) => (
          <List
            width={width}
            height={wWidth > mobileBreakpoint ? wHeight - 160 : wHeight - 205}
            rowCount={sites.length}
            rowHeight={getRowHeight}
            rowRenderer={rowRenderer}
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
  } else {
    return (<div></div>)
  }
}
