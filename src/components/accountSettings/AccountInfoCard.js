// main components
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import {
  Card,
  Button,
  CardContent,
  Grid,
  Typography
} from '@mui/material'

/** Redux */
import { useSelector } from 'react-redux'

/** Services **/
import { UpdateAccountInfo } from './UpdateAccountInfo'
import { getCompanyRoles } from '../../services/ApiService'

/** Styles **/
import { AccountInfoCardClasses } from '../../styles/classes/AccountSettingsClasses'
import clsx from 'clsx'

export const AccountInfoCard = props => {
  const classes = AccountInfoCardClasses()
  const { t } = useTranslation()
  const user = useSelector(state => state.auth.user)
  const [editDrawer, setEditDrawer] = useState(false)
  const [userInfo, setUserInfo] = useState(JSON.parse(JSON.stringify(user)))
  const [roles, setRoles] = useState()

  // Inline Styles
  const styles = {
    employeeId: {
      display: 'none'
    }
  }

  let firstLoad = true
  useEffect(() => {
    const getRoles = async () => {
      try {
        if (firstLoad) {
          const response = await getCompanyRoles(userInfo.userInfo.originating_company)

          const newPhone = formatPhoneNumber(userInfo.userInfo.phone)
          userInfo.userInfo.phone = newPhone
          setUserInfo(userInfo)

          if (response) {
            // temporary hidden role "Portal user"
            setRoles(response.filter(role => role.name.toLowerCase() !== 'portal user'))
          }
          firstLoad = false
        }
      } catch (error) {
        console.error(error)
      }
    }
    getRoles()
  }, [firstLoad])

  const handleClosePanel = u => {
    setEditDrawer(false)
    setUserInfo(u)
  }

  const formatPhoneNumber = phoneNumberString => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString
  }

  return (
    <div>
      <UpdateAccountInfo
        editDrawer={editDrawer}
        handleClosePanel={handleClosePanel}
        accountInfo={userInfo}
        roles={roles}
      />
      <Card className={classes.card} data-testid={'account_info_card'} elevation={0}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.title}>
              {t('account_settings.info_card.title')}
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <Button size="small" onClick={() => { setEditDrawer(true) }} className={classes.editButton}>
              <Typography pr={3}>
                {t('account_settings.info_card.edit_button')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <CardContent className={classes.content}>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.field}>{t('account_settings.info_card.first_name')}</Typography>
              <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.firstName}</Typography>
            </Grid>
            <Grid item xs={4} ml={2}>
              <Typography className={classes.field}>{t('account_settings.info_card.last_name')}</Typography>
              <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.lastName ?? '--'}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8.3}>
              <Typography className={classes.field}>{t('account_settings.info_card.email')}</Typography>
              <Typography className={classes.info} mt={1}>{userInfo?.userInfo?.email}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.field}>{t('account_settings.info_card.phone_number')}</Typography>
              <Typography className={classes.info} mt={1}>{`${userInfo?.userInfo?.phone ?? ''}`}</Typography>
            </Grid>
            <Grid item xs={4} ml={2}>
              <Typography className={classes.field}>{t('account_settings.info_card.password')}</Typography>
              <Typography className={`${classes.info} ${classes.customInfo}`} mt={1}>{'***********'}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Typography className={classes.field}>{t('account_settings.info_card.company_role')}</Typography>
              <Typography className={classes.info} mt={1}>{roles?.find(x => x.id === userInfo.userInfo.roles)?.name ?? '--'}</Typography>
            </Grid>
            <Grid item xs={4} ml={2}>
              <Typography className={classes.field}>{t('account_settings.info_card.user_title')}</Typography>
              <Typography className={userInfo?.userInfo?.role ? classes.info : clsx(classes.info, classes.disabled)} mt={1}>
                {userInfo?.userInfo?.role ? t('request_access.user_roles.' + userInfo?.userInfo?.role) : 'Choose Title'}
              </Typography>
            </Grid>
            <Grid item xs={3} ml={2} sx={styles.employeeId}>
              <Typography classes={{ root: classes.field }}>{t('account_settings.info_card.employee_id')}</Typography>
              <Typography classes={{ root: classes.info }} mt={1}>{userInfo?.userInfo?.employee_id ?? '--'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}
