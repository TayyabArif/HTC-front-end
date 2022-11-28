import React, { forwardRef, useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'

import { useTranslation } from 'react-i18next'

import { NumericFormat as NumberFormat } from 'react-number-format'
import { HighlightOff } from '@mui/icons-material'
import { PhoneInputClasses } from '../../styles/classes/AccountSettingsClasses'

const NumberFormatCustom = forwardRef(function NumberFormatCustom (props, ref) {
  const { onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      format="(###) ### ####"
    />
  )
})

// eslint-disable-next-line react/display-name
export const PhoneInput = React.forwardRef(
  (
    {
      handleChange,
      id,
      name,
      value,
      placeholder,
      error,
      helperText,
      type,
      label,
      inputStyle,
      ...rest
    },
    ref
  ) => {
    const classes = PhoneInputClasses()
    const inputRef = useRef()
    const { t } = useTranslation()

    const handleChangeInt = event => {
      handleChange(event, id)
    }

    return (
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          id={id}
          name={name}
          key={id}
          value={value}
          label={label}
          onChange={handleChange}
          size="small"
          variant="filled"
          margin="normal"
          inputRef={inputRef}
          InputProps={{
            inputComponent: NumberFormatCustom,
            className: classes.textField,
            style: inputStyle,
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                {value && (
                  <IconButton
                    aria-label="Clear contents"
                    onClick={() => {
                      handleChange({ target: { name: name, value: '' } }, id)
                    }}
                    className={classes.icon}
                    size="small"
                  >
                    <HighlightOff />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            className: classes.label
          }}
          placeholder={
            placeholder ? t('account_settings.form.enter') + ' ' + label : ''
          }
          classes={{ root: classes.root }}
          autoComplete="off"
          error={error}
          helperText={helperText}
          ref={ref}
          type={type ?? 'text'}
          onInput={handleChangeInt}
          {...rest}
        />
      </FormControl>
    )
  }
)
