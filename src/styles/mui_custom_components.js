import React from 'react'
import { withStyles } from '@mui/styles'
import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { Fab, InputBase, Paper, Tab, Tabs, OutlinedInput } from '@mui/material'

export const BasicButton = withStyles((theme) => ({
  root: {
    display: 'none',
    background: `${theme.colors.basicButtonBackground} !important`,
    color: `${theme.palette.primary.main} !important`,
    textTransform: 'unset !important',
    [theme.breakpoints.down('md')]: {
      borderRadius: '4px'
    },
    [theme.breakpoints.up('md')]: {
      border: `1px solid ${theme.palette.primary.main} !important`,
      borderRadius: '36px !important',
      fontSize: '18px !important',
      fontWeight: '700 !important',
      height: '58px !important',
      width: '209px !important'
    },
    paddingLeft: '15px',
    paddingRight: '15px',
    '& .MuiTouchRipple-root span': {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: `${theme.colors.basicButtonBackground} !important`
    }
  },
  contained: {
    boxShadow: '0 0 0 0'
  },
  label: {
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      color: theme.colors.basicDisabledButtonColor
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
      color: theme.palette.primary.main
    }
  }
}))(Button)

export const BasicSmallButton = withStyles((theme) => ({
  root: {
    background: theme.colors.basicButtonBackground,
    textTransform: 'unset !important',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  contained: {
    boxShadow: '0 0 0 0'
  },
  label: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: 14
  }
}))(Button)

export const HighlightButton = withStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'unset !important',
    paddingLeft: '35px',
    paddingRight: '35px',
    borderRadius: '36px !important',
    fontSize: '18px !important',
    fontWeight: '700 !important',
    height: '58px !important',
    width: '135px !important',
    zIndex: 999
  },
  contained: {
    boxShadow: '0 0 0 0'
  },
  label: {
    color: theme.colors.highlightButtonText,
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px'
    }
  }
}))(Button)

export const RoundedButton = styled(Button)(({ theme }) => `
  line-height: 21.33px;
  font-weight: 700;
  border-radius: 32px;
  width: 140px !important;
  color: ${theme.colors.textButton}
  text-transform: none;
  &.MuiButton-root {
    text-transform: none;
  }
  :active {
    color: ${theme.colors.highlightButtonText}
  }
`)

export const MapButton = withStyles({
  root: {
    background: '#FFFFFF',
    minWidth: '44px',
    width: '44px',
    height: '44px',
    textTransform: 'unset !important',
    paddingLeft: '0px',
    paddingRight: '0px',
    borderRadius: 8
  },
  label: {
    color: '#333333',
    fontWeight: 'bold'
  }
})(Fab)

export const MapCounter = withStyles({
  root: {
    background: '#FFFFFF',
    minWidth: 'fit-content',
    width: 'fit-content',
    paddingLeft: '12px',
    paddingRight: '12px',
    borderRadius: 8,
    paddingBottom: '5px'
  }
})(Paper)

export const SignInButton = withStyles((theme) => ({
  root: {
    background: `${theme.colors.signInButton.background} !important`,
    height: '71px !important',
    textTransform: 'unset !important',
    paddingLeft: '20px !important',
    paddingRight: '20px !important',
    color: `${theme.colors.signInButton.label} !important`
  },
  contained: {
    boxShadow: '0 0 0 0'
  },
  label: {
    color: `${theme.colors.signInButton.label} !important`
  }
}))(Button)

export const StyledNavTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 78,
      width: '100%',
      backgroundColor: theme.colors.tab.selected
    },
    transition: 'none'
  },
  root: {
    height: '40px',
    minHeight: 'unset !important',
    margin: 'auto 0px'
  }
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span/> }}/>)

export const StyledNavTab = withStyles((theme) => ({
  root: {
    minWidth: '70px',
    textTransform: 'none',
    color: props => theme.colors[props.color],
    fontWeight: '400',
    fontSize: '16px',
    '&:focus': {
      opacity: 1
    },
    transition: 'none'
  },
  selected: {
    color: `${theme.colors.tab.selected} !important`,
    fontWeight: '500'
  }
}))((props) => <Tab disableRipple {...props} />)

export const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: '10px !important',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.colors.locations.filters.fieldsBorder}`,
    fontSize: '10px !important',
    height: '13px !important',
    padding: '5px 12px 16px !important',
    paddingRight: '45px !important',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: '10px !important',
      backgroundColor: theme.palette.background.paper
    }
  }
}))(InputBase)

export const BootstrapInputNoBorders = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: '10px !important',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: '10px !important',
    height: '10px !important',
    padding: '2px 10px 11px !important',
    paddingRight: '35px !important',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: '10px !important',
      backgroundColor: theme.palette.background.paper
    }
  }
}))(InputBase)

export const StyledSiteViewTabs = withStyles((theme) => ({
  root: {
    minHeight: '46px'
  },
  indicator: {
    display: 'none'
  }
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span/> }}/>)

export const StyledSiteViewTab = withStyles((theme) => ({
  root: {
    minWidth: '70px',
    textTransform: 'none',
    color: theme.colors.locations.siteView.unselectedTabTextColor,
    fontWeight: '700',
    fontSize: '12px',
    '&:focus': {
      opacity: 1
    },
    backgroundColor: theme.colors.locations.siteView.unselectedTabColor
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.colors.locations.siteView.selectedTabTextColor
  }
}))((props) => <Tab disableRipple {...props} />)

export const MasqueradeIcon = (props) => {
  return (<svg width={props.width} height={props.height} viewBox="0 0 39 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.25 0.5C0.257812 0.5 3.91016 17 12.4609 17C14.1797 17 15.7695 16.1406 16.8008 14.6367L17.918 13.0039C18.2617 12.4883 18.7344 12.2734 19.25 12.2734C19.7656 12.2734 20.2812 12.4883 20.582 13.0039L21.6992 14.6367C22.7305 16.1406 24.3633 17 26.082 17C34.2031 17 38.543 0.5 19.25 0.5ZM26.082 14.7656C25.0078 14.7656 24.0195 14.207 23.375 13.2617L22.2578 11.6719C21.5273 10.5977 20.4531 9.99609 19.25 9.99609C18.0469 9.99609 16.9727 10.5977 16.2422 11.6719L15.168 13.2617C14.5234 14.207 13.4922 14.7656 12.4609 14.7656C9.49609 14.7656 7.5625 12.0586 7.5625 9.48047C7.5625 7.84766 8.33594 6.34375 9.79688 5.22656C11.2148 4.10938 14.0078 2.77734 19.25 2.77734C24.4922 2.77734 27.2852 4.06641 28.7031 5.14062C30.1641 6.25781 30.9375 7.71875 30.9375 9.35156C30.9375 11.9297 28.918 14.7656 26.082 14.7656ZM13.75 5.78516C12.0312 5.78516 10.957 6.85938 10.4414 7.54688C10.2266 7.80469 10.2266 8.23438 10.4414 8.49219C10.957 9.17969 12.0312 10.2539 13.75 10.2539C15.4258 10.2539 16.5 9.17969 17.0156 8.49219C17.2305 8.23438 17.2305 7.80469 17.0156 7.54688C16.5 6.85938 15.4258 5.78516 13.75 5.78516ZM24.75 5.78516C23.0312 5.78516 21.957 6.85938 21.4414 7.54688C21.2266 7.80469 21.2266 8.23438 21.4414 8.49219C21.957 9.17969 23.0312 10.2539 24.75 10.2539C26.4258 10.2539 27.5 9.17969 28.0156 8.49219C28.2305 8.23438 28.2305 7.80469 28.0156 7.54688C27.5 6.85938 26.4258 5.78516 24.75 5.78516Z" fill={props.color} />
    </svg>)
}

export const MobileMasqueradeIcon = (props) => {
  return (<svg width={props.width} height={props.height} viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0.5C0.234375 0.5 3.55469 15.5 11.3281 15.5C12.8906 15.5 14.3359 14.7188 15.2734 13.3516L16.2891 11.8672C16.6016 11.3984 17.0312 11.2031 17.5 11.2031C17.9688 11.2031 18.4375 11.3984 18.7109 11.8672L19.7266 13.3516C20.6641 14.7188 22.1484 15.5 23.7109 15.5C31.0938 15.5 35.0391 0.5 17.5 0.5ZM23.7109 14.1719C22.5391 14.1719 21.4453 13.5469 20.7422 12.5312L19.7266 11.0469C19.2188 10.2656 18.3984 9.83594 17.5 9.83594C16.6406 9.83594 15.8203 10.2656 15.2734 11.0469L14.2578 12.5312C13.5938 13.5469 12.4609 14.1719 11.3281 14.1719C8.28125 14.1719 6.25 11.3203 6.25 8.66406C6.25 7.45312 6.64062 5.69531 8.55469 4.21094C10.5078 2.6875 13.5938 1.86719 17.5 1.86719C21.4062 1.86719 24.5312 2.6875 26.4453 4.17188C28.3203 5.61719 28.75 7.33594 28.75 8.54688C28.75 11.2031 26.6797 14.1719 23.7109 14.1719ZM12.5 5.30469C10.6641 5.30469 9.45312 6.47656 8.90625 7.17969C8.67188 7.45312 8.67188 7.88281 8.90625 8.19531C9.45312 8.89844 10.6641 10.0703 12.5 10.0703C14.2969 10.0703 15.5078 8.89844 16.0547 8.19531C16.2891 7.88281 16.2891 7.45312 16.0547 7.17969C15.5078 6.47656 14.2969 5.30469 12.5 5.30469ZM12.5 8.70312C11.4453 8.70312 10.6641 8.15625 10.1953 7.6875C10.6641 7.17969 11.4453 6.67188 12.5 6.67188C13.5156 6.67188 14.2969 7.17969 14.7656 7.6875C14.2969 8.15625 13.5156 8.70312 12.5 8.70312ZM22.5 5.30469C20.6641 5.30469 19.4531 6.47656 18.9062 7.17969C18.6719 7.45312 18.6719 7.88281 18.9062 8.19531C19.4531 8.89844 20.6641 10.0703 22.5 10.0703C24.2969 10.0703 25.5078 8.89844 26.0547 8.19531C26.2891 7.88281 26.2891 7.45312 26.0547 7.17969C25.5078 6.47656 24.2969 5.30469 22.5 5.30469ZM22.5 8.70312C21.4453 8.70312 20.6641 8.15625 20.1953 7.6875C20.6641 7.17969 21.4453 6.67188 22.5 6.67188C23.5156 6.67188 24.2969 7.17969 24.7656 7.6875C24.2969 8.15625 23.5156 8.70312 22.5 8.70312Z" fill={props.color} />
    </svg>)
}

export const MapFiltersButton = withStyles((theme) => ({
  root: {
    background: `${theme.colors.map.backgroundFilters} !important`,
    color: `${theme.colors.gray} !important`,
    textTransform: 'unset !important',
    width: '100%',
    justifyContent: 'flex-start'
  },
  contained: {
    boxShadow: '0 0 0 0'
  },
  label: {
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
      color: theme.colors.basicDisabledButtonColor
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
      color: theme.palette.primary.main
    }
  }
}))(Button)

export const CustomOutlinedInput = withStyles(theme => ({
  root: {
    height: '40px',
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '16px'
      }
    },
    '& .MuiInputBase-input': {
      fontSize: '20px'
    }
  }
}))(OutlinedInput)
