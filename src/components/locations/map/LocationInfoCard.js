import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Box, Card, Typography, Rating, Collapse, CardContent } from '@mui/material'
import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import { PhotoList } from './PhotoList'

/** Redux **/
import { useSelector } from 'react-redux'

// Styles
import { locationInfoCardStyles } from '../../../styles/classes/LocationsClasses'

// hardcoded photos
const photosData = [
  {
    img: 'https://www.investopedia.com/thmb/6tBnqfHCJ_GHn_kcw6jGf2tMPDE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Walmart_exterior-8db53b3ec5c442f0a343fe01e6640090.jpg',
    title: 'Store 1',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://www.big-box.com/wp-content/uploads/2017/02/big-box-store-aisle-300x200.jpg',
    title: 'Store 2'
  },
  {
    img: 'https://s3-prod.chicagobusiness.com/carsons_0.jpg',
    title: 'Store 3'
  },
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/PknMitre10MEGAinterior.JPG/140px-PknMitre10MEGAinterior.JPG',
    title: 'Store 4'
  },
  {
    img: 'https://www.joneslanglasalle.com.cn/images/apac/articles/jll-why-bigbox-retail-stores-are-turning-into-warehouses-social-1200x628.jpg',
    title: 'Store 5'
  }
]

export const LocationInfoCard = (props) => {
  const classes = locationInfoCardStyles()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const locationsStore = useSelector((state) => state.locations)
  const selectedSite = useSelector((state) => state.locations.selectedSite)

  return (
  <Box marginLeft="10px" position="relative" hidden={!locationsStore.showSiteViewPanel}>
      <Card className={classes.mainCard}>
        <Box display="flex">
            <Typography className={classes.nameLabel} >{selectedSite?.name}</Typography>
            {!expanded
              ? <ArrowDropDownRounded fontSize='small' className={classes.arrowDown} onClick={() => setExpanded(!expanded)}/>
              : <ArrowDropUpRounded fontSize='small' className={classes.arrowDown} onClick={() => setExpanded(!expanded)}/>}
        </Box>
        <Box display="flex">
            <Typography className={classes.ratingLabel} >{4.2}</Typography>
            <Rating classes={{ root: classes.rating }} className={classes.rating} size='small' value={4} readOnly />
            <Typography className={classes.ratingLabel} >{'(1.1K)'}</Typography>
        </Box>
        <Typography className={classes.locationDescription}>{'$ - Home improvement store in Little Hassy, Nevada'}</Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <PhotoList photos={photosData ?? []}/>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.located')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'Marketplace at Little Hassy'}</Typography>
            </Box>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.address')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'49 Van Ness Avenue, Little Hassy, NV 99018'}</Typography>
            </Box>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.hours')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'Open - Closes 10PM'}</Typography>
            </Box>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.departments')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'Garden Center at Hyde Street Plaza - Hyde Street Services, Garden Center at Hyde Street Plaza - Hyde Street Services'}</Typography>
            </Box>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.phone')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'(443) 984-4798'}</Typography>
            </Box>
            <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.located')}:&nbsp;</Typography>
              <Typography className={classes.fieldContent}>{'hydestreet.com'}</Typography>
            </Box>
          </CardContent>
      </Collapse>
      </Card>
  </Box>
  )
}
