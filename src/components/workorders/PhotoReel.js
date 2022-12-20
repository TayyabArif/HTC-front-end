/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import '../../styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Box
} from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import html2canvas from './html2canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { photoReelStyles } from '../../styles/classes/WorkOrdersClasses'

function useWindowSize () {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize () {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

export const PhotoReel = props => {
  const { t } = useTranslation()
  const { photos, index, cleanClose } = props
  const classes = photoReelStyles()

  const [open, setOpen] = useState(false)
  const [photoIndex, setIndex] = useState(-1)

  const [width, height] = useWindowSize()

  const dialogTitleComponent = useRef(null)
  const [dialogWidth, setDialogWidth] = useState(1186)
  const [degrees, setDegrees] = useState(0)
  const photoRef = useRef()
  const [marginHeight, setHeight] = useState(0)
  const [marginWidth, setWidth] = useState(0)

  useEffect(() => {
    if (photoRef.current || open) {
      const naturalWidth =
        degrees === 90 || degrees === 270
          ? photoRef.current.naturalHeight
          : photoRef.current.naturalWidth
      const naturalHeight =
        degrees === 90 || degrees === 270
          ? photoRef.current.naturalWidth
          : photoRef.current.naturalHeight
      const offsetWidth =
        degrees === 90 || degrees === 270
          ? photoRef.current.offsetHeight
          : photoRef.current.offsetWidth
      const offsetHeight =
        degrees === 90 || degrees === 270
          ? photoRef.current.offsetWidth
          : photoRef.current.offsetHeight
      if (naturalWidth > naturalHeight) {
        const result = (naturalHeight * offsetWidth) / naturalWidth
        setHeight((435 - result) / 2 + 12)
        setWidth(12)
      } else {
        const result = (naturalWidth * offsetHeight) / naturalHeight
        setWidth((799 - result) / 2 + 12)
        setHeight(12)
      }
    }
  }, [
    photoRef.current?.naturalHeight,
    photoRef.current?.naturalWidth,
    degrees,
    open
  ])

  useEffect(() => {
    if (dialogTitleComponent && dialogTitleComponent.current) {
      setDialogWidth(dialogTitleComponent.current.offsetWidth)
    }
  }, [width, height])

  useEffect(() => {
    if (photos !== [] && index !== -1) {
      setOpen(true)
      setIndex(index)
    }
  }, [props])

  const handleClose = () => {
    cleanClose()
    setOpen(false)
  }

  const onChange = (index, item) => {
    setDegrees(0)
    setIndex(index)
  }

  const handleRotate = () => {
    setDegrees(degrees === 270 ? 0 : degrees + 90)
  }

  const handleDownload = async () => {
    html2canvas(document.getElementById('photo-' + photoIndex), {
      backgroundColor: null,
      allowTaint: false,
      useCORS: true
    }).then(function (canvas) {
      simulateDownloadImageClick(
        canvas.toDataURL(),
        `WO${props.woInfo.external_id}.png`
      )
    })
  }

  function simulateDownloadImageClick (uri, filename) {
    let link = document.createElement('a')
    if (typeof link.download !== 'string') {
      window.open(uri)
    } else {
      link.href = uri
      link.download = filename
      accountForFirefox(clickLink, link)
    }
  }

  function clickLink (link) {
    link.click()
  }

  function accountForFirefox (click) {
    let link = arguments[1]
    document.body.appendChild(link)
    click(link)
    document.body.removeChild(link)
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        classes={{ paper: classes.dialogPaper }}
        BackdropProps={{ invisible: true }}
        style={{ zIndex: 2000 }}
        disableAutoFocus={false}
      >
        <DialogTitle
          id="alert-dialog"
          disabletypography="true"
          classes={{ root: classes.dialogTitle }}
          ref={dialogTitleComponent}
        >
          <FormLabel classes={{ root: classes.title }}>
            {`${t('general.labels.wo')} ${props.woInfo.external_id} - ${t(
              'work_orders.service_appointment'
            )} ${props.woInfo.trip}`}
          </FormLabel>
          <ClearIcon className={classes.clearIconStyle} onClick={handleClose} />
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          <Container className={classes.carouselContainer}>
            <Carousel
              showArrows={true}
              dynamicHeight={true}
              selectedItem={photoIndex}
              onChange={onChange}
              renderIndicator={false}
              showStatus={false}
              renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                hasPrev && (
                  <div
                    className={classes.prevIconStyle}
                    style={{
                      left:
                        dialogWidth > 855
                          ? (855 - dialogWidth) / 2 + 'px'
                          : 0 + 'px'
                    }}
                    onClick={clickHandler}
                  >
                    <IconButton
                      className={classes.arrowIcon}
                      onClick={handleRotate}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </IconButton>
                  </div>
                )
              }
              renderArrowNext={(clickHandler, hasNext, labelNext) =>
                hasNext && (
                  <div
                    className={classes.nextIconStyle}
                    style={{
                      right:
                        dialogWidth > 855
                          ? (855 - dialogWidth) / 2 + 'px'
                          : 0 + 'px'
                    }}
                    onClick={clickHandler}
                  >
                    <IconButton
                      className={classes.arrowIcon}
                      onClick={handleRotate}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </IconButton>
                  </div>
                )
              }
            >
              {photos.map((obj, ind) => (
                <div key={ind}>
                  <div className={classes.photoFrame}>
                    <Box
                      className={classes.buttonsBox}
                      style={{
                        display: photoIndex !== ind ? 'none' : 'block',
                        margin: `${marginHeight}px ${marginWidth}px`
                      }}
                    >
                      <IconButton
                        className={classes.iconButton}
                        onClick={handleRotate}
                      >
                        <FontAwesomeIcon
                          icon={faRotateLeft}
                          size="xs"
                        />
                      </IconButton>
                      <IconButton
                        className={classes.iconButton}
                        onClick={handleDownload}
                      >
                        <FontAwesomeIcon
                          icon={['far', 'arrow-down-to-square']}
                          size="xs"
                        />
                      </IconButton>
                    </Box>
                    <div className={classes.photoContent} id={'photo-' + ind}>
                      <img
                        ref={photoIndex === ind ? photoRef : null}
                        src={obj.uri}
                        className={
                          degrees === 90 || degrees === 270
                            ? classes.photoVertical
                            : classes.photo
                        }
                        style={
                          photoIndex === ind
                            ? { transform: `rotate(-${degrees}deg)` }
                            : {}
                        }
                      />
                      {obj.attributes
                        ? (
                        <FormLabel className={classes.timestampLabel}>
                          {' '}
                          {moment(
                            new Date(parseInt(obj.attributes.timestamp))
                          ).format('MM/DD/yyyy hh:mm A')}{' '}
                        </FormLabel>
                          )
                        : (
                        <div></div>
                          )}
                    </div>
                  </div>
                  <p className={classes.legend + ' details'}>
                    <FormLabel classes={{ root: classes.imgTitle }}>
                      {obj.title ?? ''}
                    </FormLabel>
                    <FormLabel classes={{ root: classes.imgDescription }}>
                      {obj.description ? `${obj.description}` : ''}
                    </FormLabel>
                  </p>
                </div>
              ))}
            </Carousel>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}
