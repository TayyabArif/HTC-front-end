import { makeStyles } from '@mui/styles'

export const createAccountStyles = makeStyles((theme) => ({
  mainItem: {
    maxWidth: '30em',
    [theme.breakpoints.down('md')]: {
      paddingTop: '1em'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '4em'
    }
  },
  gridContainer: {
    transform: 'scale(0.80)'
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
  customField: {
    marginTop: '0px',
    fontSize: '20px',
    fontWeight: '400',
    '& fieldset': {
      borderRadius: '40px',
      border: `1px solid ${theme.colors.inputBorder}`,
      borderWidth: '1px'
    }
  },
  linkBox: {
    width: 'max-content',
    display: 'flex'
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
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      marginTop: '0px',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '-10px'
    }
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
  link: {
    color: theme.palette.primary.text,
    textDecoration: 'none',
    margin: 'auto',
    fontSize: '16px'
  },
  emailErrors: {
    marginTop: 0,
    color: theme.colors.errorText
  }
}))
