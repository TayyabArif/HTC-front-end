import React from 'react'
/** Material UI **/
import { MainContainer } from '../components/MainContainer'
import { Box, Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

/** Translation **/
import { useTranslation } from 'react-i18next'
import { AccountInfoCard } from '../components/accountSettings/AccountInfoCard'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0px 0px',
    margin: '0px 0px',
    maxWidth: '100%',
    width: '100%',
    height: '400px'
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      display: 'flex',
      color: theme.colors.white,
      padding: '24px 0px 32px 62px',
      fontWeight: 700,
      fontSize: '28px'
    }

  },
  titleBackground: {
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: theme.colors.accountSettings.bgBlue,
    height: '400px',
    width: '100%',
    maxWidth: '100%',
    zIndex: -1
  }
}))

const AccountSettings = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
        <MainContainer>
            <Container className={classes.container} maxWidth={false} disableGutters>
                <Box className={classes.titleBackground}></Box>
                <Box display="flex" flexDirection="row">
                    <Typography className={classes.title}>
                        {t('account_settings.title')}
                    </Typography>
                </Box>
                <Grid container>
                    <Grid item sm={12} md={8} lg={6}>
                        <AccountInfoCard />
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
  )
}

export default AccountSettings
