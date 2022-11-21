/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

/** Material UI **/
import { Box, Chip } from '@mui/material'
import GlobalInput from './TextInput'
import { useTranslation } from 'react-i18next'
import { chipStyles } from '../../styles/classes/FormClasses'

export default function GlobalChip (props) {
  const classes = chipStyles()
  const [chips, setChips] = useState(props.chips)
  const { t } = useTranslation()

  useEffect(() => {
    handleSelectionChanged(chips[0])
  }, [])

  function handleSelectionChanged (id, event) {
    const newSet = new Set(props.selected)
    if (newSet.has(id)) {
      if (newSet.size > 1) {
        // filter chips selected
        newSet.delete(id)
        if (props.removeItem) props.removeItem(id)
      }
    } else {
      newSet.add(id)
    }
    props.setSelected(newSet)
  }

  // function for search input
  function handleFilterChange (value) {
    const result = value
      ? chips.filter(chip => chip.toLowerCase().includes(value.toLowerCase()))
      : props.chips
    setChips(result)
  }

  return (
    <Box display="flex" flexDirection="column">
      {props.searchVisible && (
        <Box width="260px" marginTop="1em">
          <GlobalInput
            placeholder="Search trades"
            onChange={handleFilterChange}
          />
        </Box>
      )}
      <Box role="group" className={classes.chipContainer}>
        {chips?.map(c => (
          <Chip
            key={c}
            onClick={event => handleSelectionChanged(c, event)}
            variant="outlined"
            label={
              props.skipTranslate
                ? c
                : t('company_profile.' + props.parent + '.' + c)
            }
            className={
              props.selected?.has(c) ? classes.chipSelected : classes.chip
            }
          ></Chip>
        ))}
      </Box>
    </Box>
  )
}
