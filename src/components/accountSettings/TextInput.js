import React, { useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { HighlightOff } from '@mui/icons-material/'

import { useTranslation } from 'react-i18next'
import { TextInputClasses } from '../../styles/classes/AccountSettingsClasses'

// eslint-disable-next-line react/display-name
export const TextInput = React.forwardRef(
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
      endAdornment,
      ...rest
    },
    ref
  ) => {
    const classes = TextInputClasses()
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
              onKeyUp={handleChange}
              size="small"
              variant="filled"
              margin="normal"
              inputRef={inputRef}
              InputProps={{
                className: classes.textField,
                style: inputStyle,
                disableUnderline: true,
                endAdornment: endAdornment && (
                      <InputAdornment position="end">
                          {value && (
                              <IconButton
                                  aria-label="Clear contents"
                                  tabIndex="-1"
                                  onClick={() => {
                                    handleChange({ target: { name: name, value: '' } }, id)
                                  }}
                                  className={classes.icon}
                                  size="small"
                              >
                                  <HighlightOff p={0}/>
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
