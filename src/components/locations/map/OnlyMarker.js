import React from 'react'

/** Google maps **/
import { Marker } from '@react-google-maps/api'

/** Images **/
import nonem23 from '../../../assets/images/clusters/nonem23.png'
import mLight from '../../../assets/images/clusters/mark_light_map.svg'
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
import { useSelector } from 'react-redux'

export const OnlyMarker = (props) => {
  const locationsStore = useSelector((state) => state.locations)

  const index = props.index
  const site = props.site

  const handleClickLocation = (index, location) => {
  }

  return (
    <Marker
      icon={ props.enableCluster
        ? (locationsStore.setActiveInfoWindow === index ? nonem23 : mLight)
        : (!site.work_order_status
            ? mLight
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
