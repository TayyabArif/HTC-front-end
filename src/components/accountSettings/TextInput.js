import React, { useRef } from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { HighlightOff } from '@mui/icons-material/'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFilledInput-input': {
      fontFamily: 'Rubik',
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.text} !important`,
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px',
      fontSize: '10.7px'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      borderRadius: '6px'
    },
    '& .MuiIconButton-sizeSmall': {
      marginLeft: '0px'
    },
    '& .MuiIconButton-sizeSmall:hover': {
      backgroundColor: theme.colors.signInButton.background
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: 0
    },
    '& .MuiFormLabel-root': {
      color: theme.colors.settings.fieldName,
      top: '4px',
      fontSize: '16px'
    },
    '& .Mui-focused': {
      color: theme.colors.tab.duedate
    },
    '& .MuiFormHelperText-root': {
      fontSize: '10px'
    },
    '& .MuiInputBase-input': {
      fontSize: '16px'
    },
    marginTop: 'unset',
    marginBottom: '12px',
    flex: 1
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.tab.duedate
  },
  textField: {
    height: '52px',
    backgroundColor: theme.colors.signInButton.background
  },
  textFieldAnimation: {
    '& input': {
      '&.pac-target-input': {
        animationName: 'none'
      }
    }
  },
  icon: {
    color: theme.colors.company.iconColor,
    '& svg': {
      fontSize: '25px'
    },
    '&.MuiButtonBase-root': {
      padding: '0px'
    }
  },
  formControl: {
    '& .MuiFormControl-root': {
      margin: 0
    }
  }
}))

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
    const classes = useStyles()
    const inputRef = useRef()
    const { t } = useTranslation()

    const handleChangeInt = event => {
      handleChange(event, id)
    }

    return (
      <FormControl fullWidth className={classes.formControl}>
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
              endAdornment: endAdornment && (
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
        )}
      </FormControl>
    )
  }
)
