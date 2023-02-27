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
