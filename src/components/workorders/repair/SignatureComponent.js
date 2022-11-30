import React, { useEffect, useRef, useState } from 'react'
import { FormLabel, Grid, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { ImageSearch as ImageIcon } from '@mui/icons-material'
import { PhotoPicker } from '../../PhotoPicker'
import { AddButton } from '../../AddButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  photoField: {
    marginLeft: '5px',
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  signatureContainer: {
    height: '99px',
    width: '303px',
    marginBottom: '6px',
    borderRadius: '8px'
  },
  thumb: {
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px'
  },
  fieldContainer: {
    backgroundColor: theme.colors.grey_2,
    borderRadius: '6px',
    minwidth: '303px',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px',
    height: '52px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    fontSize: '14px',
    color: theme.colors.iconBlue,
    textTransform: 'none',
    padding: '10px',
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    paddingRight: '5px',
    color: theme.colors.grey
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  textField: {
    ...theme.filtersClasses.mainInput2,
    width: '313px',
    height: 'auto',
    border: 'none',
    '& .MuiInputBase-input': {
      fontSize: '14px',
      lineHeight: '18px'
    }
  },
  notes: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400',
    marginLeft: '5px'
  },
  fieldMessage: {
    marginLeft: '5px',
    marginTop: '5px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: '10px'
  }
}))

export const SignatureComponent = props => {
  const {
    data,
    handleOpenPhotos,
    disabled,
    headerText,
    onUpdate,
    mandatory,
    notAvailable
  } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const photoRef = useRef()
  const [name, setName] = useState('')

  useEffect(() => {
    setName(data?.name)
  }, [data?.name])

  const noImagesComp = () => (
    <div style={{ textAlign: 'center' }}>
      {!notAvailable && <ImageIcon color="disabled" />}
      <FormLabel
        component="legend"
        classes={{ root: notAvailable ? classes.fieldMessage : classes.empty }}
      >
        {notAvailable
          ? t('general.labels.not_available')
          : t('work_orders.images_message')}
      </FormLabel>
    </div>
  )

  const setPhotoUrl = url => {
    onUpdate({
      name: data?.name,
      image: url
    })
  }

  const removePhoto = () => {
    onUpdate({
      name: data?.name,
      url: null
    })
  }

  return (
    <>
      <FormLabel
        component="legend"
        className={`${classes.photoField} ${
          !disabled && mandatory ? classes.mandatory : null
        }`}
      >
        {headerText}
      </FormLabel>
      {disabled
        ? (
        <>
          {data?.image && (
            <Grid item md={4}>
              <div className={classes.signatureContainer}>
                <img
                  src={
                    data.image?.includes('http')
                      ? data.image.replace('.jpg', '_L.jpg')
                      : process.env.REACT_APP_FTC_IMAGE_BASE_URL +
                        data.image.replace('.jpg', '_L.jpg')
                  }
                  className={classes.thumb}
                  onClick={() =>
                    handleOpenPhotos(0, [
                      {
                        uri: data.image?.includes('http')
                          ? data.image.replace('.jpg', '_L.jpg')
                          : process.env.REACT_APP_FTC_IMAGE_BASE_URL +
                            data.image.replace('.jpg', '_L.jpg')
                      }
                    ])
                  }
                />
              </div>
            </Grid>
          )}
          {data?.name && (
            <FormLabel component="legend" classes={{ root: classes.notes }}>
              {data.name}
            </FormLabel>
          )}
          {!data?.image && !data?.name && noImagesComp()}
        </>
          )
        : (
        <>
          <PhotoPicker
            key={'photo-picker'}
            photoRef={photoRef}
            callback={setPhotoUrl}
          />
          {data?.image
            ? (
            <Grid className={classes.fieldContainer} item xs={12}>
              <FormLabel className={classes.buttonLabel}>
                {headerText}
              </FormLabel>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={() => removePhoto()}
                className={classes.icon}
              />
            </Grid>
              )
            : (
            <AddButton
              label={t('work_orders.trips.sign')}
              callback={() => photoRef.current.click()}
            />
              )}
          {
            <TextField
              variant="outlined"
              className={classes.textField}
              placeholder={t('work_orders.trips.enter_signature_name')}
              value={name}
              onChange={event => setName(event.target.value)}
              onBlur={() =>
                onUpdate({
                  image: data?.image,
                  name: name
                })
              }
            />
          }
        </>
          )}

      {/* TODO Update when signature field is modified */}
      {<div style={{ marginBottom: '20px' }} />}
    </>
  )
}
