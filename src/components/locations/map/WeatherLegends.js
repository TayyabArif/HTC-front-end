import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Material UI **/
import { Box, Fade, Grid, Grow, IconButton, Paper, Typography, useTheme } from '@mui/material'
import { FullscreenExitOutlined, FullscreenOutlined } from '@mui/icons-material'

/** Styles **/
import { weatherLegendsStyles } from '../../../styles/classes/LocationsClasses'

/** Utils **/
import { useWindowWidth } from '@react-hook/window-size'
import { mobileBreakpoint, isSafari, isChrome } from '../../../lib/Constants'

export const WeatherLegends = (props) => {
  const classes = weatherLegendsStyles()
  const actualWidth = useWindowWidth()
  const theme = useTheme()
  const { t } = useTranslation()
  const [legendsHidden, setLegendsHidden] = useState(false)
  const containerRef = React.useRef(null)

  useEffect(() => {
    if (actualWidth > mobileBreakpoint) {
      setLegendsHidden(false)
    } else {
      setLegendsHidden(true)
    }
  }, [])

  const onHideLegends = () => {
    setLegendsHidden(prevState => !prevState)
  }

  return (
    <Box hidden={props.hidden}>
      <Fade className={isSafari && !isChrome() ? classes.legendsContainerMinimizedIos : classes.legendsContainerMinimized} timeout={2000} in={legendsHidden} container={containerRef.current}>
        <Paper className={classes.mapWeatherLegendsBoxMinimized}>
          <Box p={1}>
            <Box pl={1}>
              <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                  <Typography component={'span'} className={classes.font12}>
                    {t(`locations.map.action_buttons.${props.weather}`)}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={onHideLegends} className={classes.legendHideContainer}>
                    <FullscreenOutlined className={classes.legendHide}/>
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Fade>
      <Grow className={isSafari && !isChrome() ? classes.legendsContainerIos : classes.legendsContainer} timeout={1000} in={!legendsHidden} appear={false}>
        <Paper>
          <Box p={1}>
            <Box pl={1}>
              <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                  <Typography component={'span'} className={classes.font12}>
                    {t(`locations.map.action_buttons.${props.weather}`)}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={onHideLegends} className={classes.legendHideContainer}>
                    <FullscreenExitOutlined className={classes.legendHide}/>
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box hidden={props.weather !== 'temperature'} pl={2} pr={2} pb={2}>
            <Box display={'flex'}>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._1} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._2} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._3} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._4} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._5} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._6} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._7} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._8} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._9} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._10} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._11} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._12} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._13} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._14} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._15} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._16} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._17} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._18} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.temperature._19} className={`${classes.legendIndividualColorBox}`}> </Box>
            </Box>
            <Box display={'flex'}>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
            </Box>
            <Box display={'flex'}>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>-10 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>0 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>10 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>20 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>30 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>40 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>50 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>60 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>70 F</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
            </Box>
          </Box>
          <Box hidden={props.weather !== 'weather'} pl={2} pr={2} pb={2}>
            <Grid container justifyContent={'space-evenly'} spacing={2}>
              <Grid item xs={6}>
                <Typography className={classes.font8}>{t('locations.map.weather_labels.rain')}</Typography>
                <Box pt={1} display={'flex'}>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.rain_1} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.rain_2} className={`${classes.legendIndividualColorBox}`}> </Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'right'}>|</Typography></Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>{t('locations.map.weather_labels.possible')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'right'}>{t('locations.map.weather_labels.likely')}</Typography></Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.font8}>{t('locations.map.weather_labels.snow')}</Typography>
                <Box pt={1} display={'flex'}>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.snow_1} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.snow_2} className={`${classes.legendIndividualColorBox}`}> </Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'right'}>|</Typography></Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>{t('locations.map.weather_labels.possible')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'right'}>{t('locations.map.weather_labels.likely')}</Typography></Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.font8}>{t('locations.map.weather_labels.ice')}</Typography>
                <Box pt={1} display={'flex'}>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.ice_1} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.ice_2} className={`${classes.legendIndividualColorBox}`}> </Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'right'}>|</Typography></Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>{t('locations.map.weather_labels.possible')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'right'}>{t('locations.map.weather_labels.likely')}</Typography></Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.font8}>{t('locations.map.weather_labels.mix')}</Typography>
                <Box pt={1} display={'flex'}>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.mix_1} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.mix_2} className={`${classes.legendIndividualColorBox}`}> </Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'right'}>|</Typography></Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'left'}>{t('locations.map.weather_labels.possible')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'right'}>{t('locations.map.weather_labels.likely')}</Typography></Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box pt={1} display={'flex'}>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.blowing} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.fog} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.severe} className={`${classes.legendIndividualColorBox}`}> </Box>
                  <Box bgcolor={theme.colors.map.legendsColors.weather.other} className={`${classes.legendIndividualColorBox}`}> </Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>|</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>|</Typography></Box>
                </Box>
                <Box display={'flex'}>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>{t('locations.map.weather_labels.blowing')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'center'}>{t('locations.map.weather_labels.fog')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8} align={'center'}>{t('locations.map.weather_labels.severe')}</Typography></Box>
                  <Box className={`${classes.legendIndividualLabelBox}`}><Typography className={classes.font8}
                                                                                     align={'center'}>{t('locations.map.weather_labels.other')}</Typography></Box>
                </Box>
              </Grid>
            </Grid>

          </Box>
          <Box hidden={props.weather !== 'radar'} pl={2} pr={2} pb={2}>
            <Typography className={classes.font8}>{t('locations.map.weather_labels.reflectivity')}</Typography>
            <Box pt={1} display={'flex'}>
              <Box bgcolor={theme.colors.map.legendsColors.radar._1} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._2} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._3} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._4} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._5} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._6} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._7} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._8} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._9} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._10} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._11} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._12} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._13} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._14} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._15} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._16} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._17} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._18} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._19} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._20} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._21} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._22} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._23} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._24} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._25} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._26} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._27} className={`${classes.legendIndividualColorBox}`}> </Box>
              <Box bgcolor={theme.colors.map.legendsColors.radar._28} className={`${classes.legendIndividualColorBox}`}> </Box>
            </Box>
            <Box display={'flex'}>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>|</Box>
            </Box>
            <Box display={'flex'}>
              <Box className={`${classes.legendIndividualLabelBox}`}>nd</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>-30</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>-20</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>-10</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>0</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>10</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>20</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>30</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>40</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>50</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>60</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>70</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>80</Box>
              <Box className={`${classes.legendIndividualLabelBox}`}> </Box>
              <Box className={`${classes.legendIndividualLabelBox}`}>dBZ</Box>
            </Box>
          </Box>
        </Paper>
      </Grow>
    </Box>
  )
}
