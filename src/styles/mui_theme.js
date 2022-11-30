import { createTheme } from '@mui/material/styles'
import RubikRegular from '../assets/fonts/Rubik-VariableFont_wght.ttf'

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      // TODO: original value md: 900
      md: 1150,
      lg: 1200,
      xl: 1536
    }
  },
  overrides: {
    MuiTableCell: {
      root: {
        paddingTop: '0px',
        paddingBottom: '0px'
      },
      head: {
        lineHeight: 'none'
      }
    },
    MuiCssBaseline: {
      /* Try to avoid importants */
      '@global': {
        '.MuiInputBase-input': {
          color: '#333333 !important'
        },
        '.MuiCheckbox-root': {
          color: '#E5E5E5 !important'
        },
        '.MuiCheckbox-colorPrimary.Mui-checked': {
          color: '#47A0F4 !important'
        },
        '.MuiInputAdornment-root': {
          color: '#333333 !important'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '10px'
      }
    }
  },
  palette: {
    primary: {
      light: '#47A0F4',
      main: '#47A0F4',
      dark: '#0072CE',
      contrastText: '#fff',
      text: '#212121'
    }
  },
  shadow: {
    paperBoxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    cardDefaultShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)'
  },
  colors: {
    maskIcon: '#212121',
    inputBorder: '#d8d8d8',
    generalBackground: '#fafafa',
    text: '#333333',
    transparent: 'rgba(0,0,0,0.0)',
    textGray: '#BDBDBD',
    clearAdornment: '#8E8E8E',
    errorText: '#F44337',
    checkDomain: '#8CD38B',
    backdropColor: '#FFFFFF',
    navBarColor: '#FFFFFF',
    highlightButtonText: '#FFFFFF',
    basicButtonBackground: '#FFFFFF',
    basicDisabledButtonBackground: '#E5E5E5',
    basicDisabledButtonColor: '#4f4f4f',
    yellow: '#F2C94C',
    chipVisible: '#C4C4C4',
    chipVisibleOff: '#F1F1F1',
    white: '#FFFFFF',
    gray: '#4F4F4F',
    snackbar: 'hsla(207, 100%, 40%, 0.8)',
    alert: '#47a0f499',
    borderBrowser: '#C3C3C3',
    filtersBorder: '#0000003b',
    complianceBlue: '#E2EBF3',
    iconBlue: '#2F80ED',
    workOrders: {
      counts: '#6C7172',
      chipBack: '#F1F1F1',
      selectedRow: 'rgba(93, 181, 224, 0.1)',
      dotsBack: '#E0E0E0',
      columnTitle: '#6C7172',
      emptyText: '#6C7172',
      detailsTitle: '#6C7172',
      emptyCardTitle: '#333333',
      downloadIcon: '#C4C4C4',
      detailsCardBorderColor: 'rgba(216, 216, 216, 0.25)',
      tab: {
        description: '#121212',
        wonum: '#212121',
        duedate: '#828282'
      },
      buttonPrimary: '#EEEEEE',
      gradient: '#DCDCDC',
      etaText: '#A0A0A0'
    },
    workOrderColors: {
      open: '#2F80ED',
      completed: '#4F4F4F',
      in_progress: '#219653',
      active: '#8BC400',
      draft: '#828282',
      submitted: '#4F4F4F',
      declined: '#EB5757',
      approved: '#27AE60',
      no_work_order: '#CE004A',
      not_available: '#BDBDBD'
    },
    profile: {
      text_grey: '#212121',
      avatar_bg: '#F9F9F9',
      avatar_icon: '#4F4F4F',
      border_input: '#ced4da',
      border_focus: '#80bdff',
      box_shadow: 'rgba(0,123,255,.25)',
      borders: '#F2F2F2',
      darkCard: '#E0E0E0',
      disabled_bg: '#F5F5F5',
      mapFill: '#AF1199',
      mapStroke: '#FFFFFF'
    },
    filters: {
      leftColumnBackground: '#FDFDFD',
      tagsBorder: '#EBEBEB',
      fieldsBorder: '#E0E0E0',
      fieldsLabels: '#6C7172',
      fieldsBackground: '#FFFFFF',
      selectedChips: 'blue',
      selectedExceptionsDividers: '#B9B9B9'
    },
    signInButton: {
      background: '#F2F2F2',
      label: '#676767'
    },
    dividers: '#EAEBEB',
    tradesBackground: '#F8F8F8',
    mainContainerBackground: '#F8F8F8',
    settings: {
      fieldName: '#212121',
      fieldInfo: '#6C7172',
      decline: '#FA5454',
      button_info: '#BCBCBC',
      disabled: '#E0E0E0',
      border: '#E5E5E5',
      cardBorderColor: 'rgba(216, 216, 216, 0.25)',
      delete: '#FC5E5E',
      disabledButton: '#C4C4C4'
    },
    company: {
      title: '#333333',
      inputBorder: '#0000003A',
      roleButton: '#E0E0E018'
    },
    workStatusBorder: 'rgba(71,160,244,0.1)',
    infoWindowBackground: '#FBFBFB',
    columnTitle: '#6C7172',
    disabledField: '#E0E0E0',
    map: {
      playerSliderRail: '#E0E0E0',
      playerSliderThumb: '#333333',
      playerSliderMark: '#6C7172',
      legendsLabels: '#212121',
      legendsColors: {
        temperature: {
          _1: '#F4A6F4',
          _2: '#DF8EE2',
          _3: '#CA7AD1',
          _4: '#A660C8',
          _5: '#814ABA',
          _6: '#5E4EAC',
          _7: '#457CCB',
          _8: '#3EC4E2',
          _9: '#45D8EE',
          _10: '#4BDE9D',
          _11: '#45CC3F',
          _12: '#7ED634',
          _13: '#DAE536',
          _14: '#FFFF32',
          _15: '#FDDA32',
          _16: '#F89232',
          _17: '#EE5F32',
          _18: '#DA4F33',
          _19: '#C64032'
        },
        weather: {
          snow_1: '#A1AAFF',
          snow_2: '#3259FF',
          rain_1: '#D1FFBD',
          rain_2: '#4AD733',
          ice_1: '#E6D2FC',
          ice_2: '#D7AFFF',
          mix_1: '#CFFFFE',
          mix_2: '#4AE4F2',
          blowing: '#EC993F',
          fog: '#FFFF32',
          severe: '#F53232',
          other: '#FEF2EB'
        },
        radar: {
          _1: '#000000',
          _2: '#000000',
          _3: '#56397E',
          _4: '#7857A6',
          _5: '#7D6C97',
          _6: '#928E94',
          _7: '#BDBCA9',
          _8: '#B7BCAD',
          _9: '#9199A3',
          _10: '#6B789E',
          _11: '#52669F',
          _12: '#407B9B',
          _13: '#41B492',
          _14: '#42C470',
          _15: '#36A32F',
          _16: '#3C9D01',
          _17: '#B3BF00',
          _18: '#EDD000',
          _19: '#F3B903',
          _20: '#F50E00',
          _21: '#C10800',
          _22: '#FAC9FF',
          _23: '#F560F2',
          _24: '#AD01FF',
          _25: '#9001F0',
          _26: '#49E1EB',
          _27: '#3333CC',
          _28: '#3333CC'
        }
      }
    },
    stepperGray: '#828282',
    dotsBack: '#E0E0E0'
  },
  typography: {
    fontFamily: '"Rubik"',
    fontWeight: 400,
    fontSize: 18,
    fontStyle: 'normal',
    allVariants: {
      color: '#333333'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Rubik';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Rubik'), local('Rubik'), url(${RubikRegular}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
      '@global': {
        '.MuiInputBase-input': {
          color: '#333333 !important'
        },
        '.MuiCheckbox-root': {
          color: '#E5E5E5 !important'
        },
        '.MuiCheckbox-colorPrimary.Mui-checked': {
          color: '#47A0F4 !important'
        },
        '.MuiInputAdornment-root': {
          color: '#333333 !important'
        }
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: '10px'
      }
    }
  },
  filtersClasses: {
    mainInput1: {
      fontSize: '12px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      width: 'auto',
      marginLeft: '0px',
      height: '32px',
      border: '1px solid #0000003b',
      display: 'flex'
    },
    mainInput2: {
      fontSize: '12px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      width: 'auto',
      marginLeft: '0px',
      height: '36px',
      border: '1px solid #0000003b',
      display: 'flex'
    },
    searchInput1: {
      fontSize: '12px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      width: 'auto',
      marginLeft: '0px',
      height: '36px',
      border: '0px'
    },
    searchInput2: {
      fontSize: '12px',
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      width: 'auto',
      marginLeft: '0px',
      height: '32px',
      border: '0px'
    },
    menuItem: {
      fontSize: '12px',
      paddingRight: '0px',
      width: '100%',
      display: 'flex',
      maxWidth: '352px'
    }
  },
  dashboard: {
    black: '#000000',
    gray: '#4F4F4F',
    disabled: '#6C7172',
    darkBlue: '#0072CE',
    underlineColor: '#333333'
  },
  mapClasses: {
    '& .storemapper-iw-close': {
      display: 'none !important'
    },
    '& .gm-style-iw-c': {
      backgroundColor: '#FBFBFB !important'
    },
    '& .gm-style-iw-c > div': {
      overflow: 'hidden !important'
    },
    '& .gm-style-iw-c > button': {
      display: 'none !important'
    },
    '& .gm-style-iw-t::after': {
      display: 'none !important'
    },
    '& .gm-style-iw > button': {
      display: 'none !important'
    },
    '& .gm-style > img': {
      display: 'none !important'
    },
    '& .infoBox': {
      overflow: 'hidden !important',
      borderRadius: '8px'
    },
    '& .gm-style .gm-style-iw-t::after': {
      display: 'none !important'
    }
  }
})

export default customTheme
