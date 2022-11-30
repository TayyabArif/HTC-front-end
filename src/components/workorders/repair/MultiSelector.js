import React, { useRef, useState } from 'react'
import {
  Divider,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  textField: {
    minHeight: '52px',
    fontSize: '14px',
    width: '313px',
    backgroundColor: theme.colors.signInButton.background,
    color: theme.colors.text
  },
  label: {
    marginTop: 'unset',
    fontSize: 10,
    borderRadius: '8px',
    color: theme.colors.workOrders.tab.duedate,
    backgroundColor: theme.colors.signInButton.background
  },
  root: {
    '& .MuiFilledInput-input': {
      border: `1px solid ${theme.colors.signInButton.background}`,
      color: `${theme.colors.iconBlue} !important`,
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: theme.colors.signInButton.background,
      cursor: 'pointer'
    },
    '& .MuiFilledInput-underline:before': {
      border: 'transparent'
    },
    '& .MuiFilledInput-underline:after': {
      border: 'transparent'
    },
    '& .MuiFilledInput-multiline': {
      paddingTop: '15px',
      paddingBottom: '15px'
    },
    marginBottom: '12px'
  },
  selectedItem: {
    '& .MuiFilledInput-input': {
      color: `${theme.colors.basicDisabledButtonColor} !important`,
      lineHeight: '20px'
    }
  },
  input: {
    marginTop: 'unset',
    marginBottom: '12px'
  },
  icon: {
    color: theme.colors.company.iconColor,
    right: '12px',
    position: 'absolute',
    top: '20px'
  },
  menuItem: theme.filtersClasses.selectItem,
  menu: {
    '& .MuiPaper-root': {
      borderRadius: '12px'
    }
  },
  divider: {
    backgroundColor: theme.colors.grey_2,
    marginLeft: '3px',
    marginRight: '3px'
  },
  selectedIcon: {
    marginRight: '0px',
    marginLeft: 'auto',
    color: theme.colors.mainBlue
  }
}))

export const Selector = React.forwardRef(props => {
  const classes = useStyles({ disabled: props.disabled })
  const [anchorEl, setAnchorEl] = useState(null)
  const inputRef = useRef()
  const { t } = useTranslation()
  const [list, setList] = useState(props.options || [])

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    props.handleChange(list)
    setAnchorEl(null)
  }

  const handleChangeValues = event => {
    const value = event.target.value
    const currentTask = list.filter(t => t.id === value)[0]
    const isUniqueOption = !!currentTask.unique_option
    let unCheckAll = false
    setList([
      ...list
        .map(listItem => {
          if (listItem.id !== currentTask.id) return listItem
          listItem.selected = !listItem.selected
          if (isUniqueOption && listItem.selected === true) unCheckAll = true
          return listItem
        })
        .map(listItem => {
          if (!unCheckAll) {
            if (listItem.unique_option) listItem.selected = false
          } else if (!listItem.unique_option) listItem.selected = false
          return listItem
        })
    ])
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <TextField
        id={props.id}
        name={props.id}
        size="small"
        variant="filled"
        ref={inputRef}
        label={props.label}
        value={props.value || t('general.labels.select')}
        onClick={handleOpen}
        onClose={handleClose}
        disabled
        multiline={props.multiple}
        autoComplete="off"
        className={`${classes.root} ${props.value ? classes.selectedItem : ''}`}
        InputLabelProps={{ className: classes.label }}
        InputProps={{
          className: classes.textField,
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
          className={classes.menu}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {list.map((option, idx) => (
            <>
              <MenuItem
                key={option.id}
                value={option.id}
                className={classes.menuItem}
                onClick={() => {
                  handleChangeValues({
                    target: { name: props.id, value: option.id }
                  })
                  if (!props.multiple) handleClose()
                }}
                style={{ width: inputRef.current.clientWidth }}
              >
                {option.name}
                {option.selected && (
                  <FontAwesomeIcon
                    icon={['far', 'check']}
                    className={classes.selectedIcon}
                  />
                )}
              </MenuItem>
              {idx !== props.options.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </Menu>
      )}
    </FormControl>
  )
})

Selector.displayName = 'Selector'
