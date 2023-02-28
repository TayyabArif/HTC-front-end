import { makeStyles } from '@mui/styles'

export const signInStyles = makeStyles((theme) => ({
  mainContainer: {
    margin: '0px !important',
    padding: '0px !important',
    maxWidth: '1980px !important'
  },
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.up('md')]: {
      padding: '0px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px 15px'
    }
  },
  signMessage: {
    marginTop: '15px !important',
    fontWieght: '300 !important',
    [theme.breakpoints.up('md')]: {
      fontSize: '14px !important'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '12px !important'
    }
  },
  connectIcon: {
    width: '100%',
    margin: '0px auto',
    position: 'relative'
  },
  icon: {
    top: '-1px',
    width: '24px',
    height: '24px',
    position: 'relative'
  },
  iconSpan: {
    width: '24px',
    height: '26px'
  },
  title: {
    fontWeight: '700',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px'
    }
  },
  subtitle: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  buttons: {
    width: '100%',
    margin: '0px auto',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(4)
    }
  },
  link: {
    fontWeight: '400',
    color: theme.colors.text,
    textDecoration: 'none',
    fontFamily: 'Rubik',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '14px'
    }
  },
  linkBox: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '6px'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '10px'
    },
    paddingRight: '6px'
  },
  rememberMe: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '14px !important'
    }
  },
  errorMessage: {
    color: `${theme.colors.errorText} !important`,
    fontWeight: '300 !important',
    fontSize: '14px !important'
  },
  terms: {
    fontWeight: '400 !important',
    fontSize: '14px !important',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  linkTerms: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  signWith: {
    width: '100% !important',
    fontSize: '20px !important',
    padding: '6px 10px',
    borderRadius: '15px !important'
  },
  signWithGrid: {
    width: '100%',
    fontSize: '20px',
    [theme.breakpoints.down('md')]: {
      padding: '4px 16px !important'
    },
    [theme.breakpoints.up('md')]: {
      padding: '16px !important'
    }
  },
  boxSignWith: {
    [theme.breakpoints.down('md')]: {
      marginTop: '15px'
    },
    [theme.breakpoints.up('md')]: {
      width: '570px',
      margin: '40px auto 0px auto',
      paddingLeft: '3%'
    }
  },
  fields: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '36px',
      fontSize: '14px',
      height: '36px'
    },
    '& .MuiFormControl-root': {
      width: '530px'
    },
    '& .MuiInputBase-root': {
      '& input': {
        WebkitBoxShadow: '0 0 0 1000px white inset'
      }
    }
  },
  requestButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '211px'
    }
  },
  singButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '129px'
    }
  },
  rememberForgot: {
    width: '100%',
    margin: '0px auto'
  },
  signinIcon: {
    width: '310px'
  },
  signDivider: {
    margin: '40px auto !important',
    width: '98%'
  },
  contactUs: {
    fontSize: '14px !important',
    fontWeight: '400 !important',
    marginTop: '6px !important'
  },
  version: {
    fontSize: '20px !important',
    fontWeight: '300 !important'
  },
  signForm: {
    [theme.breakpoints.up('md')]: {
      padding: '0px 50px'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px'
    }
  }
}))

export const forgotPassStyles = makeStyles((theme) => ({
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1em'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '4em'
    }
  },
  subtitle: {
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      display: 'block',
      lineHeight: '21px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '16px'
  },
  title: {
    '&.MuiTypography-root': {
      fontWeight: '700',
      fontFamily: 'Rubik Bold',
      lineHeight: 1.5,
      [theme.breakpoints.down('md')]: {
        fontSize: '24px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '30px'
      }
    }
  },
  emailField: {
    marginTop: '0px',
    fontSize: '20px',
    fontWeight: '400',
    '& fieldset': {
      borderRadius: '40px',
      border: `1px solid ${theme.colors.inputBorder}`,
      borderWidth: '1px'
    }
  },
  sendButton: {
    height: '61px',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '5em'
    }
  },
  sendButtonBox: {
    marginTop: '21px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '-10px'
    }
  },
  linkBox: {
    width: 'max-content',
    display: 'flex'
  },
  fieldsOutlined: {
    [theme.breakpoints.down('md')]: {
      borderRadius: '4px'
    },
    [theme.breakpoints.up('md')]: {
      borderRadius: '4px 0px 0px 4px',
      borderRight: 'none'
    },
    fontSize: '24px'
  },
  gridContainer: {
    transform: 'scale(0.80)'
  }
}))

export const forgotChangedStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: '70vh',
    transform: 'scale(0.80)'
  },
  title: {
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '24px',
      margin: '0px 30px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px'
    }
  },
  subtitle: {
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      margin: '10px 30px',
      display: 'block',
      lineHeight: '21px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px'
    }
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  resetButton: {
    [theme.breakpoints.down('md')]: {
      width: '60%',
      height: '58px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  buttonGrid: {
    width: '100%',
    textAlign: 'center'
  }
}))

export const forgotCodeStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: '70vh',
    transform: 'scale(0.80)'
  },
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1em'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '4em'
    }
  },
  icon: {
    width: '1em',
    position: 'relative',
    top: '-4px'
  },
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontWeight: '700',
      [theme.breakpoints.down('md')]: {
        fontSize: '20px',
        marginBottom: '10px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '30px'
      }
    }
  },
  buttons: {
    marginTop: theme.spacing(4)
  },
  fieldsOutlined: {
    borderRadius: '4px'
  },
  formBox: {
    [theme.breakpoints.down('md')]: {
      marginTop: '0px'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '32px'
    }
  },
  fields: {
    marginTop: '0px',
    fontSize: '20px',
    fontWeight: '400',
    '& fieldset': {
      borderRadius: '40px',
      border: `1px solid ${theme.colors.inputBorder}`,
      borderWidth: '1px'
    }
  },
  resetButton: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '58px'
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  buttonGrid: {
    width: '100%',
    textAlign: 'right'
  },
  errorMessage: {
    '&.MuiTypography-root': {
      color: theme.colors.errorText,
      fontWeight: '400',
      fontSize: '15px'
    }
  }
}))

export const forgotSentStyles = makeStyles((theme) => ({
  title: {
    '&.MuiTypography-root': {
      fontFamily: 'Rubik Bold',
      fontWeight: '700',
      fontSize: '26px'
    }
  },
  subtitle: {
    '&.MuiTypography-root': {
      fontWeight: '400',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px'
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '14px'
      },
      lineHeight: '17px',
      whiteSpace: 'pre-line'
    }
  },
  linkBox: {
    width: 'max-content',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      marginBottom: '20px'
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: '100px'
    }
  },
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '14px'
  }
}))
