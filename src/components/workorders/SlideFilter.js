/* eslint-disable multiline-ternary */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  FormControl,
  Menu,
  MenuItem,
  OutlinedInput
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { slideFilterStyles } from '../../styles/classes/WorkOrdersClasses'

export const SlideFilter = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [values, setValues] = useState(props.values[props.id] ?? '')
  const [label, setLabel] = useState('')

  const classes = slideFilterStyles()
  const { t } = useTranslation()
  const inputRef = useRef()

  const observer = useRef()
  const lastMenuElement = useCallback(
    node => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (
          entries[0].isIntersecting &&
          props.hasMore &&
          Object.prototype.hasOwnProperty.call(props, 'setPage')
        ) {
          props.setPage(prevTablePage => prevTablePage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [props.hasMore]
  )

  useEffect(() => {
    if (props.values[props.id] !== undefined) {
      setValues(props.values[props.id])
    }
  }, [props.values[props.id]])

  useEffect(() => {
    props.setValues(prevState => ({ ...prevState, [props.id]: values }))
    setLabelValue()
  }, [values])

  const setLabelValue = () => {
    setLabel(
      values === '' || values.split('|').length === props.options.length
        ? t('work_orders.toggle_labels.all')
        : values.split('|').length > 1
          ? t('work_orders.toggle_labels.custom')
          : titleCase(values)
    ) /* TODO: GET FROM LABELS NOT FROM VALUES */
  }

  const titleCase = str => {
    const splitStr = str.replace('_', ' ').toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeSwitch = (obj, event) => {
    event.preventDefault()
    if (obj === 'all') {
      if (values !== '' && values.split('|').length === props.options.length) {
        setValues('', props.id)
      } else {
        setValues(props.options.map(opt => opt.value).join('|'))
      }
    } else {
      const auxArray = values.split('|')
      if (values.length > 0) {
        let flag = -1
        auxArray.forEach((strFilter, ind) => {
          if (strFilter === obj) flag = ind
        })
        if (flag !== -1) {
          auxArray.splice(flag, 1)
        } else {
          auxArray.push(obj)
        }
        setValues(auxArray.join('|'), props.id)
      } else {
        setValues(obj, props.id)
      }
    }
  }
  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        id="trade"
        key={props.id}
        value={label}
        placeholder={props.placeholder}
        onClick={handleOpen}
        className={props.type === 1 ? classes.mainInput1 : classes.mainInput2}
        autoComplete="off"
        readOnly
        endAdornment={<FontAwesomeIcon icon={faAngleDown} />}
        ref={inputRef}
      />
      {anchorEl ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={true}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className={classes.mainMenu}
        >
          {[
            ...(props.hasAll ? [{ label: 'All', value: 'all' }] : []),
            ...props.options
          ]?.map((obj, ind) => (
            <MenuItem
              ref={props.options.length - 1 === ind ? lastMenuElement : null}
              key={props.id + ind}
              value={obj.value}
              classes={{ root: classes.menuItem }}
              onClick={event => handleChangeSwitch(obj.value, event)}
            >
              {obj.label}
              {((values !== '' &&
                values.split('|').length === props.options.length) ||
                values.split('|').includes(obj.value)) && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={classes.switch}
                />
              )}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </FormControl>
  )
}
