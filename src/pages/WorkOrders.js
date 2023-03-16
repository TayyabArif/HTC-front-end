import React, { useState, useEffect } from 'react'

/** Components **/
import { Container, FormControl, InputAdornment, IconButton, Button, Icon as ClearIcon } from '@mui/material'
import { CustomOutlinedInput } from '../styles/mui_custom_components'
import { useWoSearch } from '../components/workorders/useWoSearch'
import { MainTable } from '../components/workorders/MainTable'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

/** Services **/
import { defWorkColumns } from '../lib/Constants'
import { getCompanyConfigs } from '../services/ApiService'

/** Styles **/
import { workOrderStyles } from '../styles/classes/WorkOrdersClasses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const initFilters = {
  location: '',
  trade: '',
  service: '',
  wo_status: '',
  wo_number: '',
  pon: '',
  eta: '',
  open_date: '',
  close_date: '',
  state: '',
  city: '',
  pastdue: '',
  call_type: '',
  asc_sort: '',
  desc_sort: '',
  invoices: '',
  priority: '',
  tracking: ''
}

const WorkOrders = (props) => {
  const { t } = useTranslation()
  const searchParams = window.location.hash.replace('#', '?')
  const userStore = useSelector(state => state.auth.user)

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
  const [columnsConfig, setColumnsConfig] = useState([])

  const [filters, setFilters] = useState({
    ...initFilters,
    wo_number: queryWon,
    location: querySites,
    trade: queryTrades,
    wo_status: queryStatus
  })

  history.replaceState(null, null, ' ')

  const { loading, workOrders, chips, hasMore } = useWoSearch(
    false,
    searchSendValue,
    filters.client_name,
    filters.location,
    filters.trade,
    filters.service,
    filters.wo_number,
    filters.open_date,
    filters.close_date,
    filters.wo_status,
    filters.invoices,
    filters.priority,
    filters.tracking,
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

  useEffect(() => {
    getColumnsConfig()
  }, [])

  const getColumnsConfig = async () => {
    const configResponse = await getCompanyConfigs(userStore.userInfo.company_id)
    if (configResponse && configResponse?.length > 0) {
      const columnsConfig = configResponse.find(config => config.type === 'columns')
      if (columnsConfig) {
        setColumnsConfig(columnsConfig.data)
      } else {
        return setColumnsConfig(defWorkColumns)
      }
    } else {
      return setColumnsConfig(defWorkColumns)
    }
  }

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
          columnsConfig={columnsConfig}
        />
      </Container>

    </div>
  )
}

export default WorkOrders
