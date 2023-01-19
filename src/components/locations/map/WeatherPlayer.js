import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Fade, Grid, IconButton, Paper, Slide, Slider, Typography } from '@mui/material'
import moment from 'moment'
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Pause, PlayArrow, Repeat } from '@mui/icons-material'
import { SelectRadiosNoBorder } from '../inputs/SelectRadiosNoBorder'
import { AFStateOptions } from '../../../lib/Constants'
import { getCapabilities } from '../../../services/RadarApiService'
import { xml2json } from 'xml-js'

/** Styles **/
import { weatherPlayerStyles } from '../../../styles/classes/LocationsClasses'

export const WeatherPlayer = (props) => {
  const classes = weatherPlayerStyles()
  const { t } = useTranslation()
  const [AFState, setAFState] = useState(10)
  const [liveTime, setLiveTime] = useState(moment().format('HH:mm A'))
  const [sliderValue, setSliderValue] = useState(0)
  const [repeat, setRepeat] = useState(false)
  const [marks, setMarks] = useState([])
  const [playerHidden, setPlayerHidden] = useState(false)

  const playerSteps = [0, 17, 34, 50, 67, 83, 100]
  const currentPlayerStepIndex = useRef(0)
  const interval = useRef(null)
  const repeatRef = useRef(false)

  const initialTime = useRef(null)
  const availableTimes = useRef(null)
  const availableTimesAlaska = useRef(null)

  const handleAFChange = (event) => {
    setAFState(event.target.value)
    clearInterval(interval.current)
    interval.current = setInterval(() => {
      stepForward()
    }, (Math.round(10000 / event.target.value)))
  }

  useEffect(() => {
    const liveinterval = setInterval(() => {
      setLiveTime(moment().format('hh:mm A'))
    }, 500)
    return () => { clearInterval(liveinterval) }
  }, [liveTime])

  useEffect(() => {
    clearInterval(interval.current)
    currentPlayerStepIndex.current = -1
    props.setPlay(false)

    switch (props.weather) {
      case 'radar':

        Promise.all([
          getCapabilities('conus', 'conus_bref_qcd'),
          getCapabilities('alaska', 'alaska_bref_qcd')
        ]).then(response => {
          const jsonResult = xml2json(response[0], { compact: true })
          availableTimes.current = JSON.parse(jsonResult)?.WMT_MS_Capabilities?.Capability?.Layer?.Layer?.Extent?._text

          const jsonResultAlaska = xml2json(response[1], { compact: true })
          availableTimesAlaska.current = JSON.parse(jsonResultAlaska)?.WMT_MS_Capabilities?.Capability?.Layer?.Layer?.Extent?._text
          availableTimesAlaska.current = availableTimesAlaska.current.split(',')

          if (availableTimes.current) {
            availableTimes.current = availableTimes.current.split(',')

            const step = Math.round(availableTimes.current.length / 6)

            setMarks([
              {
                value: 0,
                label: moment(availableTimes.current[0]).format('hh:mm A')
              },
              {
                value: 17,
                label: moment(availableTimes.current[(step * 1)]).format('hh:mm A')
              },
              {
                value: 34,
                label: moment(availableTimes.current[(step * 2)]).format('hh:mm A')
              },
              {
                value: 50,
                label: moment(availableTimes.current[(step * 3)]).format('hh:mm A')
              },
              {
                value: 67,
                label: moment(availableTimes.current[(step * 4)]).format('hh:mm A')
              },
              {
                value: 83,
                label: moment(availableTimes.current[(step * 5)]).format('hh:mm A')
              },
              {
                value: 100,
                label: moment(availableTimes.current[availableTimes.current.length - 1]).format('hh:mm A')
              }
            ])
            currentPlayerStepIndex.current = -1
            stepForward()
          }
        }).catch(e => {
          console.log(e)
        })

        break
      case 'weather':
        initialTime.current = moment()

        if (initialTime.current.format('mm') >= 30) {
          initialTime.current = initialTime.current.add(1, 'hour')
        }

        setMarks([
          {
            value: 0,
            label: t('locations.map.weather_player.now')
          },
          {
            value: 17,
            label: moment(initialTime.current).add(1, 'hour').format('hh:00 A')
          },
          {
            value: 34,
            label: moment(initialTime.current).add(2, 'hour').format('hh:00 A')
          },
          {
            value: 50,
            label: moment(initialTime.current).add(3, 'hour').format('hh:00 A')
          },
          {
            value: 67,
            label: moment(initialTime.current).add(4, 'hour').format('hh:00 A')
          },
          {
            value: 83,
            label: moment(initialTime.current).add(5, 'hour').format('hh:00 A')
          },
          {
            value: 100,
            label: moment(initialTime.current).add(6, 'hour').format('hh:00 A')
          }
        ])
        currentPlayerStepIndex.current = -1
        stepForward()
        break
      case 'temperature':
        initialTime.current = moment()

        if (initialTime.current.format('mm') >= 30) {
          initialTime.current = initialTime.current.add(1, 'hour')
        }
        currentPlayerStepIndex.current = -1
        stepForward()
        break
    }
  }, [props.weather])

  const stepForward = () => {
    currentPlayerStepIndex.current += 1
    setSliderValue(playerSteps[currentPlayerStepIndex.current])
    onSliderChange(null, playerSteps[currentPlayerStepIndex.current])

    if (currentPlayerStepIndex.current === playerSteps.length - 1) {
      if (repeatRef.current) {
        currentPlayerStepIndex.current = -1
      } else {
        clearInterval(interval.current)
        currentPlayerStepIndex.current = -1
        props.setPlay(false)
      }
    }
  }

  const onPlayPause = (event) => {
    props.setPlay(prevState => !prevState)
    if (!props.play === false) {
      clearInterval(interval.current)
    } else {
      stepForward()
      interval.current = setInterval(() => {
        stepForward()
      }, (Math.round(10000 / AFState)))
    }
  }

  const onRepeat = (event) => {
    setRepeat(prevState => !prevState)
    repeatRef.current = !repeatRef.current
  }

  const onSliderChange = (event, value) => {
    currentPlayerStepIndex.current = playerSteps.indexOf(value)
    setSliderValue(value)
    let conusPreload = []
    let alaskaPreload = []

    switch (props.weather) {
      case 'radar':

        // eslint-disable-next-line no-case-declarations
        const step = Math.round(availableTimes.current.length / 6)
        // eslint-disable-next-line no-case-declarations
        const stepAlaska = Math.round(availableTimesAlaska.current.length / 6)

        switch (value) {
          case 0:
            props.setQueryTime({ conus: availableTimes.current[2], alaska: availableTimesAlaska.current[2] })
            break
          case 17:
            props.setQueryTime({ conus: availableTimes.current[step], alaska: availableTimesAlaska.current[stepAlaska] })
            break
          case 34:
            props.setQueryTime({ conus: availableTimes.current[step * 2], alaska: availableTimesAlaska.current[stepAlaska * 2] })
            break
          case 50:
            props.setQueryTime({ conus: availableTimes.current[step * 3], alaska: availableTimesAlaska.current[stepAlaska * 3] })
            break
          case 67:
            props.setQueryTime({ conus: availableTimes.current[step * 4], alaska: availableTimesAlaska.current[stepAlaska * 4] })
            break
          case 83:
            props.setQueryTime({ conus: availableTimes.current[step * 5], alaska: availableTimesAlaska.current[stepAlaska * 5] })
            break
          case 100:
            props.setQueryTime({ conus: availableTimes.current[availableTimes.current.length - 1], alaska: availableTimesAlaska.current[availableTimesAlaska.current.length - 1] })
        }
        break
      case 'weather':
        conusPreload = [
          moment(initialTime.current).utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(1, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(2, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(3, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(4, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(5, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          moment(initialTime.current).add(6, 'hour').utcOffset('+0000').format('YYYY-MM-DDTHH:00')
        ]

        alaskaPreload = [
          getAlaskaQueryTime(moment(initialTime.current).utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(1, 'hour').utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(2, 'hour').utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(3, 'hour').utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(4, 'hour').utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(5, 'hour').utcOffset('+0000')),
          getAlaskaQueryTime(moment(initialTime.current).add(6, 'hour').utcOffset('+0000'))
        ]

        switch (value) {
          case 0:
            props.setQueryTime({
              conus: conusPreload[0],
              conusPreload: conusPreload,
              alaska: alaskaPreload[0],
              alaskaPreload: alaskaPreload
            })
            break
          case 17:
            props.setQueryTime({
              conus: conusPreload[1],
              conusPreload: conusPreload,
              alaska: alaskaPreload[1],
              alaskaPreload: alaskaPreload
            })
            break
          case 34:
            props.setQueryTime({
              conus: conusPreload[2],
              conusPreload: conusPreload,
              alaska: alaskaPreload[2],
              alaskaPreload: alaskaPreload
            })
            break
          case 50:
            props.setQueryTime({
              conus: conusPreload[3],
              conusPreload: conusPreload,
              alaska: alaskaPreload[3],
              alaskaPreload: alaskaPreload
            })
            break
          case 67:
            props.setQueryTime({
              conus: conusPreload[4],
              conusPreload: conusPreload,
              alaska: alaskaPreload[4],
              alaskaPreload: alaskaPreload
            })
            break
          case 83:
            props.setQueryTime({
              conus: conusPreload[5],
              conusPreload: conusPreload,
              alaska: alaskaPreload[5],
              alaskaPreload: alaskaPreload
            })
            break
          case 100:
            props.setQueryTime({
              conus: conusPreload[6],
              conusPreload: conusPreload,
              alaska: alaskaPreload[6],
              alaskaPreload: alaskaPreload
            })
            break
        }
        if (value === 0) {
          props.setForceReloadOverlay(new Date().getTime())
        }
        break
      case 'temperature':
        props.setQueryTime({
          conus: moment(initialTime.current).utcOffset('+0000').format('YYYY-MM-DDTHH:00'),
          alaska: getAlaskaQueryTime(moment(initialTime.current).utcOffset('+0000'))
        })
        if (value === 0) {
          props.setForceReloadOverlay(new Date().getTime())
        }
        break
    }
  }

  const getAlaskaQueryTime = (baseDate) => {
    const hour = baseDate.format('HH')

    if (['19', '20', '21'].includes(hour)) {
      return moment(baseDate).add(1, 'day').format('YYYY-MM-DDT00:00')
    }
    if (['22', '23', '00'].includes(hour)) {
      return moment(baseDate).add(1, 'day').format('YYYY-MM-DDT03:00')
    }
    if (['01', '02', '03'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT06:00')
    }
    if (['04', '05', '06'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT09:00')
    }
    if (['07', '08', '09'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT12:00')
    }
    if (['10', '11', '12'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT15:00')
    }
    if (['13', '14', '15'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT18:00')
    }
    if (['16', '17', '18'].includes(hour)) {
      return moment(baseDate).format('YYYY-MM-DDT21:00')
    }
  }

  const onHidePlayer = () => {
    setPlayerHidden(prevState => !prevState)
  }

  const containerRef = React.useRef(null)

  return (
    <Box hidden={props.hidden}>
      <Fade className={classes.playerContainerMinimized} timeout={2000} in={playerHidden} container={containerRef.current}>
        <Box className={classes.mapWeatherPlayerBoxMinimized}>
          <Paper>
            <Box p={1}>
              <Box pl={1}>
                <Grid container spacing={2} justifyContent={'space-between'}>
                  <Grid item>
                    <Typography component={'span'} className={classes.font12}>
                      {t(`locations.map.weather_player.${props.weather}_menu`)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={onHidePlayer} className={classes.playerHideContainer}>
                      <KeyboardArrowUpOutlined className={classes.playerHide}/>
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>

      <Slide className={classes.playerContainer} direction="up" timeout={1000} in={!playerHidden} container={containerRef.current}>
        <Paper>
          <Box p={1}>
            <Box pl={1}>
              <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                  <Typography component={'span'} className={classes.font12}>
                    {t('locations.map.weather_player.time')}: {liveTime}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={onHidePlayer} className={classes.playerHideContainer}>
                    <KeyboardArrowDownOutlined className={classes.playerHide}/>
                  </IconButton>
                </Grid>
              </Grid>
            </Box>

            <Box pl={1}>
              <Grid container spacing={2}>
                <Grid item>
                  <IconButton
                    onClick={onPlayPause}
                    className={classes.playerButtonsContainer}>
                    {props.play ? (<Pause className={classes.playerButtons}/>) : (<PlayArrow className={classes.playerButtons}/>)}
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={onRepeat}
                    className={classes.playerButtonsContainer}>
                    <Repeat className={classes.playerButtons} color={repeat ? 'primary' : 'inherit'}/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <SelectRadiosNoBorder handleChange={handleAFChange} dataDefault={10} dataElement={'AF'} dataItems={AFStateOptions} selectedOption={AFState}
                                        setSelectedOption={setAFState}/>
                </Grid>
              </Grid>
            </Box>
            <Box pl={2} pr={2} pt={1}>
              <Slider
                value={sliderValue}
                defaultValue={0}
                step={null}
                valueLabelDisplay="off"
                marks={marks}
                onChange={onSliderChange}
                classes={{
                  mark: classes.playerSliderMark,
                  rail: classes.playerSliderRail,
                  thumb: classes.playerSliderThumb,
                  markLabel: classes.playerSliderLabels,
                  track: classes.playerSliderTrack
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Slide>
    </Box>
  )
}
