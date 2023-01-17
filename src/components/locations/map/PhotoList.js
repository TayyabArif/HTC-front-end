import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

function srcset (image, size, rows = 1, cols = 1) {
  return {
    src: `${image}`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

export const PhotoList = (props) => {
  const { photos } = props
  return (
    <ImageList
      sx={{ width: 480, height: 200 }}
      variant="quilted"
      cols={4}
      rowHeight={97}
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
