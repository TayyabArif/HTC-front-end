import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import React from 'react'

/** Material UI **/
import { Box, Grid, makeStyles } from '@material-ui/core'

/** Images **/
import bvLogo from '../assets/images/BVlogo.svg'

const useStyles = makeStyles((theme) => ({
  headerBox: {
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.primary.contrastText
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.colors.generalBackground
    }
  },
  logo: {
    '-webkit-backface-visibility': 'hidden',
    '-ms-transform': 'translateZ(0)',
    '-webkit-transform': 'translateZ(0)',
    transform: 'translateZ(0)',
    'image-rendering': 'crisp-edges',
    '-ms-interpolation-mode': 'nearest-neighbor'
  },
  logoGrid: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  }
}))

export const SignInHeader = () => {
  const { i18n } = useTranslation()
  const classes = useStyles()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <Box p={5} className={classes.headerBox} >
      <Grid container>
        <Grid item xs className={classes.logoGrid} >
          <Link data-testid='bv-logo' to='/' >
            <img className={classes.logo} height="44" src={bvLogo} />
          </Link>
        </Grid>
        {/* TODO: Restyle language selector when needed (It's hidden until we decide to include it in the design) */}
        <Grid hidden item>
          <select
            id="language"
            value=""
            onChange={changeLanguage}
          >
            <option value="">Language</option>
            <option value="en">en</option>
            <option value="es">es</option>
          </select>
        </Grid>
      </Grid>
    </Box>
  )
}
