import { createTheme } from '@mui/material/styles'

export const muiThemeHeaderDate = createTheme({
  palette: {
    primary: {
      main: '#47A0F4'
    }
  },
  typography: {
    fontFamily: 'Rubik',
    fontSize: 12
  }
})

export const checkboxTheme = createTheme({
  overrides: {
    MuiCheckbox: {
      colorSecondary: {
        color: '#E5E5E5',
        '&$checked': {
          color: '#47A0F4'
        }
      }
    }
  }
})

export const muiThemeDateFilter = createTheme({
  palette: {
    primary: {
      main: '#47A0F4'
    }
  },
  typography: {
    fontFamily: 'Rubik',
    fontSize: 12
  },
  overrides: {
    MuiPickersModal: {
      dialogAction: {
        color: '#33abb6',
        backgroundColor: '#47A0F4'
      }
    }
  }
})

export const checkboxCompany = createTheme({
  overrides: {
    MuiCheckbox: {
      colorSecondary: {
        color: '#E5E5E5',
        '&$checked': {
          color: '#4F4F4F',
          backgroundColor: 'white'
        }
      }
    }
  }
})

export const buttonSettingsDisabled = createTheme({
  palette: {
    action: {
      disabledBackground: 'transparent !important',
      disabled: '#C4C4C4'
    }
  }
})

export const buttonSettingsDisabledMobile = createTheme({
  palette: {
    action: {
      disabledBackground: '#E0E0E0 !important',
      disabled: '#E0E0E0'
    }
  }
})

export const selectRangeStyle = {
  fontSize: '12px',
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '170px',
  marginLeft: '0px',
  height: '32px'
}

export const searchFieldStyle = {
  fontSize: '12px',
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '178px',
  marginLeft: '0px',
  height: '32px'
}

export const iconStyle = {
  width: '18px',
  cursor: 'pointer'
}

export const iconSearch = {
  width: '15px',
  marginRight: '5px',
  cursor: 'pointer'
}

export const calendarTitleStyle = {
  textAlign: 'center',
  fontSize: '22px',
  color: '#47A0F4',
  marginTop: '5px',
  fontWeight: '700'
}

export const statusColors = {
  open: '#F2C94C',
  new: '#F2C94C',
  in_progress: '#0072CE',
  returning: '#F49A47',
  completed: '#8BC400',
  canceled: '#6C7172',
  incomplete: '#CE004A',
  dispatched: '#47A0F4',
  no_service_required: '#333333',
  white: '#ffffff',
  cannot_complete: '#CE004A'
}

export const emojiStyle = {
  color: '#6C7172',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  width: '60px',
  height: '60px',
  marginBottom: '40px',
  marginTop: '90px'
}

export const circularStyle = {
  width: '15px',
  height: '15px',
  display: 'flex'
}

export const settingsColors = {
  no: '#0072CE',
  yes: '#8BC400',
  white: '#ffffff'
}

export const enableButtonStyle = {
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '700',
  color: 'white',
  border: '0.5px solid #BCBCBC',
  borderRadius: '100px',
  padding: '3px 30px',
  backgroundColor: '#2F80ED',
  margin: '0px 15px',
  width: '120px',
  height: '40px'
}

export const enableButtonMobile = {
  textTransform: 'none',
  fontSize: '20px',
  fontWeight: '700',
  color: '#333333',
  borderRadius: '4px',
  padding: '3px 30px',
  backgroundColor: 'transparent',
  margin: '0px 5px'
}

export const disableButtonStyle = {
  textTransform: 'none',
  fontSize: '14px',
  fontWeight: '700',
  color: 'white',
  border: '0.5px solid #BCBCBC',
  borderRadius: '100px',
  padding: '3px 30px',
  backgroundColor: '#BDBDBD',
  margin: '0px 0px 0px 15px',
  width: '120px',
  height: '40px'
}

export const disableButtonMobile = {
  textTransform: 'none',
  fontSize: '20px',
  fontWeight: '700',
  color: '#828282',
  borderRadius: '4px',
  padding: '3px 30px',
  backgroundColor: '#E0E0E0 !important',
  margin: '0px 5px'
}

export const paperFilters = {
  paperStyles1: {
    maxHeight: '300px',
    minWidth: '234px'
  },
  paperStyles2: {
    maxHeight: '300px',
    minWidth: '305px'
  },
  paperStyles3: {
    maxHeight: '300px',
    minWidth: '352px'
  },
  paperStyles4: {
    maxHeight: '200px',
    minWidth: '320px'
  },
  menuPaper1: {
    width: '160px',
    maxHeight: '200px',
    marginTop: '5px',
    marginLeft: '-8px'
  },
  menuPaper2: {
    width: '160px',
    maxHeight: '200px',
    marginTop: '5px'
  }
}

export const mapStylesGray = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#c3c3c3'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c3c3c3'
      },
      {
        lightness: -75
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'landscape',
    stylers: [
      {
        color: '#e3e3e3'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b0bcc6'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
]

export const mapStylesLight = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
]
