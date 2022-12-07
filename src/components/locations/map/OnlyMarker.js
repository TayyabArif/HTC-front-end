import React from 'react'

/** Google maps **/
import { Marker } from '@react-google-maps/api'

/** Images **/
import nonem23 from '../../../assets/images/clusters/nonem23.png'
import m23 from '../../../assets/images/clusters/m23.png'
import mOpen from '../../../assets/images/clusters/open.png'
import mCompleted from '../../../assets/images/clusters/completed.png'
import mInProgress from '../../../assets/images/clusters/in_progress.png'
import mNoWorkOrder from '../../../assets/images/clusters/no_work_order.png'
import mReturning from '../../../assets/images/clusters/returning.png'
import mIncomplete from '../../../assets/images/clusters/incomplete.png'
import mDispatched from '../../../assets/images/clusters/dispatched.png'
import mCanceled from '../../../assets/images/clusters/cancelled.png'
import mNoService from '../../../assets/images/clusters/no_service.png'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'
import { filtersActions } from '../../../store/filters'

export const OnlyMarker = (props) => {
  const dispatch = useDispatch()
  const locationsStore = useSelector((state) => state.locations)

  const index = props.index
  const site = props.site

  const handleClickLocation = (index, location) => {
    dispatch(filtersActions.handleMobileDrawer(false))
    dispatch(locationsActions.setSelectedSite(location))
    dispatch(locationsActions.setActiveInfoWindow(index))
  }

  return (
    <Marker
      icon={ props.enableCluster
        ? (locationsStore.setActiveInfoWindow === index ? nonem23 : m23)
        : (!site.work_order_status
            ? m23
            : (site.work_order_status === 'Unknown'
                ? mNoWorkOrder
                : site.work_order_status === 'open'
                  ? mOpen
                  : site.work_order_status === 'completed'
                    ? mCompleted
                    : site.work_order_status === 'returning'
                      ? mReturning
                      : site.work_order_status === 'canceled'
                        ? mCanceled
                        : site.work_order_status === 'in_progress'
                          ? mInProgress
                          : site.work_order_status === 'incomplete'
                            ? mIncomplete
                            : site.work_order_status === 'dispatched'
                              ? mDispatched
                              : site.work_order_status.includes('no_service')
                                ? mNoService
                                : nonem23))
        }
      {...props}
      onClick={(event) => {
        handleClickLocation(index, site)
      }}
    >
    </Marker>
  )
}
