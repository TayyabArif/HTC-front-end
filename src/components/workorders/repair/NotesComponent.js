import React, { useState } from 'react'
import {
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AddButton } from '../../AddButton'
// import NumberFormat from 'react-number-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import * as NumberFormat from 'react-number-format'
import { notesComponentStyles } from '../../../styles/classes/RepairClasses'

export const NotesComponent = props => {
  const { t } = useTranslation()
  const classes = notesComponentStyles()
  const {
    title,
    notes,
    disabled,
    onUpdate,
    type,
    mandatory,
    catalogs,
    suffix,
    notAvailable
  } = props
  const [value, setValue] = useState(notes)
  const [expanded, setExpanded] = useState(false)

  const onBlur = text => {
    const blurValue = getSuffix() ? `${text} ${getSuffix()}` : text
    setValue(blurValue)
    onUpdate(blurValue)
  }

  const handleChangeValues = event => {
    const newValue =
      type === 'number'
        ? validateDecimals(event.target.value.toString())
        : event.target.value
    setValue(newValue)
  }

  const validateDecimals = text => {
    const { decimals } = props
    if (decimals && text && text.includes('.')) {
      const numberOfDecimals = text.split('.')[1]?.length
      if (numberOfDecimals && numberOfDecimals >= decimals + 1) {
        // +1 for limit the new decimal
        return text.slice(0, -1)
      }
    }
    return text
  }

  const hasSuffix = text => {
    const textArray = text?.split(' ')
    return !!textArray && !!textArray[1]
  }

  const getNumber = text => {
    const textArray = text?.split(' ')
    return textArray[0]
  }

  const removeSuffix = () => {
    let newText = notes
    if (hasSuffix(newText)) {
      newText = getNumber(newText)
      setValue(newText)
    }
  }

  const getSuffix = () => {
    let suff = ''
    if (catalogs && suffix && catalogs[suffix]) {
      suff = catalogs[suffix]
    }
    return suff
  }

  return (
    <Grid className={classes.container}>
      <FormLabel
        component="legend"
        className={`${classes.photoField} ${
          !disabled && mandatory ? classes.mandatory : null
        }`}
      >
        {title || t('work_orders.trips.notes')}
      </FormLabel>
      {disabled
        ? (
        <FormLabel
          classes={{
            root: notes ? classes.notes : classes.fieldMessage
          }}
        >
          {notes ||
            (notAvailable
              ? t('general.labels.not_available')
              : t('work_orders.checkout_message'))}
        </FormLabel>
          )
        : !expanded && !notes
            ? (
        <AddButton label={title} callback={() => setExpanded(true)} />
              )
            : type === 'number'
              ? (
        <div className={classes.numberContainer}>
          <NumberFormat
            thousandSeparator
            allowEmptyFormatting
            decimalScale={2}
            decimalSeparator="."
            value={value}
            onChange={handleChangeValues}
            onBlur={value !== notes ? () => onBlur(value) : null}
            className={`${classes.numberField}`}
            onFocus={removeSuffix}
          />
          {value && (
            <InputAdornment position="end" className={classes.clearIconNumber}>
              <IconButton
                onClick={() => {
                  handleChangeValues({ target: { value: '' } })
                  onUpdate('')
                }}
                className={classes.icon}
                size="small"
              >
                <FontAwesomeIcon icon={faCircleXmark} size="xs" />
              </IconButton>
            </InputAdornment>
          )}
        </div>
                )
              : (
        <TextField
          className={`${classes.textField}`}
          multiline
          maxRows={10}
          minRows={4}
          value={value}
          type={type}
          onChange={handleChangeValues}
          onFocus={removeSuffix}
          onBlur={value !== notes ? () => onUpdate(value) : null}
          InputProps={{
            endAdornment: value && (
              <InputAdornment position="end" className={classes.clearIcon}>
                <IconButton
                  onClick={() => {
                    handleChangeValues({ target: { value: '' } })
                    onUpdate('')
                  }}
                  className={classes.icon}
                  size="small"
                >
                  <FontAwesomeIcon icon={faCircleXmark} size="xs" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
                )}
    </Grid>
  )
}
