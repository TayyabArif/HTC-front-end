import React, { useRef, useState } from 'react'
import { FormLabel, Grid, Menu, MenuItem } from '@mui/material'
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
    marginBottom: '8px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  thumbContainer: {
    width: '99px',
    height: '94px',
    marginBottom: '6px',
    borderRadius: '8px'
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: '3px'
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
  button: {
    '& .MuiButton-label': {
      justifyContent: 'flex-start'
    }
  },
  menuItem: theme.filtersClasses.menuItem,
  icon: {
    alignSelf: 'center',
    paddingRight: '15px',
    color: theme.colors.grey
  },
  required: {
    fontSize: '12px',
    color: 'red',
    marginLeft: '2px'
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  container: {
    marginLeft: '5px'
  }
}))

export const PhotoComponent = props => {
  const {
    photos,
    handleOpenPhotos,
    disabled,
    minRequired,
    headerText,
    photosType,
    titleOptions,
    onUpdate,
    unique,
    notAvailable
  } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const photoRef = useRef()
  const [anchorEl, setAnchorEl] = useState(null)
  const [title, setTitle] = useState('')
  const inputRef = useRef()

  const getCardTitle = () => {
    if (headerText) return headerText
    switch (photosType) {
      case 'photos_before':
        return t('work_orders.trips.photos_before')
      case 'photos_after':
        return t('work_orders.trips.photos_after')
      default:
        return t('work_orders.trips.photos')
    }
  }

  const noImagesComp = () => (
    <div style={{ textAlign: 'center' }}>
      {!notAvailable && <ImageIcon color="disabled" />}
      <FormLabel component="legend" classes={{ root: classes.empty }}>
        {notAvailable
          ? t('general.labels.not_available')
          : t('work_orders.images_message')}
      </FormLabel>
    </div>
  )

  const setPhotoUrl = async (url, exif) => {
    photos.push({
      title: title,
      uri: url,
      attributes: {
        ...exif,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    })
    onUpdate([...photos])
  }

  const removePhoto = deletedPhoto => {
    const index = photos.indexOf(deletedPhoto)
    photos.splice(index, 1)
    onUpdate([...photos])
  }

  const renderMinRequiredMsg = (text = false) => {
    if (disabled) {
      if (text) return text
      return getCardTitle()
    }

    const photoStore = photos
    // Make sure only the mandatory titles are taken into account
    let photosLength = 0
    if (photoStore && photoStore.length > 0) {
      photosLength = photoStore ? photoStore.length : 0
      if (!!titleOptions && typeof titleOptions[0] === 'object') {
        photosLength = 0
        const mandatoryTitles = titleOptions
          .filter(title => title.mandatory)
          .map(title => title.title)
        photoStore.forEach(photo => {
          if (mandatoryTitles.includes(photo.title)) photosLength++
        })
      }
    }

    if (photosLength >= minRequired) {
      if (text) return text
      return getCardTitle()
    }

    if (text) {
      return (
        text +
        ' - ' +
        (minRequired - photosLength
          ? t('work_orders.trips.photos_remaining').replace(
            '{v1}',
            minRequired - photosLength
          )
          : t('work_orders.trips.one_photos_remaining'))
      )
    }

    return (
      getCardTitle() +
      ' - ' +
      (minRequired - photosLength > 1
        ? t('work_orders.trips.photos_remaining').replace(
          '{v1}',
          minRequired - photosLength
        )
        : t('work_orders.trips.one_photos_remaining'))
    )
  }

  return (
    <>
      <Grid item xs={12}>
        <FormLabel
          component="legend"
          ref={inputRef}
          className={`${classes.photoField} ${
            !disabled && minRequired > 0 ? classes.mandatory : null
          }`}
        >
          {renderMinRequiredMsg(headerText)}
        </FormLabel>
      </Grid>
      {disabled && (
        <Grid container>
          {photos && photos.length > 0
            ? photos.map((obj, ind) => (
                <Grid key={ind} item xs={4} md={4}>
                  <div className={classes.thumbContainer}>
                    <img
                      src={obj.uri}
                      className={classes.thumb}
                      onClick={() => handleOpenPhotos(ind, photos)}
                    />
                  </div>
                </Grid>
            ))
            : noImagesComp()}
        </Grid>
      )}
      {!disabled && (
        <Grid item className={classes.container}>
          <PhotoPicker
            key={'photo-picker'}
            photoRef={photoRef}
            callback={setPhotoUrl}
          />
          {photos?.map((photo, idx) => (
            <Grid
              key={photo.url + photo.title + idx}
              className={classes.fieldContainer}
              item
              xs={12}
            >
              <FormLabel className={classes.buttonLabel}>
                {photo.title ? photo.title : 'Photo ' + (idx + 1)}
              </FormLabel>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={() => removePhoto(photo)}
                className={classes.icon}
              />
            </Grid>
          ))}
          <AddButton
            label={t('work_orders.trips.photos')}
            callback={event => {
              if (titleOptions && titleOptions.length > 0) {
                setAnchorEl(event.currentTarget)
              } else photoRef.current.click()
            }}
          />
          {anchorEl && (
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              onClose={() => setAnchorEl(null)}
              open={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {titleOptions.map(option => {
                const title = typeof option === 'object' ? option.title : option
                if (
                  unique &&
                  photos.filter(photo => photo.title === title).length !== 0
                ) {
                  return null
                }
                return (
                  <MenuItem
                    key={option.title}
                    value={title}
                    classes={{ root: classes.menuItem }}
                    onClick={() => {
                      setAnchorEl(null)
                      setTitle(option.title)
                      photoRef.current.click()
                    }}
                    style={{ width: inputRef?.current?.clientWidth }}
                  >
                    {title}
                    {typeof option === 'object' && option.mandatory && (
                      <FormLabel className={classes.required}>
                        {t('work_orders.trips.mandatory')}
                      </FormLabel>
                    )}
                  </MenuItem>
                )
              })}
            </Menu>
          )}
        </Grid>
      )}
    </>
  )
}
