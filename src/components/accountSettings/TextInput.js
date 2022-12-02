import React, { useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { AutoCompleteAddress } from './AutoCompleteAddress'
import clsx from 'clsx'
import { textInputStyles } from '../../styles/classes/AccountSettingsClasses'

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
      ...rest
    },
    ref
  ) => {
    const classes = textInputStyles()
    const inputRef = useRef()
    const { t } = useTranslation()

    const handleChangeInt = event => {
      handleChange(event, id)
    }

    return (
      <FormControl style={{ width: '309px' }}>
        {id !== 'address' && (
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
                      <FontAwesomeIcon icon={faXmark} size="xs" />
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
        )}
        {id === 'address' && (
          <TextField
            id={id}
            name={name}
            key={id}
            value={value}
            onChange={handleChange}
            label={label}
            size="small"
            variant="filled"
            margin="normal"
            fullWidth
            inputRef={inputRef}
            InputProps={{
              className: clsx(
                classes.textField,
                value.length <= 0 ? classes.textFieldAnimation : ''
              ),
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
                      <FontAwesomeIcon icon={faXmark} size="xs" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              inputComponent: AutoCompleteAddress
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
        )}
      </FormControl>
    )
  }
)
