/* eslint-disable no-undef */
import React from 'react'

/** Material UI **/
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import customTheme from '../../styles/mui_theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    minWidth: '100%',
    borderRadius: 45,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? 'white' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
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
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    },
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: customTheme.colors.profile.text_grey,
      opacity: '1'
    }
  }
}))

const useStyles = makeStyles(theme => ({
  bottomSpacing: {
    marginBottom: 10
  },
  addButton: {
    background: customTheme.colors.iconBlue,
    color: 'white',
    textTransform: 'none',
    fontSize: '7px',
    fontWeight: '400',
    lineHeight: '14px',
    borderRadius: '35px',
    padding: '2px 12px',
    marginBottom: '1em',
    minWidth: '45%',
    '&.Mui-disabled': {
      backgroundColor: customTheme.colors.basicDisabledButtonBackground
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: '20px'
    }
  },
  removeButton: {
    fontSize: '12px',
    marginBottom: '4px',
    marginLeft: '75%'
  },
  inputContainer: {
    width: '100%'
  },
  label: {
    fontSize: 12,
    marginBottom: '0.5em',
    color: customTheme.colors.labels
  },
  inputRoot: {
    width: '100%',
    paddingRight: '25px'
  }
}))

export default function GlobalInputButtons(props) {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleChange = event => {
    props.onChange(event.target.value, props.field, props.index)
  }

  const handleButtonAdd = event => {
    props.handlebuttonadd()
  }
  const handleButtonRemove = event => {
    props.handlebuttonremove(props.index)
  }

  return (
    <FormControl variant="standard" fullWidth={true}>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box flex={2}>
            <Typography className={classes.label}>{props.label}</Typography>
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            {props.index === 0 ? (
              <Button
                className={classes.addButton}
                onClick={handleButtonAdd}
                size="small"
                disabled={props.buttonenabled}
              >
                {t('general.labels.add')}
              </Button>
            ) : (
              <IconButton
                onClick={handleButtonRemove}
                size="small"
                className={classes.removeButton}
              >
                <FontAwesomeIcon icon="fa-regular fa-circle-xmark" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Box className={classes.inputContainer}>
        <Box>
          <BootstrapInput
            {...props}
            onChange={handleChange}
            id="bootstrap-input"
            className={classes.inputRoot}
          />
        </Box>
      </Box>
      <div className={classes.bottomSpacing}></div>
    </FormControl>
  )
}
