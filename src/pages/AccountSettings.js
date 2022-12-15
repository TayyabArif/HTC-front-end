import React from 'react'
/** Material UI **/
import { MainContainer } from '../components/MainContainer'
import { Box, Container, Grid, Typography } from '@mui/material'

/** Translation **/
import { useTranslation } from 'react-i18next'
import { AccountInfoCard } from '../components/accountSettings/AccountInfoCard'
import { AccountSettingsPageClasses } from '../styles/classes/AccountSettingsClasses'

const AccountSettings = () => {
  const { t } = useTranslation()
  const classes = AccountSettingsPageClasses()

  return (
        <MainContainer>
            <Container className={classes.container} maxWidth={false} disableGutters>
                <Box className={classes.titleBackground}></Box>
                <Box className={classes.frontBoxes} display="flex" flexDirection="row">
                    <Typography className={classes.title}>
                        {t('account_settings.title')}
                    </Typography>
                </Box>
                <Grid className={classes.frontBoxes} container>
                    <Grid item sm={12} md={8} lg={6}>
                        <AccountInfoCard />
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
  )
}

export default AccountSettings
