import React, { useState, useEffect } from 'react'
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons'
import { inputFieldFilterStyles } from '../../styles/classes/WorkOrdersClasses'

export const InputFieldFilter = props => {
  const classes = inputFieldFilterStyles()
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (props.values[props.id] === '') {
      setSearch('')
    }
    if (props.values) {
      setSearch(props.values[props.id])
    }
  }, [props.isOpen, props.values[props.id]])

  const handleChange = event => {
    setSearch(event.target.value)
  }

  const handleEnter = event => {
    if (event.keyCode === 13) {
      props.setValues(prevState => ({
        ...prevState,
        [props.id]: search
      }))
    }
  }

  const handleClearSearch = () => {
    setSearch('')
    props.setValues(prevState => ({
      ...prevState,
      [props.id]: ''
    }))
  }

  const handleBlurSearch = event => {
    /* Blur delayed if clear exists */
    setTimeout(() => {
      props.setValues(prevState => ({
        ...prevState,
        [props.id]: search
      }))
    }, 100)
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        id="component-outlined"
        key={props.id}
        value={search}
        placeholder={props.placeholder}
        onChange={handleChange}
        onKeyDown={handleEnter}
        onBlur={handleBlurSearch}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClearSearch}>
              {search && search.length > 0
                ? (
                <FontAwesomeIcon icon={faTimes} fontSize="small" />
                  )
                : (
                <div />
                  )}
            </IconButton>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              fontSize="small"
              color="grey"
            />
          </InputAdornment>
        }
        type="tel"
        classes={{
          root: props.type === 1 ? classes.mainInput1 : classes.mainInput2
        }}
        autoComplete="off"
        style={{
          paddingRight: '0px'
        }}
      />
    </FormControl>
  )
}
