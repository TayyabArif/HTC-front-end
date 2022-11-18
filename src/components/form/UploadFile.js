/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

/** Material UI **/
import {
  Box,
  Button,
  IconButton,
  // InputAdornment,
  Link,
  makeStyles
  // OutlinedInput
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  button: {
    backgroundColor: theme.colors.iconBlue,
    color: theme.colors.white,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em'
  },
  buttonError: {
    backgroundColor: theme.colors.white,
    color: theme.colors.errorColor,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em',
    border: '1px dashed ' + theme.colors.errorColor
  },
  removeButton: {
    fontSize: '12px'
  },
  input: {
    borderRadius: 45,
    padding: '0.6em',
    borderColor: theme.colors.profile.border_input,
    'label + &': {
      marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      fontSize: 12
    },
    '& .MuiOutlinedInput-input': {
      padding: '0px'
    }
  },
  error: {
    marginLeft: '5px',
    marginTop: '0.5em',
    fontSize: '10px',
    color: theme.colors.errorText
  },
  label: {
    marginTop: '0.1em',
    fontSize: '12px',
    color: theme.colors.labels,
    marginLeft: '5px'
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginTop: '2.05em',
    border: '1px solid ' + theme.colors.profile.border_input,
    padding: '0.8em',
    borderRadius: 45,
    minWidth: '15em',
    alignItems: 'center'
  },
  fileData: {
    maxWidth: '12em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingLeft: '0.3em'
  },
  required: {
    color: theme.colors.errorText
  },
  buttonRequired: {
    backgroundColor: theme.colors.iconBlue,
    color: theme.colors.white,
    border: '1px solid ' + theme.colors.errorText,
    textTransform: 'none',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '100px',
    marginTop: '2em',
    padding: '1em',
    minWidth: '8em'
  }
}))

export default function GlobalUploadFile(props) {
  const classes = useStyles()
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
      {props.value && !props.error ? (
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
      ) : (
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
