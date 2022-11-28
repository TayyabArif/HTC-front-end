import React, { forwardRef, useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTranslation } from 'react-i18next'

import { NumericFormat } from 'react-number-format'
import { phoneInputStyles } from '../../styles/classes/AccountSettingsClasses'

const NumberFormatCustom = forwardRef(function NumberFormatCustom (props, ref) {
  const { onChange, ...other } = props
  return (
    <NumericFormat
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
    const classes = phoneInputStyles()
    const inputRef = useRef()
    const { t } = useTranslation()

    const handleChangeInt = event => {
      handleChange(event, id)
    }

    return (
      <FormControl style={{ marginLeft: '0px' }}>
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
                    <FontAwesomeIcon icon={['far', 'xmark']} size="xs" />
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
