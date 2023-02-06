import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Components
import { Box, Card, Typography, Rating, Collapse, CardContent } from '@mui/material'
import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import { PhotoList } from './PhotoList'

/** Redux **/
import { useSelector } from 'react-redux'

// Styles
import { locationInfoCardStyles } from '../../../styles/classes/LocationsClasses'

export const LocationInfoCard = (props) => {
  const classes = locationInfoCardStyles()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const locationsStore = useSelector((state) => state.locations)
  const selectedSite = useSelector((state) => state.locations.selectedSite)
  const [expandHours, setExpandHours] = useState(false)
  const [expandUrl, setExpandUrl] = useState(false)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (props.info) {
      setRating(props.info?.rating)
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [props.info])

  const openingHoursPrev = () => {
    if (props.info && props.info.opening_hours && props.info.opening_hours.length > 1) {
      const preview = props.info.opening_hours[1].split(': ')
      return preview.length ? preview[1] : ''
    } else {
      return ''
    }
  }

  const openingDaysComp = () => {
    const splittedArray = []
    props.info?.opening_hours.forEach(element => {
      const splitted = element.split(': ')
      if (splitted.length === 2) {
        splittedArray.push({
          day: splitted[0],
          period: splitted[1]
        })
      } else {
        splittedArray.push({
          day: '',
          period: ''
        })
      }
    })
    return splittedArray.map((element, index) => <Typography key={index} className={classes.fieldContent}>{element.day}:</Typography>)
  }

  const openingRangeComp = () => {
    const splittedArray = []
    props.info?.opening_hours.forEach(element => {
      const splitted = element.split(': ')
      if (splitted.length === 2) {
        splittedArray.push({
          day: splitted[0],
          period: splitted[1]
        })
      } else {
        splittedArray.push({
          day: '',
          period: ''
        })
      }
    })
    return splittedArray.map((element, index) => <Typography key={index} className={classes.fieldContent}>{element.period}</Typography>)
  }

  return (
    <Box marginLeft="10px" position="relative" hidden={!locationsStore.showSiteViewPanel}>
      <Card className={classes.mainCard}>
        <Box display="flex">
          <Typography className={classes.nameLabel} >{selectedSite?.name}</Typography>
          {!expanded
            ? <ArrowDropDownRounded fontSize='small' className={classes.arrowDown} onClick={() => setExpanded(!expanded)} />
            : <ArrowDropUpRounded fontSize='small' className={classes.arrowDown} onClick={() => setExpanded(!expanded)} />}
        </Box>
        {props.info?.rating && <Box display="flex">
          <Typography className={classes.ratingLabel} >{rating}</Typography>
          <Rating
            classes={{ root: classes.rating }}
            size='small'
            value={rating}
            defaultValue={props.info?.rating}
            precision={0.5}
            max={5}
            name="unique-rating"
            readOnly
          />
          <Typography className={classes.ratingLabel} >{`(${props.info?.user_ratings_total})`}</Typography>
        </Box>}
        <Typography className={classes.locationDescription}>{props.info ? `$ - ${props.info?.name}` : t('locations.info_card.no_data')}</Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {props.info && <CardContent className={classes.cardContent}>
            {props.info?.photos && props.info?.photos?.length > 0 && <PhotoList photos={props.info?.photos ?? []} url={props.info?.url} />}
            {props.info?.located_in && props.info?.located_in !== '' && <Box mb="6px" display="flex">
              <Typography className={classes.fieldContent}><Typography display="inline" className={classes.fieldLabel}>{t('locations.info_card.located')}:&nbsp;</Typography>{props.info?.located_in}</Typography>
            </Box>}
            {props.info?.address && props.info?.address !== '' && <Box mb="6px" display="flex">
              <Typography className={classes.fieldContent}><Typography display="inline" className={classes.fieldLabel}>{t('locations.info_card.address')}:&nbsp;</Typography>{props.info?.address}</Typography>
            </Box>}
            {props.info?.opening_hours && props.info?.opening_hours.length !== 0 && <Box mb="6px" display="flex">
              <Typography className={classes.fieldLabel}>{t('locations.info_card.hours')}:&nbsp;</Typography>
              {expandHours && <div>{openingDaysComp()}</div>}
              {expandHours && <div className={classes.rangesDiv} >{openingRangeComp()}</div>}
              {!expandHours && <Typography className={classes.fieldContent}>{openingHoursPrev()}</Typography>}
              <Typography display="inline" className={classes.moreHours} onClick={() => setExpandHours(!expandHours)} >&nbsp;{expandHours ? t('locations.info_card.less_hours') : t('locations.info_card.more_hours')}</Typography>
            </Box>}
            {props.info?.departments && props.info?.departments !== '' && <Box mb="6px" display="flex">
              <Typography className={classes.fieldContent}><Typography display="inline" className={classes.fieldLabel}>{t('locations.info_card.departments')}:&nbsp;</Typography>{props.info?.departments}</Typography>
            </Box>}
            {props.info?.phone_number && props.info?.phone_number !== '' && <Box mb="6px" display="flex">
              <Typography className={classes.fieldContent}><Typography display="inline" className={classes.fieldLabel}>{t('locations.info_card.phone')}:&nbsp;</Typography>{props.info?.phone_number}</Typography>
            </Box>}
            {props.info?.website && props.info?.website !== '' && <Box mb="6px" display="flex">
              <Typography className={classes.fieldContent}>
                <Typography display="inline" className={classes.fieldLabel}>{t('locations.info_card.order')}:&nbsp;</Typography>
                  {props.info?.website.length > 50
                    ? <div className={classes.urlDiv} >
                      {expandUrl ? props.info?.website : props.info?.website.slice(0, 45) + '...'}
                      <Typography display="inline" className={classes.moreHours} onClick={() => setExpandUrl(!expandUrl)} >&nbsp;{expandUrl ? t('locations.info_card.show_less') : t('locations.info_card.show_more')}</Typography>
                    </div>
                    : props.info?.website}
              </Typography>
            </Box>}
          </CardContent>}
          {!props.info && <CardContent className={classes.cardNoContent}>
            <Typography className={classes.ratingLabel} >{t('locations.info_card.no_data_content')}</Typography>
          </CardContent>}
        </Collapse>
      </Card>
    </Box>
  )
}
