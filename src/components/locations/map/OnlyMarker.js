import React from 'react'

/** Google maps **/
import { Marker } from '@react-google-maps/api'

/** Images **/
import selected from '../../../assets/images/clusters/selected.png'
import mLight from '../../../assets/images/clusters/mark_light_map.svg'

/** Redux **/
import { useDispatch, useSelector } from 'react-redux'
import { locationsActions } from '../../../store/locations'

export const OnlyMarker = (props) => {
  const locationsStore = useSelector((state) => state.locations)
  const dispatch = useDispatch()

  const handleClickLocation = (index, location) => {
    dispatch(locationsActions.setSelectedSite(props.site))
    dispatch(locationsActions.setActiveInfoWindow(props.index))
  }

  return (
    <Marker
      icon={(locationsStore.selectedSite?.id === props.index ? selected : mLight)}
      {...props}
      onClick={(event) => {
        handleClickLocation(props.index, props.site)
      }}
    >
    </Marker>
  )
}
