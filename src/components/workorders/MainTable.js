import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect
} from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

// main components
import { InputFieldFilter } from './InputFieldFilter'
import { DateFilter } from './DateFilter'
import { DetailedInfo } from './DetailedInfo'
import { SlideFilter } from './SlideFilter'
import { SortMenu } from './SortMenu'
import { useSelector } from 'react-redux'
// mui components
import {
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  LinearProgress,
  Typography,
  ThemeProvider
} from '@mui/material'
import { FiberManualRecord as PointIcon } from '@mui/icons-material'

// service
import {
  invoiceStatusOptionsWOList,
  woStatusOptions
} from '../../lib/Constants'
import { getSitesAdvancedFiltersInfo } from '../../services/ApiService'

import ReactGA from 'react-ga4'
import { checkboxTheme } from '../../styles/mui_custom_theme'
import { getWOstatus } from '../../lib/Global'
import { mainTableStyles } from '../../styles/classes/WorkOrdersClasses'

function titleCase (str) {
  const splitStr = str.replace('_', ' ').toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

function EnhancedTableHead (props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    filtersCatalog,
    filters,
    setFilters
  } = props

  const classes = mainTableStyles()
  const { t } = useTranslation()

  const tradesOptions =
    filtersCatalog.trades &&
    filtersCatalog.trades.map(item => {
      return { label: titleCase(item.name), value: item.name }
    })
  const servicesOptions =
    filtersCatalog.services &&
    filtersCatalog.services.map(item => {
      return { label: titleCase(item.name), value: item.name }
    })

  const woStatusOptions = filtersCatalog.workOrdersStatus.map(item => {
    return {
      label: titleCase(t(`work_orders.wo_states.${item}`)),
      value: item
    }
  })
  /* const inStatusOptions =
    filtersCatalog.invoices &&
    filtersCatalog.invoices.map(item => {
      return {
        label: titleCase(t(`invoices.in_states.${item}`)),
        value: item
      }
    }) */

  const filterComponents = [
    // { id: 'client_name', type: 'InputFieldFilter' },
    { id: 'site_name', type: 'InputFieldFilter' },
    { id: 'priority', type: 'InputFieldFilter' },
    { id: 'trade', type: 'SlideFilter', options: tradesOptions },
    { id: 'service', type: 'SlideFilter', options: servicesOptions },
    { id: 'won', type: 'InputFieldFilter' },
    { id: 'external_id', type: 'InputFieldFilter' },
    { id: 'opendate', type: 'DateFilter' },
    { id: 'duedate', type: 'DateFilter' },
    { id: 'wostat', type: 'SlideFilter', options: woStatusOptions }
    // { id: 'invoices', type: 'SlideFilter', options: inStatusOptions }
  ]
  let count = 0
  const checked = rowCount > 0 && numSelected === rowCount
  if (checked) {
    count = rowCount
  } else {
    count = numSelected
  }

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell className={classes.checkboxTablecell} padding="checkbox">
          <ThemeProvider theme={checkboxTheme}>
            <div className={classes.labelCounter}>
              {count !== 0 ? numberWithCommas(count) : ''}
            </div>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </ThemeProvider>
        </TableCell>
        {props.columns &&
          props.columns
            ?.filter(column => column.visible)
            .map((column, index, columns) => {
              const headCell = filterComponents.find(
                filter => filter.id === column.id
              )
              if (!headCell) {
                return null
              }
              return (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  classes={
                    index + 1 !== columns.length
                      ? { root: classes.headCell }
                      : { root: classes.lastHeadCell }
                  }
                >
                  <TableSortLabel
                    hideSortIcon
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    classes={{ root: classes.columnTitle }}
                  >
                    {headCell.type !== 'Button'
                      ? t('work_orders.column_names.' + headCell.id)
                      : ''}
                    {(headCell.id === 'opendate' ||
                      headCell.id === 'duedate' ||
                      headCell.id === 'wostat' ||
                      headCell.id === 'invoices' ||
                      headCell.id === 'won' ||
                      headCell.id === 'trade' ||
                      headCell.id === 'site_name' ||
                      headCell.id === 'client_name') && (
                      <SortMenu
                        id={headCell.id}
                        setValues={setFilters}
                        values={filters}
                      />
                    )}
                  </TableSortLabel>
                  <div>
                    {headCell.type === 'Button'
                      ? (
                      <div id={headCell.id} />
                        )
                      : (
                          false
                        )}
                    {headCell.type === 'InputFieldFilter'
                      ? (
                      <InputFieldFilter
                        id={headCell.id}
                        values={filters}
                        type={1}
                        setValues={setFilters}
                        placeholder={t('general.labels.search')}
                        height={headCell.height}
                        filterContent={() => null}
                      />
                        )
                      : (
                          false
                        )}
                    {headCell.type === 'DateFilter'
                      ? (
                      <DateFilter
                        id={headCell.id}
                        values={filters}
                        type={1}
                        setValues={setFilters}
                        height={headCell.height}
                        filterContent={() => null}
                        range
                        testid={'date_filter'}
                      />
                        )
                      : (
                          false
                        )}
                    {headCell.type === 'SlideFilter'
                      ? (
                      <SlideFilter
                        id={headCell.id}
                        values={props.filters}
                        type={1}
                        setValues={props.setFilters}
                        options={headCell.options ?? []}
                        height={headCell.height}
                        filterContent={() => null}
                        testid={'filter_open'}
                        hasAll={true}
                      />
                        )
                      : (
                          false
                        )}
                  </div>
                </TableCell>
              )
            })}

        {<TableCell padding="checkbox" size="small" />}
      </TableRow>
    </TableHead>
  )
}

function EnhancedTable (props) {
  const wHeight = getWindowHeight()
  const {
    content,
    selected,
    setSelected,
    loading,
    hasMore,
    setTablePage,
    filters,
    setFilters,
    validateFilters,
    setSearchEnabled
  } = props
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [woNum, setWoNum] = useState(null)
  const [filtersCatalog, setFiltersCatalog] = useState({
    states: [],
    workOrdersStatus: [],
    trades: [],
    callTypes: [],
    services: [],
    invoices: []
  })

  const columns = [
    // { id: 'client_name', visible: true },
    { id: 'site_name', visible: true },
    { id: 'priority', visible: true },
    { id: 'trade', visible: true },
    { id: 'service', visible: true },
    { id: 'won', visible: true },
    { id: 'external_id', visible: true },
    { id: 'opendate', visible: true },
    { id: 'duedate', visible: true },
    { id: 'wostat', visible: true }
    // { id: 'invoices', visible: true }
  ]

  const companyName = useSelector(state => state.auth.user.userInfo.company_name)

  const observer = useRef()
  const lastTableElement = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setTablePage(prevTablePage => prevTablePage + 1)
          setSearchEnabled(true)
          setTimeout(() => {
            setSearchEnabled(false)
          }, 500)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    // Make sure the WO download call has updated the token before this call is made
    setTimeout(() => {
      loadFiltersCatalogs()
    }, 2000)
  }, [])

  const loadFiltersCatalogs = async () => {
    console.log({
      workOrdersStatus: woStatusOptions,
      invoices: invoiceStatusOptionsWOList,
      trades: filters.trades,
      services: filters.services
    })
    try {
      const filters = await getSitesAdvancedFiltersInfo()
      setFiltersCatalog({
        workOrdersStatus: woStatusOptions,
        invoices: invoiceStatusOptionsWOList,
        trades: filters.trades,
        services: filters.services
      })
    } catch (err) {
      console.error(err)
      setFiltersCatalog({
        workOrdersStatus: woStatusOptions,
        invoices: invoiceStatusOptionsWOList
      })
    }
  }

  const classes = mainTableStyles()
  const { t } = useTranslation()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = content.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    event.stopPropagation()
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyComponent = () => (
    <TableBody key="empty-body">
      <TableRow>
        <TableCell className={classes.emptyTableCell} colSpan={10}>
          {!validateFilters()
            ? (
            <>
              <Box className={ classes.empty1 }>
                {t('work_orders.empty_message_title')}
              </Box>
              <Box className={ classes.empty2 }>
                {t('work_orders.empty_message_filters')}
              </Box>
            </>
              )
            : (
            <>
              <Box className={ classes.empty1 }>
                {t('work_orders.empty_message_title')}
              </Box>
              <Box className={ classes.empty2 } >
                {t('work_orders.empty_message').replace('{company_name}', companyName)}

              </Box>
            </>
              )}
        </TableCell>
      </TableRow>
    </TableBody>
  )

  const progressComponent = columns => {
    const auxArray = []
    for (let i = 1; i <= 4; i++) {
      auxArray.push(progressRow(columns, i))
    }
    return <TableBody>{auxArray.map((obj, ind) => obj)}</TableBody>
  }

  const handleClosePanel = () => {
    setWoNum(null)
  }

  const progressRow = (columns, i) => (
    <TableRow
      key={`progress-${i}`}
      id={`progress-${i}`}
      onClick={() => null}
      tabIndex={-1}
      style={{ height: '68px' }}
    >
      <TableCell key={'chk-' + i + '--1'} padding="checkbox">
        <ThemeProvider theme={checkboxTheme}>
          <Checkbox onClick={() => null} checked={false} />
        </ThemeProvider>
      </TableCell>
      {columns?.map((column, index) => {
        if (!column.visible) {
          return null
        }
        return column.type !== 'Button'
          ? (
          <TableCell
            key={column.id + '-' + i + '-' + index}
            align="left"
            style={{ paddingLeft: '8px', paddingRight: '14px' }}
            classes={{ root: classes.tableCell }}
          >
            <LinearProgress
              style={{ width: '100%' }}
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary,
                root: classes.dimensions
              }}
            />
          </TableCell>
            )
          : (
              false
            )
      })}
      {<TableCell padding="checkbox" size="small" />}
    </TableRow>
  )

  return (
    <div>
      <DetailedInfo workOrder={woNum} handleClosePanel={handleClosePanel} />
      <TableContainer classes={{ root: classes.tableContainer }}>
        <Table
          className={classes.headTable}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
          data-testid={'wo_main_table_head'}
        >
          <EnhancedTableHead
            chips={props.chips}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={content ? content?.length : 0}
            filtersCatalog={filtersCatalog}
            filters={filters}
            setFilters={setFilters}
            columns={columns}
          />
        </Table>
        <TableContainer
          style={{ height: wHeight - 208 + 'px' }}
          classes={{ root: classes.bodyTableContainer }}
        >
          <Table
            classes={{ root: classes.bodyTable }}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
            data-testid={'wo_main_table'}
          >
            {content && content.length > 0
              ? (
              <TableBody key="wo-table-body" classes={{ root: classes.body }}>
                {content.map((row, index) => {
                  let tableReference = null
                  if (content.length === index + 1) {
                    tableReference = lastTableElement
                  }
                  return (
                    <TableRow
                      ref={tableReference}
                      hover
                      onClick={event => {
                        event.stopPropagation()
                        ReactGA.event({
                          category: 'show',
                          action: 'show_work_order_detail'
                        })
                        setWoNum(row)
                      }}
                      role="checkbox"
                      aria-checked={isSelected(row.id)}
                      tabIndex={-1}
                      key={row.id}
                      selected={isSelected(row.id) || woNum?.id === row.id}
                      classes={{ selected: classes.selected }}
                      className={classes.tableRow}
                    >
                      <TableCell padding="checkbox">
                        <ThemeProvider theme={checkboxTheme}>
                          <Checkbox
                            onClick={event => handleClick(event, row.id)}
                            checked={isSelected(row.id)}
                            inputProps={{
                              'aria-labelledby': `enhanced-table-checkbox-${index}`
                            }}
                          />
                        </ThemeProvider>
                      </TableCell>
                      {columns.map((column, index) => {
                        if (!column.visible) return null
                        switch (column.id) {
                          case 'client_name':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.client_name ?? ''}
                              </TableCell>
                            )
                          case 'site_name':
                            return (
                              <TableCell
                                key={column.id + index}
                                id={`enhanced-table-checkbox-${index}`}
                                scope="row"
                                classes={{ root: classes.tableCell }}
                              >
                                <Box classes={{ root: classes.boxTitle }}>
                                  {row.store_name ?? ''}
                                </Box>
                                <Typography classes={{ root: classes.boxSub }}>
                                  {row.address}
                                </Typography>
                              </TableCell>
                            )
                          case 'priority':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.priority}
                              </TableCell>
                            )
                          case 'external_id':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.external_id}
                              </TableCell>
                            )
                          case 'trade':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                <div style={{ display: 'inline' }}>
                                  {row.category}
                                </div>
                              </TableCell>
                            )
                          case 'service':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                <Typography
                                  classes={{ root: classes.services }}
                                >
                                  {row.services
                                    ?.map(item => item.name)
                                    .join(',')}
                                </Typography>
                              </TableCell>
                            )
                          case 'won':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.customer_po ?? row.external_id}
                              </TableCell>
                            )
                          case 'opendate':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.open_date
                                  ? moment(
                                    new Date(row.open_date * 1000)
                                  ).format('MM/DD/yyyy')
                                  : ''}
                              </TableCell>
                            )
                          case 'duedate':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.open_date
                                  ? moment(
                                    new Date(row.expiration_date * 1000)
                                  ).format('MM/DD/yyyy')
                                  : ''}
                              </TableCell>
                            )
                          case 'wostat':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                classes={{ root: classes.tableCell }}
                              >
                                {row.status
                                  ? (
                                  <PointIcon
                                    className={classes[getWOstatus(row)]}
                                  />
                                    )
                                  : (
                                  <PointIcon className={classes.noIcon} />
                                    )}
                                <div style={{ display: 'inline' }}>
                                  {row.status
                                    ? t(
                                        `work_orders.wo_states.${getWOstatus(
                                          row
                                        )}`
                                    )
                                    : t('work_orders.wo_states.no_status')}
                                </div>
                              </TableCell>
                            )
                          case 'invoices':
                            return (
                              <TableCell
                                key={column.id + index}
                                align="left"
                                className={`${classes.tableCell} ${
                                  row.invoice
                                    ? classes[
                                        row.invoice.status === 'open'
                                          ? 'invoice_open'
                                          : row.invoice.status
                                      ]
                                    : classes.not_available
                                }`}
                              >
                                {row.invoice
                                  ? t(
                                      `invoices.in_states.${row.invoice.status}`
                                  )
                                  : t('invoices.in_states.not_available')}
                              </TableCell>
                            )
                          default:
                            return null
                        }
                      })}
                      {<TableCell padding="checkbox" size="small" />}
                    </TableRow>
                  )
                })}
                {content.length > 0 && loading && progressRow(columns, 1)}
              </TableBody>
                )
              : loading
                ? (
                    progressComponent(columns)
                  )
                : (
                    emptyComponent()
                  )}
          </Table>
        </TableContainer>
      </TableContainer>
    </div>
  )
}
export const MainTable = props => {
  const {
    content,
    openAdvanced,
    setOpenAdvanced,
    selected,
    setSelected,
    loading,
    hasMore,
    setTablePage,
    filters,
    setFilters,
    validateFilters,
    setSearchEnabled
  } = props

  return (
    <div>
      <EnhancedTable
        chips={props.chips}
        content={content}
        openAdvanced={openAdvanced}
        setOpenAdvanced={setOpenAdvanced}
        selected={selected}
        setSelected={setSelected}
        loading={loading}
        hasMore={hasMore}
        setTablePage={setTablePage}
        filters={filters}
        setFilters={setFilters}
        validateFilters={validateFilters}
        setSearchEnabled={setSearchEnabled}
      />
    </div>
  )
}

function numberWithCommas (x) {
  if (!x) return '0'
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function getWindowHeight () {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize () {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size[1]
}
