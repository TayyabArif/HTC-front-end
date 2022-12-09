import React, { useState, useEffect } from 'react'
import { workOrderStyles } from '../styles/classes/WorkOrdersClasses'
/** Material UI **/
import { Container, FormControl, InputAdornment, IconButton, Button, Icon as ClearIcon } from '@mui/material'
import { CustomOutlinedInput } from '../styles/mui_custom_components'

import { useWoSearch } from '../components/workorders/useWoSearch'
import { MainTable } from '../components/workorders/MainTable'

import { useTranslation } from 'react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const initFilters = {
  sites: '',
  trade: '',
  service: '',
  wostat: '',
  won: '',
  pon: '',
  eta: '',
  opendate: '',
  duedate: '',
  state: '',
  city: '',
  pastdue: '',
  call_type: '',
  asc_sort: '',
  desc_sort: '',
  invoices: '',
  priority: '',
  external_id: ''
}

const WorkOrders = (props) => {
  const { t } = useTranslation()
  const searchParams = window.location.hash.replace('#', '?')

  const classes = workOrderStyles()
  const [searchValue, setSearchValue] = useState('')

  const [searchSendValue, setSearchSendValue] = useState('')
  const [searchIndex, setSearchIndex] = useState(0)
  const [searchEnabled, setSearchEnabled] = useState(false)

  const queryWon = new URLSearchParams(searchParams).get('won') ?? ''
  const querySites = new URLSearchParams(searchParams).get('sites') ?? ''
  const queryTrades = new URLSearchParams(searchParams).get('trades') ?? ''
  const queryStatus = new URLSearchParams(searchParams).get('status') ?? ''

  const [selected, setSelected] = useState([])
  const [openAdvanced, setOpenAdvanced] = useState(false)
  const [tablePage, setTablePage] = useState(1)

  const [filters, setFilters] = useState({
    ...initFilters,
    won: queryWon,
    sites: querySites,
    trade: queryTrades,
    wostat: queryStatus
  })

  history.replaceState(null, null, ' ')

  const { loading, workOrders, chips, hasMore } = useWoSearch(
    false,
    searchSendValue,
    filters.client_name,
    filters.site_name,
    filters.trade,
    filters.service,
    filters.won,
    filters.opendate,
    filters.duedate,
    filters.wostat,
    filters.invoices,
    filters.priority,
    filters.external_id,
    filters.asc_sort,
    filters.desc_sort,
    30,
    tablePage,
    searchEnabled
  )

  useEffect(() => {
    setTablePage(1)
    setSearchEnabled(true)
    setTimeout(() => {
      setSearchEnabled(false)
    }, 500)
  }, [searchSendValue, filters])

  useEffect(() => {
    window.currentSearchIndex = searchIndex
    if (searchValue !== searchSendValue) {
      setSearchSendValue(searchValue)
    }
  }, [searchIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchSendValue(searchValue)
    }, 1500)
    return () => clearTimeout(timer)
  }, [searchValue])

  const handleChangeSearch = event => {
    const value = event.target.value
    setSearchValue(value)
  }

  const handleKeyDownSearch = event => {
    if (event.keyCode === 13) {
      setSearchIndex(searchIndex + 1)
    }
  }

  const handleClearGlobalSearch = event => {
    setSearchValue('')
    setSearchIndex(searchIndex + 1)
  }

  const handleBlurSearch = () => {
    /* Blur delayed if clear exists */
    setTimeout(() => {
      setSearchIndex(searchIndex + 1)
    }, 100)
  }

  const handleCleanFilters = () => {
    setFilters(initFilters)
    setSearchValue('')
    setSearchIndex(searchIndex + 1)
    setSelected([])
  }

  const validateFilters = () => {
    let value = true
    // eslint-disable-next-line array-callback-return
    Object.keys(initFilters).map(element => {
      if (initFilters[element] !== filters[element]) {
        value = false
      }
      return null
    })
    return value
  }

  return (
    <div>

      <Container
        style={{ overflow: 'hidden' }}
        className={classes.globalFiltersContainer}
        data-testid={'wo_page'}
      >
        <FormControl
          variant="outlined"
          data-testid={'search_field'}
        >
          <CustomOutlinedInput
            value={searchValue}
            className={classes.SearchInput}
            id="component-outlined"
            placeholder={t('general.labels.search')}
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDownSearch}
            onBlur={handleBlurSearch}
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="xs"
                  color="grey"
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {searchValue.length > 0
                  ? (
                  <IconButton onClick={handleClearGlobalSearch}>
                    <ClearIcon style={{ fontSize: 'small' }} fontSize="small" />
                  </IconButton>
                    )
                  : (
                  <div />
                    )}
              </InputAdornment>
            }
            autoComplete="off"
          />
        </FormControl>
        {!validateFilters() && (
          <Button
            data-testid={'reset_button'}
            size="small"
            classes={{ root: classes.resetButton }}
            onClick={handleCleanFilters}
          >
            {t('work_orders.reset_button')}
          </Button>
        )}
      </Container>

      <Container classes={{ root: classes.tableContainer }}>
        <MainTable
          chips={chips}
          content={workOrders}
          openAdvanced={openAdvanced}
          setOpenAdvanced={setOpenAdvanced}
          selected={selected}
          setSelected={setSelected}
          loading={loading}
          hasMore={hasMore}
          setTablePage={setTablePage}
          filters={filters}
          setFilters={setFilters}
          handleCleanFilters={handleCleanFilters}
          validateFilters={validateFilters}
          setSearchEnabled={setSearchEnabled}
        />
      </Container>

    </div>
  )
}

export default WorkOrders
