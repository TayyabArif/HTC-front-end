import React, { useEffect, useRef, useState } from 'react'

/** Material UI **/
import { Box, makeStyles, Typography } from '@material-ui/core'
import FormControl from '@mui/material/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import customTheme from '../../styles/mui_theme'
import { BootstrapSelectContainer } from '../../styles/mui_custom_components'
import GlobalInput from './TextInput'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  text: {
    textTransform: 'none',
    fontSize: '12px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  label: {
    color: customTheme.colors.grey,
    fontSize: '12px',
    marginBottom: '0.5em',
    textAlign: 'left',
    marginLeft: '5px'
  },
  itemContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '0.5em'
  },
  error: {
    fontSize: '10px',
    color: theme.colors.errorText
  },
  multiselectContent: {
    borderColor: theme.colors.buttonGrey,
    border: '1px solid',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8
  },
  multiselectZip: {
    maxHeight: 375,
    overflow: 'auto'
  }
}))

export default function GlobalPaginatingList(props) {
  const classes = useStyles()
  const listInnerRef = useRef()
  const { t } = useTranslation()
  const { label, onChange, options, value } = props
  const [page, setPage] = useState(1)
  const [paginatedList, setPaginatedList] = useState([])
  const [endReached, setEndReached] = useState(false)
  const [listSize, setListSize] = useState(0)
  const listElements = 50

  useEffect(() => {
    // Make sure updating the list doesn't reset the pagination but filtering does
    if (listSize !== options.length) {
      setListSize(options.length)
      setPage(1)
      setEndReached(false)
      setPaginatedList(options.slice(0, listElements))
      return
    }
    setPaginatedList(options.slice(0, page * listElements))
  }, [options])

  const handleChange = item => {
    const index = value.indexOf(item)
    const newSelection = [...value]
    if (index === -1) {
      onChange([...newSelection, item])
    } else {
      if (newSelection.length > 1) {
        newSelection.splice(index, 1)
        onChange(newSelection)
      }
    }
  }

  const showSelectedStatus = item => {
    if (props.multiple && value?.length) {
      return value.includes(item)
    }
    return false
  }

  const onScroll = () => {
    if (endReached) return
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
        const nextPage = page + 1
        setPage(nextPage)
        const newData = options.slice(0, nextPage * listElements)
        if (newData.length === options.length) {
          setEndReached(true)
        }
        setPaginatedList([...newData])
      }
    }
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      {label ? (
        <Typography id="text-label" className={classes.label}>
          {label}
        </Typography>
      ) : (
        ''
      )}
      <Box
        className={[classes.multiselectContent, classes.multiselectZip]}
        ref={listInnerRef}
        onScroll={onScroll}
      >
        {!!paginatedList?.length &&
          paginatedList.map(item => (
            <BootstrapSelectContainer
              key={item.value}
              onClick={() => handleChange(item.value)}
              className={[classes.itemContent]}
            >
              <div className={classes.text}>
                <div>{item.label}</div>
                {showSelectedStatus(item.value) && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    style={{
                      fontSize: '14px',
                      color: customTheme.colors.checkBlue
                    }}
                  />
                )}
              </div>
            </BootstrapSelectContainer>
          ))}
        {paginatedList.length === 0 && (
          <GlobalInput
            value={t('general.messages.errors.no_results')}
            disabled
          />
        )}
      </Box>

      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
