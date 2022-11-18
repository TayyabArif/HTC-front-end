import { React, useRef, useState } from 'react'

// mui components
import {
  makeStyles,
  FormLabel,
  TextField,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles(theme => ({
  userContainer: {
    borderColor: theme.colors.disabledField,
    borderRadius: '36px',
    marginBottom: '10px'
  },
  column: {
    flex: 1
  },
  title: {
    fontSize: '12px',
    color: theme.colors.grey
  },
  input: {
    '& .MuiInputBase-input': {
      borderRadius: 45,
      position: 'relative',
      border: '1px solid ' + theme.colors.profile.border_input,
      fontSize: 12,
      width: '100%',
      padding: '10px'
    }
  }
}))

export const Selector = props => {
  const { title, value, setValue } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const inputRef = useRef()
  const { t } = useTranslation()

  const handleOpen = event => {
    if (props.disabled) return
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <FormControl
      variant="filled"
      className={classes.userContainer}
      disabled={props.disabled}
    >
      <FormLabel className={classes.title}>{title}</FormLabel>
      <TextField
        id={title}
        placeholder={`${t('account_settings.form.enter')} ${title}`}
        name={title}
        size="small"
        variant="filled"
        ref={inputRef}
        value={value}
        onClick={handleOpen}
        onClose={handleClose}
        autoComplete="off"
        className={classes.input}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <FontAwesomeIcon
                icon={['fas', 'caret-down']}
                className={classes.icon}
              />
            </InputAdornment>
          )
        }}
      />
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          onClose={handleClose}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {props.options.map(option => (
            <MenuItem
              key={option.id}
              value={option.id}
              classes={{ root: classes.menuItem }}
              onClick={() => {
                setValue(option.id)
                handleClose()
              }}
              style={{ width: inputRef.current.clientWidth }}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
      )}
    </FormControl>
  )
}
