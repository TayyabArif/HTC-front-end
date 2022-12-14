import React from 'react'
import { Grid } from '@mui/material'
import conectadPlatformLogo from '../assets/images/connectad_platform.svg'
import { makeStyles } from '@mui/styles'
import { FadeLoader } from 'react-spinners'

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    overflow: 'hidden'
  }
}))

export const LoadingSplash = () => {
  const classes = useStyles()
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={0} className={classes.container}>
      <Grid item xs={12} textAlign="center" alignSelf="center">
        <img src={conectadPlatformLogo} alt="Connectad Platform"/>
      </Grid>
      <Grid item xs={12} p={2}>
        <FadeLoader
        loading={true}
        height={12}
        width={4}
        />
      </Grid>
    </Grid>
  )
}
