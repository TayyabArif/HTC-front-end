/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

/** Material UI **/
import {
  Box,
  Button,
  IconButton,
  Link
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { uploadFileStyles } from '../../styles/classes/FormClasses'

export default function GlobalUploadFile (props) {
  const classes = uploadFileStyles()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.error) setLoading(false)
  }, [props.value, props.error])

  const handleChange = event => {
    setLoading(true)
    props.onChange(event?.target?.files[0], props.field)
  }

  const handleClick = event => {
    props.handleClear(props.field)
    setLoading(false)
  }

  const handleFileDownload = event => {
    props.handleFileDownload(event, props.value)
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      <InputLabel shrink className={classes.label}>
        {props.required && <span className={classes.required}>*</span>}
        {props.label}
      </InputLabel>
      {props.value && !props.error
        ? (
          <Box className={classes.linkContainer}>
            <Link
              className={classes.fileData}
              onClick={async event => await handleFileDownload(event)}
              underline="hover"
              target="_blank"
              rel="noopener"
            >
              {props.fileName ?? 'file'}
            </Link>
            <IconButton
              size="small"
              className={classes.removeButton}
              onClick={handleClick}
            >
              <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
            </IconButton>
          </Box>
        )
        : (
          <Button
            id="bootstrap-input"
            variant="contained"
            component="label"
            disabled={loading}
            className={
              props.error
                ? classes.buttonError
                : props.required
                  ? classes.buttonRequired
                  : classes.button
            }
          >
            {loading
              ? props.loadingLabel
              : props.error
                ? props.helperText
                : props.buttonLabel}
            <input
              hidden
              accept={props.accept}
              multiple
              type="file"
              onChange={handleChange}
            />
          </Button>
        )}
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
