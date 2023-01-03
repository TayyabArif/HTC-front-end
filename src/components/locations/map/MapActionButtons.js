import React, { useEffect, useRef, useState } from 'react'
import { degrees2meters } from '../../../lib/Global'
import ReactGA from 'react-ga4'

/** Material UI **/
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { ThunderstormOutlined, LayersOutlined, Menu as MenuIcon, FilterAltOutlined, Check as CheckIcon, LocationSearchingOutlined } from '@mui/icons-material'
import { mapStylesGray, mapStylesLight } from '../../../styles/mui_custom_theme'

/** Components **/
import { MapButton } from '../../../styles/mui_custom_components'
import { useTranslation } from 'react-i18next'
import { LocationInfoCard } from './LocationInfoCard'

/** Redux **/
import { useSelector } from 'react-redux'

// Styles
import { mapActionButtonsStyles } from '../../../styles/classes/LocationsClasses'
import { MapFilters } from './MapFilters'

export const MapActionButtons = (props) => {
  const classes = mapActionButtonsStyles()
  const locationsStore = useSelector((state) => state.locations)
  const [anchorMOEl, setAnchorMOEl] = useState(null)
  const isMenuMapOptionsOpen = Boolean(anchorMOEl)
  const [anchorWEl, setAnchorWEl] = useState(null)
  const isMenuWeatherOpen = Boolean(anchorWEl)
  const [anchorFilters, setAnchorFilters] = useState(null)
  const isMenuFiltersOpen = Boolean(anchorFilters)
  const { t } = useTranslation()
  const mapInstance = props.map

  const handleMapOptionsMenuOpen = (event) => {
    setAnchorMOEl(event.currentTarget)
  }
  const handleMenuMapOptionsClose = () => {
    setAnchorMOEl(null)
  }

  const handleFiltersOpen = (event) => {
    setAnchorFilters(event.currentTarget)
  }
  const handleFiltersClose = (event) => {
    setAnchorFilters(null)
  }

  const handleClickMapOption = (e) => {
    props.setMapType(e.currentTarget.dataset.mapType)

    switch (e.currentTarget.dataset.mapType) {
      case 'light':
        props.setMapStylesState(mapStylesLight)
        break
      default:
        props.setMapStylesState(mapStylesGray)
        break
    }

    ReactGA.event({
      category: 'change',
      action: `change_map_type_to_${e.currentTarget.dataset.mapType}`
    })
  }

  const handleWeatherMenuOpen = (event) => {
    setAnchorWEl(event.currentTarget)
  }

  const handleMenuWeatherClose = () => {
    setAnchorWEl(null)
  }

  const showLoadingSpinner = () => {
    if (!props.play) {
      props.setLoading(true)
    }
  }

  const flagConus = useRef(0)
  const flagAlaska = useRef(0)

  const conusSupIzqLng = -15113740.7288
  const conusSupIzqLat = 6770486.2174
  const conusInfDerLng = -6127192.1873
  const conusInfDerLat = 2353037.4787

  const alaskaSupIzqLng = -19440688.0259
  const alaskaSupIzqLat = 12376683.6199
  const alaskaInfDerLng = -13531188.4952
  const alaskaInfDerLat = 6300857.1156

  const getCoordinatesInMeters = (tile, zoom, tileSize = 512) => {
    // first convert tile coordinates to pixel coordinates for NW and SE corners of tile
    const nwPixelX = tile.x * tileSize
    const nwPixelY = tile.y * tileSize
    const sePixelX = (tile.x + 1) * tileSize - 1
    const sePixelY = (tile.y + 1) * tileSize - 1

    // next convert pixel coordinates to world coordinates
    const nwWorldX = nwPixelX / (Math.pow(2, zoom))
    const nwWorldY = nwPixelY / (Math.pow(2, zoom))
    const seWorldX = sePixelX / (Math.pow(2, zoom))
    const seWorldY = sePixelY / (Math.pow(2, zoom))
    const xySupIzq = new window.google.maps.Point(nwWorldX, nwWorldY)
    const xyInfDer = new window.google.maps.Point(seWorldX, seWorldY)

    // convert google maps points to lat lng
    const geoSupIzq = mapInstance.getProjection().fromPointToLatLng(xySupIzq)
    const geoInfDer = mapInstance.getProjection().fromPointToLatLng(xyInfDer)

    // convert lat lng to meters
    const geoSupIzqMeters = degrees2meters(geoSupIzq.lng(), geoSupIzq.lat())
    const geoInfDerMeters = degrees2meters(geoInfDer.lng(), geoInfDer.lat())

    return {
      geoSupIzqMeters,
      geoInfDerMeters
    }
  }

  const preloadWeatherConus = (index) => {
    const imageMapTypeWeatherPreload = new window.google.maps.ImageMapType({
      getTileUrl: function (tile, zoom) {
        const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom)

        if (((geoSupIzqMeters[0] > conusSupIzqLng && geoSupIzqMeters[0] < conusInfDerLng) || (geoSupIzqMeters[1] < conusSupIzqLat && geoSupIzqMeters[1] > conusInfDerLat)) ||
          ((geoInfDerMeters[0] > conusSupIzqLng && geoInfDerMeters[0] < conusInfDerLng) || (geoInfDerMeters[1] < conusSupIzqLat && geoInfDerMeters[1] > conusInfDerLat))) {
          const params = [
            'wms.php?service=WMS',
            'version=1.3.0',
            'request=GetMap',
            'transparent=true',
            'format=image/png',
            'width=512',
            'height=512',
            'srs=EPSG:3857',
            'layers=ndfd.conus.wx',
            'crs=EPSG:3857',
            `vt=${props.queryTime.conusPreload[index]}`,
            `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
          ]

          return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
        }
      },
      tileSize: new window.google.maps.Size(512, 512),
      opacity: 0
    })

    mapInstance.overlayMapTypes.setAt(5, imageMapTypeWeatherPreload)
    imageMapTypeWeatherPreload.addListener('tilesloaded', () => {
      if (index < props.queryTime?.conusPreload?.length - 1) {
        preloadWeatherConus(index + 1)
      }
    })
  }

  const preloadWeatherAlaska = (index) => {
    const imageMapTypeAlaskaWeatherPreload = new window.google.maps.ImageMapType({
      getTileUrl: function (tile, zoom) {
        const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom)

        if (((geoSupIzqMeters[0] > alaskaSupIzqLng && geoSupIzqMeters[0] < alaskaInfDerLng) || (geoSupIzqMeters[1] < alaskaSupIzqLat && geoSupIzqMeters[1] > alaskaInfDerLat)) ||
          ((geoInfDerMeters[0] > alaskaSupIzqLng && geoInfDerMeters[0] < alaskaInfDerLng) || (geoInfDerMeters[1] < alaskaSupIzqLat && geoInfDerMeters[1] > alaskaInfDerLat))) {
          const params = [
            'wms.php?service=WMS',
            'version=1.3.0',
            'request=GetMap',
            'transparent=true',
            'format=image/png',
            'width=512',
            'height=512',
            'srs=EPSG:3857',
            'layers=ndfd.alaska.wx',
            'crs=EPSG:3857',
            `vt=${props.queryTime.alaskaPreload[index]}`,
            `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
          ]

          return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
        }
      },
      tileSize: new window.google.maps.Size(512, 512),
      opacity: 0
    })

    mapInstance.overlayMapTypes.setAt(6, imageMapTypeAlaskaWeatherPreload)
    imageMapTypeAlaskaWeatherPreload.addListener('tilesloaded', () => {
      if (index < props.queryTime?.alaskaPreload?.length - 1) {
        preloadWeatherAlaska(index + 1)
      }
    })
  }

  const overlayLogic = (layerType) => {
    flagAlaska.current = 0
    flagConus.current = 0
    showLoadingSpinner()

    switch (layerType) {
      case 'off':
        mapInstance.overlayMapTypes.clear()
        props.setLoading(false)
        break
      case 'radar':
        // eslint-disable-next-line no-case-declarations
        const imageMapTypeRadar = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom, 256)

            if ((geoSupIzqMeters[0] > conusSupIzqLng && geoSupIzqMeters[0] < conusInfDerLng && geoSupIzqMeters[1] < conusSupIzqLat && geoSupIzqMeters[1] > conusInfDerLat) ||
              (geoInfDerMeters[0] > conusSupIzqLng && geoInfDerMeters[0] < conusInfDerLng && geoInfDerMeters[1] < conusSupIzqLat && geoInfDerMeters[1] > conusInfDerLat)) {
              const params = [
                'service=WMS',
                'version=1.1.1',
                'request=GetMap',
                'transparent=true',
                'tiled=true',
                'format=image/png',
                'width=256',
                'height=256',
                'srs=EPSG:3857',
                'layers=conus_bref_qcd',
                `time=${props.queryTime?.conus}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]
              flagConus.current = 1
              showLoadingSpinner()

              return `${process.env.REACT_APP_MAP_RADAR_SERVICE}/conus/conus_bref_qcd/ows?${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(256, 256),
          opacity: 0.8
        })

        // eslint-disable-next-line no-case-declarations
        const imageMapTypeRadarAlaska = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom, 256)

            if ((geoSupIzqMeters[0] > alaskaSupIzqLng && geoSupIzqMeters[0] < alaskaInfDerLng && geoSupIzqMeters[1] < alaskaSupIzqLat && geoSupIzqMeters[1] > alaskaInfDerLat) ||
              (geoInfDerMeters[0] > alaskaSupIzqLng && geoInfDerMeters[0] < alaskaInfDerLng && geoInfDerMeters[1] < alaskaSupIzqLat && geoInfDerMeters[1] > alaskaInfDerLat)) {
              const params = [
                'service=WMS',
                'version=1.1.1',
                'request=GetMap',
                'transparent=true',
                'tiled=true',
                'format=image/png',
                'width=256',
                'height=256',
                'srs=EPSG:3857',
                'layers=alaska_bref_qcd',
                `time=${props.queryTime?.alaska}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]
              flagAlaska.current = 1
              showLoadingSpinner()

              return `${process.env.REACT_APP_MAP_RADAR_SERVICE}/alaska/alaska_bref_qcd/ows?${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(256, 256),
          opacity: 0.8
        })

        if (!mapInstance.overlayMapTypes.getAt(2)) {
          // eslint-disable-next-line no-case-declarations
          const labelTilesRadar = {
            getTileUrl: function (coord, zoom) {
              return `${process.env.REACT_APP_MAP_ROADS}/v=apt.116&hl=en-US&z=${zoom}&x=${coord.x}&y=${coord.y}&client=api`
            },
            tileSize: new window.google.maps.Size(256, 256),
            isPng: true
          }

          // eslint-disable-next-line no-case-declarations
          const googleLabelLayerRadar = new window.google.maps.ImageMapType(labelTilesRadar)
          mapInstance.overlayMapTypes.setAt(2, googleLabelLayerRadar)
        }

        mapInstance.overlayMapTypes.setAt(1, imageMapTypeRadarAlaska)
        mapInstance.overlayMapTypes.setAt(0, imageMapTypeRadar)

        imageMapTypeRadar.addListener('tilesloaded', () => {
          flagConus.current = 0
          if (!flagAlaska.current) {
            props.setLoading(false)
          }
        })

        imageMapTypeRadarAlaska.addListener('tilesloaded', () => {
          flagAlaska.current = 0
          if (!flagConus.current) {
            props.setLoading(false)
          }
        })

        break
      case 'weather':
        // eslint-disable-next-line no-case-declarations
        const imageMapTypeWeather = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom)

            if (((geoSupIzqMeters[0] > conusSupIzqLng && geoSupIzqMeters[0] < conusInfDerLng) || (geoSupIzqMeters[1] < conusSupIzqLat && geoSupIzqMeters[1] > conusInfDerLat)) ||
              ((geoInfDerMeters[0] > conusSupIzqLng && geoInfDerMeters[0] < conusInfDerLng) || (geoInfDerMeters[1] < conusSupIzqLat && geoInfDerMeters[1] > conusInfDerLat))) {
              const params = [
                'wms.php?service=WMS',
                'version=1.3.0',
                'request=GetMap',
                'transparent=true',
                'format=image/png',
                'width=512',
                'height=512',
                'srs=EPSG:3857',
                'layers=ndfd.conus.wx',
                'crs=EPSG:3857',
                `vt=${props.queryTime?.conus}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]

              flagConus.current = 1
              showLoadingSpinner()

              return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(512, 512),
          opacity: 0.8
        })

        if (props.queryTime?.conusPreload?.length) {
          preloadWeatherConus(0)
        }

        // eslint-disable-next-line no-case-declarations
        const imageMapTypeWeatherAlaska = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom)

            if (((geoSupIzqMeters[0] > alaskaSupIzqLng && geoSupIzqMeters[0] < alaskaInfDerLng) || (geoSupIzqMeters[1] < alaskaSupIzqLat && geoSupIzqMeters[1] > alaskaInfDerLat)) ||
              ((geoInfDerMeters[0] > alaskaSupIzqLng && geoInfDerMeters[0] < alaskaInfDerLng) || (geoInfDerMeters[1] < alaskaSupIzqLat && geoInfDerMeters[1] > alaskaInfDerLat))) {
              const params = [
                'wms.php?service=WMS',
                'version=1.3.0',
                'request=GetMap',
                'transparent=true',
                'format=image/png',
                'width=512',
                'height=512',
                'srs=EPSG:3857',
                'layers=ndfd.alaska.wx',
                'crs=EPSG:3857',
                `vt=${props.queryTime?.alaska}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]

              flagAlaska.current = 1
              showLoadingSpinner()

              return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(512, 512),
          opacity: 0.8
        })

        if (props.queryTime?.alaskaPreload?.length) {
          preloadWeatherAlaska(0)
        }

        if (!mapInstance.overlayMapTypes.getAt(2)) {
          // eslint-disable-next-line no-case-declarations
          const labelTilesWeather = {
            getTileUrl: function (coord, zoom) {
              return `${process.env.REACT_APP_MAP_ROADS}/v=apt.116&hl=en-US&z=${zoom}&x=${coord.x}&y=${coord.y}&client=api`
            },
            tileSize: new window.google.maps.Size(256, 256),
            isPng: true
          }

          // eslint-disable-next-line no-case-declarations
          const googleLabelLayerWeather = new window.google.maps.ImageMapType(labelTilesWeather)
          mapInstance.overlayMapTypes.setAt(2, googleLabelLayerWeather)
        }

        mapInstance.overlayMapTypes.setAt(0, imageMapTypeWeather)
        mapInstance.overlayMapTypes.setAt(1, imageMapTypeWeatherAlaska)

        imageMapTypeWeather.addListener('tilesloaded', () => {
          flagConus.current = 0
          props.setLoading(false)
        })

        imageMapTypeWeatherAlaska.addListener('tilesloaded', () => {
          flagAlaska.current = 0
          if (!flagConus.current) {
            props.setLoading(false)
          }
        })

        break
      case 'temperature':
        // eslint-disable-next-line no-case-declarations
        const imageMapTypeTemp = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const { geoSupIzqMeters, geoInfDerMeters } = getCoordinatesInMeters(tile, zoom)

            if (((geoSupIzqMeters[0] > conusSupIzqLng && geoSupIzqMeters[0] < conusInfDerLng) || (geoSupIzqMeters[1] < conusSupIzqLat && geoSupIzqMeters[1] > conusInfDerLat)) ||
              ((geoInfDerMeters[0] > conusSupIzqLng && geoInfDerMeters[0] < conusInfDerLng) || (geoInfDerMeters[1] < conusSupIzqLat && geoInfDerMeters[1] > conusInfDerLat))) {
              const params = [
                'wms.php?service=WMS',
                'version=1.3.0',
                'request=GetMap',
                'transparent=true',
                'format=image/png',
                'width=512',
                'height=512',
                'srs=EPSG:3857',
                'layers=ndfd.conus.t',
                'crs=EPSG:3857',
                'element=maxt',
                'region=conus',
                'dataset=ndfd',
                'season=summer',
                `vt=${props.queryTime?.alaska}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]
              flagConus.current = 1
              showLoadingSpinner()
              return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(512, 512),
          opacity: 0.8
        })

        // eslint-disable-next-line no-case-declarations
        const imageMapTypeTempAlaska = new window.google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            const tileSize = 512

            // first convert tile coordinates to pixel coordinates for NW and SE corners of tile
            const nwPixelX = tile.x * tileSize
            const nwPixelY = tile.y * tileSize
            const sePixelX = (tile.x + 1) * tileSize - 1
            const sePixelY = (tile.y + 1) * tileSize - 1

            // next convert pixel coordinates to world coordinates
            const nwWorldX = nwPixelX / (Math.pow(2, zoom))
            const nwWorldY = nwPixelY / (Math.pow(2, zoom))
            const seWorldX = sePixelX / (Math.pow(2, zoom))
            const seWorldY = sePixelY / (Math.pow(2, zoom))
            const xySupIzq = new window.google.maps.Point(nwWorldX, nwWorldY)
            const xyInfDer = new window.google.maps.Point(seWorldX, seWorldY)

            // convert google maps points to lat lng
            const geoSupIzq = mapInstance.getProjection().fromPointToLatLng(xySupIzq)
            const geoInfDer = mapInstance.getProjection().fromPointToLatLng(xyInfDer)

            // convert lat lng to meters
            const geoSupIzqMeters = degrees2meters(geoSupIzq.lng(), geoSupIzq.lat())
            const geoInfDerMeters = degrees2meters(geoInfDer.lng(), geoInfDer.lat())

            if (((geoSupIzqMeters[0] > alaskaSupIzqLng && geoSupIzqMeters[0] < alaskaInfDerLng) || (geoSupIzqMeters[1] < alaskaSupIzqLat && geoSupIzqMeters[1] > alaskaInfDerLat)) ||
              ((geoInfDerMeters[0] > alaskaSupIzqLng && geoInfDerMeters[0] < alaskaInfDerLng) || (geoInfDerMeters[1] < alaskaSupIzqLat && geoInfDerMeters[1] > alaskaInfDerLat))) {
              const params = [
                'wms.php?service=WMS',
                'version=1.3.0',
                'request=GetMap',
                'transparent=true',
                'format=image/png',
                'width=512',
                'height=512',
                'srs=EPSG:3857',
                'layers=ndfd.alaska.t',
                'crs=EPSG:3857',
                'element=maxt',
                'region=alaska',
                'dataset=ndfd',
                'season=summer',
                `vt=${props.queryTime?.alaska}`,
                `bbox=${geoSupIzqMeters[0]},${geoInfDerMeters[1]},${geoInfDerMeters[0]},${geoSupIzqMeters[1]}`
              ]
              flagAlaska.current = 1
              showLoadingSpinner()
              return `${process.env.REACT_APP_MAP_WEATHER_SERVICE}/${params.join('&')}`
            }
          },
          tileSize: new window.google.maps.Size(512, 512),
          opacity: 0.8
        })

        if (!mapInstance.overlayMapTypes.getAt(2)) {
          // eslint-disable-next-line no-case-declarations
          const labelTilesTemp = {
            getTileUrl: function (coord, zoom) {
              return `${process.env.REACT_APP_MAP_ROADS}/v=apt.116&hl=en-US&z=${zoom}&x=${coord.x}&y=${coord.y}&client=api`
            },
            tileSize: new window.google.maps.Size(256, 256),
            isPng: true
          }

          // eslint-disable-next-line no-case-declarations
          const googleLabelLayerTemp = new window.google.maps.ImageMapType(labelTilesTemp)
          mapInstance.overlayMapTypes.setAt(2, googleLabelLayerTemp)
        }

        mapInstance.overlayMapTypes.setAt(0, imageMapTypeTemp)
        mapInstance.overlayMapTypes.setAt(1, imageMapTypeTempAlaska)

        imageMapTypeTemp.addListener('tilesloaded', () => {
          flagConus.current = 0
          props.setLoading(false)
        })

        imageMapTypeTempAlaska.addListener('tilesloaded', () => {
          flagAlaska.current = 0
          if (!flagConus.current) {
            props.setLoading(false)
          }
        })

        break
    }
  }

  useEffect(() => {
    if (props.queryTime) {
      overlayLogic(props.weather)
    }
  }, [props.queryTime, props.forceReloadOverlay, props.weather])

  const handleClickWeather = (e) => {
    setAnchorWEl(null)
    props.setWeather(e.currentTarget.dataset.weather)
  }

  return (<div>
    <Box className={props.hideLeftSection && locationsStore.showSiteViewPanel ? classes.hiddenButtonsBoxSiteLevel : props.hideLeftSection && !locationsStore.showSiteViewPanel ? classes.hiddenButtonsBox : !props.hideLeftSection && locationsStore.showSiteViewPanel ? classes.mapButtonsBoxSiteLevel : classes.mapButtonsBox}>
      {props.hideLeftSection && <Box pb={2} pr={2}>
        <MapButton onClick={props.handlerSearchBtnClick}>
          <MenuIcon color={props.hideLeftSection ? 'inherit' : 'primary'} />
        </MapButton>
      </Box>}
      <Box hidden={locationsStore.showSiteViewPanel} pb={2} pr={2}>
        <MapButton onClick={handleFiltersOpen}>
          <FilterAltOutlined color={'inherit'} />
        </MapButton>
        <MapFilters
          isMenuFiltersOpen={isMenuFiltersOpen}
          handleFiltersClose={handleFiltersClose}
          anchorFilters={anchorFilters}
          dateRange={props.dateRange}
          setDateRange={props.setDateRange}
        />
      </Box>
      <Box pb={2} pr={2}>
        <MapButton onClick={handleWeatherMenuOpen}>
          <ThunderstormOutlined />
        </MapButton>
        <Menu
          open={isMenuWeatherOpen}
          onClose={handleMenuWeatherClose}
          anchorEl={anchorWEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          className={classes.dropdowns}
        >
          <MenuItem className={classes.menuItem}><Typography className={classes.menuTitle}>{t('locations.map.action_buttons.weather')}</Typography></MenuItem>
          <MenuItem key={'radar'} data-weather={'radar'} onClick={handleClickWeather} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.action_buttons.radar')}
            </Typography>
            {props.weather === 'radar' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
          <MenuItem key={'weather'} data-weather={'weather'} onClick={handleClickWeather} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.action_buttons.weather')}
            </Typography>
            {props.weather === 'weather' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
          <MenuItem key={'temperature'} data-weather={'temperature'} onClick={handleClickWeather} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.action_buttons.temperature')}
            </Typography>
            {props.weather === 'temperature' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
          <MenuItem key={'off'} data-weather={'off'} onClick={handleClickWeather} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.action_buttons.off')}
            </Typography>
            {props.weather === 'off' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
        </Menu>
      </Box>

      <Box pb={2} pr={2}>
        <MapButton onClick={handleMapOptionsMenuOpen}>
          <LayersOutlined />
        </MapButton>

        <Menu
          open={isMenuMapOptionsOpen}
          onClose={handleMenuMapOptionsClose}
          anchorEl={anchorMOEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          className={classes.dropdowns}
        >
          <MenuItem className={classes.menuItem}><Typography className={classes.menuTitle}>{t('locations.map.map_options')}</Typography></MenuItem>
          <MenuItem key={'light'} data-map-type={'light'} onClick={handleClickMapOption} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.light')}
            </Typography>
            {props.mapType === 'light' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
          <MenuItem key={'roadmap'} data-map-type={'roadmap'} onClick={handleClickMapOption} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.gray_scale')}
            </Typography>
            {props.mapType === 'roadmap' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
          <MenuItem key={'satellite'} data-map-type={'satellite'} onClick={handleClickMapOption} className={classes.menuItem}>
            <Typography className={classes.menuLabel}>
              {t('locations.map.satellite')}
            </Typography>
            {props.mapType === 'satellite' && <CheckIcon className={classes.checkIcon} />}
          </MenuItem>
        </Menu>
      </Box>
      <Box hidden={!locationsStore.showSiteViewPanel} pb={2} pr={2}>
        <MapButton onClick={() => null}>
          <LocationSearchingOutlined color={'inherit'} />
        </MapButton>
      </Box>
    </Box>
    <LocationInfoCard />
  </div>
  )
}
