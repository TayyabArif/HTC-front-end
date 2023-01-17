import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

function srcset (image, size, rows = 1, cols = 1) {
  return {
    src: `${image}`,
    srcSet: `${image}`
  }
}

export const PhotoList = (props) => {
  const { photos, url } = props

  const handleRedirectURL = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <ImageList
      sx={{ width: 480, height: 200, cursor: 'pointer' }}
      variant="quilted"
      cols={4}
      rowHeight={97}
      onClick={handleRedirectURL}
    >
      {photos.map((item, index) => index <= 4 && (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            style={{ borderRadius: '12px' }}
            {...srcset(item.img, 97, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
