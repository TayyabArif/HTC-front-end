// main components
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { YesNoSelector } from './YesNoSelector'

// mui components
import {
  FormLabel,
  Drawer,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography
} from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import { accessPanelStyles } from '../../styles/classes/CompanySettingsClasses'

const iconStyle = {
  width: '24px',
  marginRight: '0px',
  cursor: 'pointer'
}

export const AccessPanel = props => {
  const classes = accessPanelStyles()
  const { t } = useTranslation()
  const [data, setData] = useState({
    name: '',
    workorders: 'not_selected',
    sites: 'not_selected',
    company_settings: 'not_selected'
  })
  const [errors, setErrors] = useState({
    name: null,
    workorders: null,
    sites: null,
    company_settings: null
  })

  useEffect(() => {
    if (props.open) {
      setData(props.data)
    } else {
      setErrors({
        name: null,
        workorders: null,
        sites: null,
        company_settings: null
      })
    }
  }, [props.open])

  const handleClose = () => {
    props.setOpen(false)
  }

  const handlechangeValues = (value, id) => {
    setErrors(prevState => ({
      ...prevState,
      [id]: null
    }))
    setData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const onCreate = () => {
    setErrors({
      name: data.name !== '' ? null : t('general.messages.errors.required'),
      workorders:
        data.workorders !== 'not_selected'
          ? null
          : t('general.messages.errors.required'),
      company_settings:
        data.company_settings !== 'not_selected'
          ? null
          : t('general.messages.errors.required'),
      sites:
        data.sites !== 'not_selected'
          ? null
          : t('general.messages.errors.required')
    })
    if (mainValidation()) {
      props.handleNew(
        data.name,
        data.workorders,
        data.sites,
        data.company_settings
      )
    }
  }

  const onChange = () => {
    if (mainValidation()) {
      props.handleChange(
        props.data.id,
        data.name,
        data.workorders,
        data.sites,
        data.company_settings
      )
    }
  }

  const onDelete = () => {
    props.handleDelete(props.data.id)
  }

  const mainValidation = () => {
    return (
      data.name &&
      data.workorders !== 'not_selected' &&
      data.company_settings !== 'not_selected' &&
      data.sites !== 'not_selected'
    )
  }

  const fields = () => (
    <div role="presentation" style={{ paddingLeft: '20px' }}>
      <FormLabel component="legend" classes={{ root: classes.label }}>
        {t('company_settings.roles_card.panel_name')}
      </FormLabel>
      <TextField
        id="name"
        key="Access Name"
        value={data.name}
        size="small"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={event => handlechangeValues(event.target.value, 'name')}
        placeholder={t('company_settings.roles_card.access_name')}
        classes={{ root: classes.inputName }}
        InputProps={{
          className: classes.textField,
          endAdornment:
            data.name !== ''
              ? (
              <InputAdornment position="end">
                <IconButton onClick={() => handlechangeValues('', 'name')}>
                  <ClearIcon style={{ fontSize: 'small' }} fontSize="small" />
                </IconButton>
              </InputAdornment>
                )
              : null
        }}
        inputProps={{
          style: {
            padding: 0
          }
        }}
        error={errors.name}
        helperText={errors.name ?? ''}
        autoComplete="off"
      />
      <FormLabel component="legend" classes={{ root: classes.label }}>
        {t('company_settings.roles_card.workorders')}
      </FormLabel>
      <YesNoSelector
        value={data.workorders}
        id="workorders"
        handleChange={handlechangeValues}
        error={errors.workorders}
      />
      <Box pt={1} hidden={errors.workorders === null}>
        <Typography align={'left'} className={classes.errorMessage}>
          {errors.workorders}
        </Typography>
      </Box>
      <FormLabel component="legend" classes={{ root: classes.label }}>
        {t('company_settings.roles_card.sites')}
      </FormLabel>
      <YesNoSelector
        value={data.sites}
        id="sites"
        handleChange={handlechangeValues}
        error={errors.sites}
      />
      <Box pt={1} hidden={errors.sites === null}>
        <Typography align={'left'} className={classes.errorMessage}>
          {errors.sites}
        </Typography>
      </Box>
      <FormLabel component="legend" classes={{ root: classes.label }}>
        {t('company_settings.roles_card.company_settings')}
      </FormLabel>
      <YesNoSelector
        value={data.company_settings}
        id="company_settings"
        handleChange={handlechangeValues}
        error={errors.company_settings}
      />
      <Box pt={1} hidden={errors.company_settings === null}>
        <Typography align={'left'} className={classes.errorMessage}>
          {errors.company_settings}
        </Typography>
      </Box>
    </div>
  )

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        BackdropProps={{ invisible: true }}
        anchor={'right'}
        open={props.open}
        onClose={() => props.setOpen(false)}
        classes={{ paper: classes.drawerPaper }}
        data-testid={'access_panel'}
      >
        <div className={classes.drawerTitle}>
          <FormLabel component="legend" classes={{ root: classes.title }}>
            {props.data.name && props.data.name.length > 0
              ? t('company_settings.roles_card.panel_details')
              : t('company_settings.roles_card.panel_new')}
          </FormLabel>
          <ClearIcon style={iconStyle} onClick={handleClose} />
        </div>
        {fields()}
        {props.data.id && props.data.id !== 0
          ? (
          <div className={classes.bottomDiv}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              classes={{ root: classes.delete }}
              onClick={onDelete}
            >
              {t('company_settings.roles_card.panel_delete')}
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              classes={{
                root: mainValidation() ? classes.saveOk : classes.save
              }}
              onClick={onChange}
            >
              {t('company_settings.roles_card.panel_save')}
            </Button>
          </div>
            )
          : (
          <div className={classes.bottomDiv}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              classes={{
                root: mainValidation() ? classes.saveOk : classes.save
              }}
              onClick={onCreate}
              disable={!mainValidation()}
            >
              {t('company_settings.roles_card.panel_create')}
            </Button>
          </div>
            )}
      </Drawer>
    </div>
  )
}
