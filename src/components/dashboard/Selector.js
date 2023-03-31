import React, { useEffect, useState } from 'react'

/** Material UI **/
import {
  FormControl,
  FormLabel,
  InputBase,
  MenuItem,
  Select,
  styled,
  Typography,
  useTheme
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    backgroundColor: theme.colors.lightGrey,
    fontSize: '12px',
    padding: '7px 26px 7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  }
}))

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  text: {
    textAlign: 'initial',
    fontStyle: 'normal'
  },
  label: {
    fontSize: '12px',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px'
  },
  itemContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  error: {
    fontSize: '10px',
    color: theme.colors.errorText,
    textAlign: 'left',
    marginLeft: '15px'
  },
  iconMargin: {
    marginRight: '7px',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0'
    }
  },
  required: {
    color: theme.colors.errorText
  },
  highlightField: {
    border: '1px solid ' + theme.colors.errorText,
    borderRadius: '8px'
  },
  normalField: {
    border: '1px solid ' + theme.colors.profile.border_input,
    borderRadius: '8px'
  },
  selected: {
    backgroundColor: theme.colors.white + ' !important'
  }
}))

export default function GlobalSelect (props) {
  const classes = useStyles()
  const {
    label,
    field,
    index,
    onChange,
    options,
    placeholder,
    multiple,
    displayValue,
    error,
    helperText,
    validate,
    uniqValue,
    disabled,
    required
  } = props
  const [fieldError, setFieldError] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    if (!props.value && required) {
      setFieldError(true)
    }
  }, [])

  const handleChange = event => {
    if (event.target.value.length === 0 && required) {
      setFieldError(true)
    } else {
      setFieldError(false)
    }
    if (validate) {
      onChange(event)
      return
    }
    onChange(event.target.value, field, index)
  }
  const getLabel = value => {
    if (!value) return ''
    const itemSelected = options.find(item => item.value === value)
    return itemSelected?.label || ''
  }

  const showSelectedStatus = item => {
    const currentValue = props.value
    if ((props.multiple && currentValue?.length && currentValue) || currentValue) {
      return currentValue.includes(item)
    }
    return false
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      {label && (
        <Typography id="text-label" className={classes.label}>
          {required && <span className={classes.required}>*</span>}
          {label}
        </Typography>
      )}
      <Select
        className={
          required && fieldError ? classes.highlightField : classes.normalField
        }
        {...props}
        onChange={handleChange}
        disabled={disabled}
        classes={{ icon: classes.iconMargin }}
        input={<BootstrapInput />}
        displayEmpty
        renderValue={selected => {
          if (!selected || selected?.length === 0) {
            return <em className={classes.text}>{placeholder}</em>
          }
          if (uniqValue) {
            return uniqValue
          }
          if (multiple) {
            return selected?.join(', ')
          } else {
            if (displayValue) return getLabel(selected)
            return selected
          }
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          getContentAnchorEl: null
        }}
      >
        {!!options?.length &&
          options.map((item, index) => (
            <MenuItem
              key={index}
              value={item.value}
              style={{
                fontSize: '12px'
              }}
              classes={{ selected: classes.selected }}
            >
              <div className={classes.itemContent}>
                <div>{item.label}</div>
                {showSelectedStatus(item.value) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    style={{
                      fontSize: '14px',
                      color: theme.dashboard.checkIcon
                    }}
                  />
                )}
              </div>
            </MenuItem>
          ))}
      </Select>

      {error && <FormLabel className={classes.error}>{helperText}</FormLabel>}
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
