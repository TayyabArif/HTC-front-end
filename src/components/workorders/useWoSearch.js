import { useEffect, useState } from 'react'
import { workOrdersPortal } from '../../services/ApiService'
import ReactGA from 'react-ga4'

export const useWoSearch = (
  showAll,
  search,
  clientName,
  site,
  trade,
  service,
  won,
  opendate,
  duedate,
  status,
  invoices,
  priority,
  clientTrackingNumber,
  ascSort,
  descSort,
  perPage,
  page,
  searchEnabled
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [workOrders, setWorkOrders] = useState([])
  const [chips, setChips] = useState({})
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    // timeout to avoid "no results" screen
    const timer = setTimeout(() => setWorkOrders([]), 50)
    return () => {
      clearTimeout(timer)
    }
  }, [
    showAll,
    search,
    clientName,
    site,
    trade,
    service,
    won,
    opendate,
    duedate,
    status,
    invoices,
    priority,
    clientTrackingNumber,
    ascSort,
    descSort
  ])

  useEffect(() => {
    ReactGA.event({
      category: 'search',
      action: 'search_work_orders'
    })
  }, [search])

  useEffect(() => {
    if (!searchEnabled) return
    setLoading(true)
    setError(false)
    const sort =
      ascSort || descSort
        ? ascSort
          ? ascSort + ''
          : descSort
            ? descSort + '_d'
            : ''
        : 'portal'
    workOrdersPortal(
      showAll,
      search,
      clientName,
      site,
      trade,
      service,
      won,
      opendate,
      duedate,
      status,
      invoices,
      priority,
      clientTrackingNumber,
      sort,
      perPage,
      page
    )
      .then(result => {
        let count = workOrders ? workOrders.length : 0
        if (result && result.status) {
          if (page === 1) {
            setWorkOrders(result.content.locations)
            count = result.content.locations.length
          } else {
            setWorkOrders([...workOrders, ...result.content.locations])
            count = result.content.locations.length + workOrders.length
          }
          setChips({
            totalCount: result.content.totalCount
          })
        }
        setHasMore(count < result.content.totalCount)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
        setError(true)
        return null
      })
  }, [
    showAll,
    search,
    clientName,
    site,
    trade,
    service,
    won,
    opendate,
    duedate,
    status,
    invoices,
    ascSort,
    descSort,
    perPage,
    page,
    searchEnabled
  ])
  return { loading, error, workOrders, chips, hasMore }
}
