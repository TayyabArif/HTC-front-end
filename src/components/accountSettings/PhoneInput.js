import React, { useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { conformToMask } from 'react-text-mask'
import { phoneInputStyles } from '../../styles/classes/AccountSettingsClasses'

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

    const maskValue = (value) => {
      const result = conformToMask(
        value,
        ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
        { guide: false }
      )
      return result.conformedValue
    }

    return (
      <FormControl style={{ marginLeft: '0px' }}>
        <TextField
          id={id}
          name={name}
          key={id}
          value={maskValue(value ?? '')}
          label={label}
          onChange={handleChange}
          size="small"
          variant="filled"
          margin="normal"
          inputRef={inputRef}
          InputProps={{
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
            className: classes.label,
            shrink: true
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
      </FormControl >
    )
  }
)
