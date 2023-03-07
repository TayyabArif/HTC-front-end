import React, { useEffect, useState } from 'react'
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
import { isChrome, isSafari, mobileBreakpoint } from '../../lib/Constants'

// Styles
import { searchResultsStyles } from '../../styles/classes/LocationsClasses'

export const SearchResults = (props) => {
  const { sites, actualPage, hasMore } = props
  const classes = searchResultsStyles()
  const wWidth = useWindowWidth()
  const { t } = useTranslation()
  const wHeight = useWindowHeight()
  const locationsStore = useSelector((state) => state.locations)
  const [keyAutoSizer, setKeyAutoSizer] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setKeyAutoSizer(value => value + 1)
  }, [locationsStore.activeTab])

  useEffect(() => {
    setLoading(false)
  }, [sites])

  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const row = sites[index]
    if ((sites.length - 1) === index && isVisible && hasMore && !loading) {
      setLoading(true)
      props.setTablePage(actualPage + 1)
    }
    if (row) {
      return <LocationCard activeTab={props.activeTab} key={row.id} info={row} setSearch={props.setSearch} style={style}/>
    }
  }

  const getRowHeight = ({ index }) => {
    const site = sites[index] ?? {}
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

  if (sites) {
    if (sites.length > 0) {
      return <AutoSizer key={keyAutoSizer}>
        {({ width }) => (
          <List
            width={width}
            height={wWidth > mobileBreakpoint
              ? wHeight - 180
              : (wWidth > 577 ? wHeight - 208 : (isSafari && !isChrome() ? wHeight - 240 : wHeight - 240))}
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
