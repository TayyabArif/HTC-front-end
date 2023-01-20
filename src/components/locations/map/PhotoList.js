import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Components **/
import { Typography } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

/** Styles **/
import { locationInfoCardStyles } from '../../../styles/classes/LocationsClasses'

/** Constants **/
import { whiteImage } from '../../../lib/Constants'

function srcset (image, size, rows = 1, cols = 1) {
  return {
    src: image,
    srcSet: image
  }
}

export const PhotoList = (props) => {
  const { photos, url } = props
  const classes = locationInfoCardStyles()
  const { t } = useTranslation()
  const [locationPhotos, setPhotos] = useState([])
  const [moreLabel, setLabel] = useState('')

  const handleRedirectURL = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    const final = []
    for (let i = 0; i < 6; i++) {
      final.push({
        img: whiteImage,
        cols: i === 0 ? 6 : (i === 1 || i === 2) ? 3 : 2,
        rows: i === 0 ? 2 : 1
      })
    }
    if (photos.length >= 6) {
      final.forEach((element, index) => {
        element.img = photos[index].img
      })
    } else if (photos.length === 5) {
      final.forEach((element, index) => {
        element.img = (index === 0 || index === 1) ? photos[index].img : index === 2 ? whiteImage : photos[index - 1].img
      })
    } else if (photos.length === 4) {
      final.forEach((element, index) => {
        element.img = (index === 0 || index === 1) ? photos[index].img : (index === 2 || index === 5) ? whiteImage : photos[index - 1].img
      })
    } else if (photos.length === 3) {
      final.forEach((element, index) => {
        element.img = index === 0 ? photos[index].img : (index === 1 || index === 2 || index === 3) ? whiteImage : photos[index - 3].img
        element.cols = index === 0 ? 6 : (index === 1 || index === 2 || index === 3) ? 2 : 3
      })
    } else if (photos.length === 2) {
      final.forEach((element, index) => {
        element.img = index === 0 ? photos[index].img : (index === 1 || index === 2 || index === 3 || index === 5) ? whiteImage : photos[index - 3].img
        element.cols = index === 0 ? 6 : (index === 1 || index === 2 || index === 3) ? 2 : 3
      })
    } else if (photos.length === 1) {
      final.forEach((element, index) => {
        element.img = index === 0 ? photos[index].img : whiteImage
      })
    }
    setPhotos(final)
    if (photos.length > 6) {
      setLabel(`${photos.length - 6}+ ${t('locations.info_card.photos')}`)
    } else {
      setLabel('')
    }
  }, [photos])

  return (
    <ImageList
      sx={{ width: 480, height: 200, cursor: 'pointer' }}
      variant="quilted"
      cols={12}
      rowHeight={97}
      onClick={handleRedirectURL}
    >
      {locationPhotos.map((item, index) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            style={{ borderRadius: '12px' }}
            {...srcset(item.img, 97, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
          {index === 0 && moreLabel !== '' && <Typography className={classes.moreLabel} >{moreLabel}</Typography>}
        </ImageListItem>
      ))}
    </ImageList>
  )
}
