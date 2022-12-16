import React from 'react'
import EXIF from 'exif-js'

export const PhotoPicker = props => {
  const { callback, photoRef } = props

  const changeFileHandler = event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (readerEvent) {
      const image = new Image()
      image.onload = function (imageEvent) {
        // Resize the image
        const canvas = document.createElement('canvas')
        const maxSize = 600
        let width = image.width
        let height = image.height
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(image, 0, 0, width, height)
        let attributes = {}
        EXIF.getData(file, function () {
          const exifData = EXIF.pretty(this)
          attributes = {
            lat: exifData?.GPSLatitude ? exifData.GPSLatitude : 0,
            lon: exifData?.GPSLongitude ? exifData.GPSLongitude : 0,
            exif: exifData ? 'disabled' : 'enabled',
            timestamp: new Date().getTime(),
            type: 'library'
          }
          callback(canvas.toDataURL('image/jpeg'), attributes)
        })
      }
      image.src = readerEvent.target.result
    }
    reader.onerror = function (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <input
      ref={photoRef}
      style={{ display: 'none' }}
      type="file"
      name="file"
      onChange={changeFileHandler}
    />
  )
}
