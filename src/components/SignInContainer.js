import React from 'react'
import BackgroundSlider from 'react-background-slider'

/** Redux **/
import { useSelector } from 'react-redux'

/** Material UI **/
import { Backdrop, Box, CircularProgress, CssBaseline, Grid, makeStyles, Typography } from '@material-ui/core'

/** Components **/
import { SignInHeader } from './SignInHeader'
import snow from '../assets/images/carousel/snow-plow.jpg'
import flowers from '../assets/images/carousel/flowers.jpg'
import garden from '../assets/images/carousel/garden.jpg'
import trees from '../assets/images/carousel/trees.jpg'
import water from '../assets/images/carousel/water.jpg'
import sidewalk from '../assets/images/carousel/sidewalk.jpg'

const pjson = require('../../package.json')

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.colors.backdropColor
  },
  leftImages: {
    height: '100%'
  },
  imageContainer: {
    overflow: 'hidden'
  },
  body: {
    height: 'calc(100% - 170px)',
    overflowY: 'auto',
    backgroundColor: theme.colors.backdropColor,
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none'
  },
  footer: {
    height: '40px',
    textAlign: 'center',
    backgroundColor: theme.colors.workOrders.dotsBack
  },
  footerText: {
    fontWeight: '400',
    fontSize: '10px'
  }
}))

export const SignInContainer = (props) => {
  const loading = useSelector(state => state.loading.loading)
  const classes = useStyles()

  return (
    <div>
      <CssBaseline/>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Grid container className={classes.container}>
        <Grid item md={6} className={classes.imageContainer}>
          <Box className={classes.container} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <BackgroundSlider
            images={[snow, flowers, sidewalk, water, trees, garden]}
            duration={10} transition={2} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.container}>
          <SignInHeader/>
          <Box className={classes.body}>
            {props.children}
          </Box>
          <Box className={classes.footer}>
            <Typography component={'span'} align={'center'} className={classes.footerText}>
              v{pjson.version}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}
