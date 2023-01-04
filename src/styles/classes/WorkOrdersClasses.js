import { makeStyles } from '@mui/styles'
import { navBarHeaderHeight } from '../../lib/Constants'
import { statusColors } from '../../styles/mui_custom_theme'

export const workOrderStyles = makeStyles((theme) => ({
  globalFiltersContainer: {
    height: '72px',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: '16px'
  },
  SearchInput: {
    paddingRight: 0,
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '12px'
      }
    },
    '& .MuiInputBase-input': {
      fontSize: '12px'
    },
    '&.MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)'
      }
    },
    height: '32px',
    width: '330px'
  },
  datesInput: {
    height: '32px'
  },
  Counts: {
    fontSize: '12px',
    fontWeight: '400'
  },
  select: {
    '&:focus': {
      backgroundColor: theme.colors.transparent,
      padding: '0px 0px'
    }
  },
  selector: {
    height: '32px',
    fontSize: '12px',
    '& .MuiSelect-outlined': {
      paddingRight: '0px'
    }
  },
  exportButton: {
    marginLeft: '15px',
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'none',
    padding: '0px 0px',
    marginTop: '1px'
  },
  advancedButton: {
    paddingBottom: '5px',
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'none',
    marginLeft: '15px',
    marginTop: '-20px'
  },
  resetButton: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'none',
    marginLeft: '10px'
  },
  tableContainer: {
    margin: '0px',
    padding: '0px',
    width: '100%',
    maxWidth: '100%'
  },
  countsContainer: {
    margin: '0px 54px',
    padding: '0px 0px'
  },
  exportDialog: {
    borderRadius: '8px'
  },
  exportTitle: {
    color: theme.colors.text,
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '33px 0px',
    textAlign: 'center'
  },
  exportContent: {
    color: theme.colors.text,
    fontSize: '14px',
    fontWeight: 'normal',
    textAlign: 'center',
    width: '389px',
    margin: '0px 35px 33px 35px'
  },
  dialogButton: {
    marginLeft: 'auto',
    height: '40px',
    width: '84px',
    fontSize: '14px'
  },
  dialogContent: {
    display: 'flex !important'
  },
  serviceBox: {
    marginRight: '1px',
    textAlign: 'right'
  }
}))

export const mainTableStyles = makeStyles(theme => ({
  tableContainer: {
    overflowY: 'hidden',
    padding: '0px',
    margin: '0px'
  },
  bodyTableContainer: {
    minWidth: '1440px',
    padding: '0px',
    margin: '0px',
    overflowX: 'hidden',
    overflowY: 'overlay'
  },
  headTable: {
    height: '61px',
    minWidth: '1440px',
    tableLayout: 'fixed',
    lineHeight: 'none'
  },
  bodyTable: {
    tableLayout: 'fixed'
  },
  label: {
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '7px',
    paddingRight: '7px'
  },
  labelCounter: {
    height: '18px',
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: '7px',
    paddingRight: '7px'
  },
  selected: {
    backgroundColor: `${theme.colors.workOrders.selectedRow} !important`,
    '&:hover': {
      backgroundColor: theme.colors.workOrders.selectedRow
    }
  },
  avatar: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  columnTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: theme.colors.workOrders.columnTitle,
    paddingLeft: '13px',
    cursor: 'default'
  },
  tableCell: {
    fontSize: '12px',
    fontWeight: '400',
    paddingLeft: '13px',
    paddingTop: '6px',
    color: theme.colors.workOrders.columnTitle
  },
  tableRow: {
    height: '68px'
  },
  headCell: {
    margin: '0px',
    paddingBottom: '5px',
    paddingTop: '0px',
    paddingRight: '10px',
    paddingLeft: '0px',
    color: theme.colors.workOrders.columnTitle
  },
  lastHeadCell: {
    margin: '0px',
    padding: '0px',
    paddingRight: '12px',
    paddingBottom: '5px',
    color: theme.colors.workOrders.columnTitle
  },
  empty1: {
    color: theme.colors.disabledButtonColor,
    fontSize: '30px',
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '60px',
    marginBottom: '40px'
  },
  empty2: {
    color: theme.colors.workOrders.tab.duedate,
    fontSize: '16px',
    fontWeight: '400',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1000px',
    textAlign: 'center'
  },
  boxTitle: {
    paddingTop: '2px',
    fontSize: '12px',
    fontWeight: '400',
    color: theme.colors.workOrders.columnTitle
  },
  boxSub: {
    fontSize: '10px',
    fontWeight: '400',
    color: theme.colors.workOrders.downloadIcon,
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    overflow: 'hidden',
    marginTop: '-5px',
    paddingTop: '0.2em',
    lineHeight: '11px'
  },
  services: {
    fontSize: '12px',
    fontWeight: '400',
    color: theme.colors.workOrders.columnTitle,
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    overflow: 'hidden'
  },
  colorPrimary: {
    background: theme.colors.workOrders.buttonPrimary
  },
  barColorPrimary: {
    background: `linear-gradient(to right, ${theme.colors.workOrders.buttonPrimary},${theme.colors.workOrders.gradient},${theme.colors.workOrders.buttonPrimary})`
  },
  dimensions: {
    height: '21px',
    width: '100px'
  },
  body: {
    maxHeight: '680px',
    backgroundColor: 'white',
    overflowY: 'scroll'
  },
  open: {
    width: '13px',
    height: '13px',
    color: theme.colors.workOrderColors.open,
    marginBottom: '-2px',
    marginRight: '8px'
  },
  in_progress: {
    width: '13px',
    height: '13px',
    color: theme.colors.workOrderColors.active,
    marginBottom: '-2px',
    marginRight: '8px'
  },
  completed: {
    width: '13px',
    height: '13px',
    marginBottom: '-2px',
    marginRight: '8px'
  },
  cancelled: {
    width: '13px',
    height: '13px',
    color: theme.colors.grey,
    marginBottom: '-2px',
    marginRight: '8px'
  },
  expired: {
    width: '13px',
    height: '13px',
    color: theme.colors.workOrderColors.declined,
    marginBottom: '-2px',
    marginRight: '8px'
  },
  invoice_open: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.open,
    marginRight: '8px'
  },
  draft: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.draft,
    marginRight: '8px'
  },
  submitted: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.submitted,
    marginRight: '8px'
  },
  declined: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.declined,
    marginRight: '8px'
  },
  approved: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.approved,
    marginRight: '8px'
  },
  not_available: {
    height: '13px',
    marginBottom: '-2px',
    color: theme.colors.workOrderColors.not_available,
    marginRight: '8px'
  },
  noIcon: {
    width: '13px',
    height: '13px',
    color: theme.colors.text,
    marginBottom: '-2px',
    marginRight: '8px'
  },
  checkboxTablecell: {
    width: '48px'
  },
  emptyTableCell: {
    borderBottom: 'none'
  },
  masqueradeRow: {
    marginTop: '50px'
  },
  woMenu: {
    backgroundColor: theme.colors.disabledField,
    borderRadius: '45px',
    height: '24px',
    width: '24px',
    textAlign: 'center',
    fontSize: '20px'
  },
  ellipsis: {
    color: theme.colors.workOrders.downloadIcon
  },
  tableHead: {
    backgroundColor: theme.colors.filters.leftColumnBackground
  }
}))

export const activitiesCardStyle = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    padding: '0px 0px',
    boxShadow: '6px 9px 43px ' + theme.colors.workOrders.detailsCardBorderColor,
    borderRadius: '8px',
    marginBottom: '5px'
  },
  actions: {
    cursor: 'pointer',
    height: '68px',
    padding: '0px 0px'
  },
  chipRoot: {
    marginRight: 'auto',
    fontSize: '12px',
    alignSelf: 'center',
    minWidth: 'fit-content'
  },
  chipLabel: {
    padding: '0px 0px'
  },
  trip: {
    padding: '1px 0px',
    marginLeft: '20px',
    marginRight: '10px',
    color: theme.colors.text,
    fontSize: '18px',
    fontWeight: '700',
    alignSelf: 'center'
  },
  field: {
    marginLeft: '5px',
    marginBottom: '4px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '900'
  },
  fieldData: {
    marginLeft: '5px',
    marginBottom: '28px',
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  fieldDisabledData: {
    marginLeft: '5px',
    marginBottom: '28px',
    color: theme.colors.textGray,
    fontSize: '14px',
    fontWeight: '400'
  },
  fieldMessage: {
    marginLeft: '5px',
    marginBottom: '28px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px'
  },
  tripGrid: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'middle',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  statusChip: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto'
  },
  error: {
    color: theme.colors.errorColor,
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '10px'
  },
  errorContainer: {
    textAlign: 'center',
    marginBottom: '20px',
    marginTop: '70px'
  },
  errorBox: {
    marginBottom: '20px'
  }
}))

export const auditTrailStyles = makeStyles(theme => ({
  root: {
    padding: '0px',
    boxShadow: '6px 9px 43px ' + theme.colors.workOrders.detailsCardBorderColor
  },
  field: {
    marginLeft: '5px',
    marginBottom: '5px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '900'
  },
  fieldData: {
    marginLeft: '5px',
    marginBottom: '30px',
    color: theme.colors.text,
    fontSize: '14px',
    fontWeight: '400'
  },
  trailContainer: { display: 'flex', flexDirection: 'row' },
  date: {
    fontSize: '10px',
    color: theme.colors.columnTitle,
    width: '65px',
    paddingTop: '6px',
    height: '45px'
  },
  type: {
    fontSize: '14px',
    color: theme.colors.basicDisabledButtonColor
  },
  author: {
    fontSize: '10px',
    color: theme.colors.grey
  },
  stepper: {
    position: 'relative',
    '& .MuiStepConnector-line': {
      position: 'absolute',
      left: '72px',
      top: '30px',
      height: '37px',
      borderColor: theme.colors.disabledField
    },
    '& .MuiStepLabel-iconContainer': {
      alignSelf: 'flex-start',
      paddingTop: '6px'
    },
    '& ..MuiStepLabel-root': {
      alignSelf: 'flex-start'
    }
  },
  roundItem: {
    width: '16px',
    height: '16px',
    borderRadius: '15px'
  },
  created: { backgroundColor: theme.colors.text },
  checkIn: { backgroundColor: theme.colors.workOrderColors.in_progress },
  checkOut: { backgroundColor: theme.colors.workOrderColors.completed },
  invoiceCreated: { backgroundColor: theme.colors.invoiceColors.invoice_created },
  submit: { backgroundColor: theme.colors.invoiceColors.dark_grey },
  decline: { backgroundColor: theme.colors.invoiceColors.red_error },
  approve: { backgroundColor: theme.colors.invoiceColors.invoice_approved },
  smallAdornment: {
    borderTop: `1px solid ${theme.colors.disabledField}`,
    marginLeft: '69px',
    width: '8px'
  },
  bigAdornment: {
    borderTop: `1px solid ${theme.colors.disabledField}`,
    marginLeft: '67px',
    marginBottom: '3px',
    marginTop: '-23px',
    width: '12px'
  },
  adornmentEnd: {
    '& .MuiStepConnector-line': {
      height: '9px',
      minHeight: 0
    }
  },
  stepperContainer: {
    paddingLeft: '5px',
    paddingTop: 0
  }
}))

export const dateFilterStyles = makeStyles(theme => ({
  datePicker: {
    '& .MuiPickersModal-dialog': {
      backgroundColor: 'red !important'
    }
  },
  mainInput1: {
    ...theme.filtersClasses.mainInput1,
    cursor: 'pointer',
    caretColor: 'transparent',
    '& .MuiInputBase-input': {
      cursor: 'pointer !important'
    }
  },
  mainInput2: {
    ...theme.filtersClasses.mainInput2,
    cursor: 'pointer',
    caretColor: 'transparent',
    '& .MuiInputBase-input': {
      cursor: 'pointer !important'
    }
  }
}))

export const dateTimeFilterStyles = makeStyles(theme => ({
  mainInput1: {
    ...theme.filtersClasses.mainInput1,
    width: '313px',
    '& .ant-picker-input': {
      boxShadow: 'none',
      '& input': {
        color: theme.colors.basicDisabledButtonColor,
        cursor: 'pointer',
        '&::placeholder': {
          color: theme.colors.iconBlue,
          opacity: 1
        }
      }
    },
    cursor: 'pointer',
    boxShadow: 'none',
    zIndex: 9
  },
  mainInput2: {
    ...theme.filtersClasses.mainInput2,
    width: '313px',
    '& .ant-picker-input': {
      boxShadow: 'none',
      '& input': {
        color: theme.colors.basicDisabledButtonColor,
        cursor: 'pointer',
        '&::placeholder': {
          color: theme.colors.iconBlue,
          opacity: 1
        }
      }
    },
    cursor: 'pointer',
    boxShadow: 'none',
    zIndex: 9
  },
  container: {
    width: '313px'
  },
  hidden: {
    border: 'none',
    zIndex: 1,
    marginTop: '-32px'
  },
  overlay: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  }
}))

export const detailedInfoStyles = makeStyles(theme => ({
  presentation: {
    marginBottom: '0px',
    marginTop: '19px',
    overflowY: 'auto'
  },
  loading: {
    justifyItems: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '200px',
    paddingTop: '100px',
    fontSize: '16px'
  },
  drawerPaper: {
    maxHeight: `calc(100% - calc(${navBarHeaderHeight + ' + 12px'}))`,
    marginTop: navBarHeaderHeight,
    width: '360px',
    borderRadius: '8px',
    overflow: 'auto',
    overflowX: 'hidden',
    zIndex: 1500,
    boxSizing: 'content-box',
    marginRight: '19px',
    marginBottom: '20px',
    display: 'flex'
  },
  midTab: {
    minWidth: '50px',
    width: 'auto',
    minHeight: 25,
    maxHeight: '25px',
    height: '30px',
    fontSize: '12px',
    color: theme.colors.text,
    textTransform: 'none',
    backgroundColor: theme.colors.backdropColor,
    borderLeft: `1px solid ${theme.colors.workOrders.downloadIcon}`,
    borderRight: `1px solid ${theme.colors.workOrders.downloadIcon}`
  },
  tab: {
    minWidth: '50px',
    width: 'auto',
    minHeight: 25,
    maxHeight: '25px',
    height: 'auto',
    fontSize: '12px',
    color: theme.colors.text,
    textTransform: 'none',
    backgroundColor: theme.colors.backdropColor
  },
  tabs: {
    backgroundColor: 'white',
    minHeight: 25,
    maxHeight: '34px',
    height: '20px',
    margin: '0px 30px',
    '& .Mui-selected': {
      color: theme.palette.primary.light
    },
    zIndex: 1000
  },
  tabPanel: {
    '& .MuiBox-root': {
      padding: '0px'
    },
    padding: '0px 0px',
    marginTop: '10px'
  },
  title: {
    padding: '12px 0px',
    marginLeft: 'auto',
    marginRight: '15px',
    color: theme.colors.backdropColor,
    fontSize: '14px',
    fontWeight: '500'
  },
  appBar: {
    backgroundColor: theme.colors.backdropColor
  },
  description: {
    padding: '1px 0px',
    marginLeft: '23px',
    color: theme.colors.workOrders.tab.description,
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '2px'
  },
  drawerHeader: {
    display: 'flex',
    height: '60px',
    minHeight: '60px',
    alignItems: 'center',
    margin: '0 20px'
  },
  open: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.open,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  in_progress: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.in_progress,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  completed: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.completed,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  cancelled: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.grey,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  expired: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.workOrderColors.declined,
    display: 'flex',
    flex: 1,
    maxWidth: '100px'
  },
  woNoStatus: {
    fontSize: '16px',
    fontWeight: '800',
    color: theme.colors.text,
    flex: 1,
    maxWidth: '100px'
  },
  wonum: {
    padding: '1px 0px',
    marginLeft: '19px',
    color: theme.colors.workOrders.tab.wonum,
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '2px'
  },
  duedate: {
    padding: '3px 0px',
    marginLeft: '21px',
    color: theme.colors.workOrders.tab.wonum,
    fontSize: '12px',
    fontWeight: '500'
  },
  icon: {
    marginRight: '10px',
    height: '28px',
    width: '28px'
  },
  grid: {
    display: 'flex',
    marginTop: 'auto',
    padding: '0px 0px !important',
    margin: '0px 0px'
  },
  closeIcon: {
    marginRight: '5px',
    marginBottom: '10px'
  },
  invoiceLink: {
    color: theme.colors.iconBlue,
    marginLeft: '5px',
    fontSize: '12px',
    display: 'flex',
    flex: 1
  },
  openInvoice: {
    marginRight: '5px',
    fontSize: '15px',
    marginBottom: '8px'
  },
  invoiceIcon: {
    fontSize: '15px',
    marginBottom: '8px',
    marginRight: '10px'
  }
}))

export const etaSelectStyles = makeStyles(theme => ({
  container: {
    marginBottom: '28px'
  },
  field: {
    marginLeft: '5px',
    marginBottom: '4px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '900'
  },
  fieldData: {
    marginLeft: '5px',
    marginBottom: '28px',
    color: theme.colors.textGray,
    fontSize: '14px',
    fontWeight: '400'
  }
}))

export const inputFieldFilterStyles = makeStyles(theme => ({
  mainInput1: theme.filtersClasses.mainInput1,
  mainInput2: theme.filtersClasses.mainInput2
}))

export const photoReelStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden'
  },
  dialogPaper: {
    maxWidth: '1186px !important',
    width: '100%',
    height: '594px',
    borderRadius: '8px',
    position: 'absolute',
    zIndex: 2000,
    '&.MuiDialog-paperWidthSm': {
      maxWidth: 'none'
    }
  },
  content: {
    height: 'auto',
    padding: '0px 0px',
    overflow: 'hidden'
  },
  dialogTitle: {
    height: '77px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingLeft: '35px'
  },
  carouselContainer: {
    maxWidth: '855px',
    overflow: 'visible',
    '& .slider-wrapper': {
      overflow: 'visible !important'
    },
    '& .carousel': {
      overflow: 'visible !important'
    },
    '& .carousel-slider': {
      height: '515px'
    },
    '& .thumbs': {
      margin: '0px',
      padding: '0px'
    },
    '& .thumbs-wrapper': {
      maxWidth: '1186px',
      overflowX: 'auto'
    },
    '& .carousel .thumb': {
      margin: '0px',
      padding: '0px',
      display: 'contents'
    },
    '& .carousel .thumb img': {
      width: 'auto'
    },
    '& .selected .borderDiv': {
      outline: '1px solid ' + theme.colors.highlightButtonText,
      outlineOffset: '-3px'
    },
    '& .details': {
      display: 'none'
    },
    '& .selected .details': {
      display: 'block'
    }
  },
  imgTitle: {
    display: 'block',
    color: theme.colors.text,
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '2px'
  },
  imgDescription: {
    display: 'block',
    textAlign: 'left',
    color: theme.colors.text,
    fontSize: '10px',
    fontWeight: '700',
    lineHeight: '12px'
  },
  thumbs: {
    height: '94px',
    width: 'auto'
  },
  legend: {
    backgroundColor: statusColors.white,
    zIndex: 3000,
    bottom: '15px',
    height: '61px'
  },
  photoFrame: {
    display: 'flex',
    maxWidth: '855px',
    height: '435px',
    paddingLeft: '4px',
    paddingRight: '4px',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  photoContent: {
    position: 'relative',
    display: 'inline-block',
    maxHeight: '435px',
    height: 'auto'
  },
  photo: {
    width: '100%',
    height: '100%',
    maxHeight: '435px',
    objectFit: 'contain'
  },
  photoVertical: {
    width: '100%',
    height: 'auto',
    maxHeight: '450px',
    objectFit: 'contain'
  },
  prevIconStyle: {
    width: '100px',
    height: '350px',
    position: 'absolute',
    zIndex: 4000,
    cursor: 'pointer',
    top: 0,
    color: statusColors.cancelled,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '& img': {
      width: 'auto !important'
    },
    margin: '50px 0px'
  },
  nextIconStyle: {
    width: '100px',
    height: '350px',
    position: 'absolute',
    zIndex: 4000,
    cursor: 'pointer',
    top: 0,
    color: statusColors.cancelled,
    right: '-160px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '& img': {
      width: 'auto !important'
    },
    margin: '50px 0px'
  },
  arrowIcon: {
    color: 'white',
    backgroundColor: theme.colors.opaqueBackground,
    height: '40px',
    width: '45px',
    borderRadius: '7px'
  },
  timestampLabel: {
    position: 'absolute',
    bottom: '10px',
    right: '15px',
    zIndex: '10000',
    color: theme.colors.yellow,
    fontWeight: '500',
    fontSize: '18px'
  },
  clearIconStyle: {
    width: '24px',
    marginTop: '0px',
    marginRight: '0px',
    marginLeft: 'auto',
    cursor: 'pointer'
  },
  iconButton: {
    backgroundColor: theme.colors.opaqueBackground,
    color: 'white',
    borderRadius: '8px',
    marginLeft: '12px',
    width: '45px',
    height: '40px',
    zIndex: 5000
  },
  buttonsBox: {
    display: 'flex',
    position: 'absolute',
    right: '0.5%',
    zIndex: 5000
  }
}))

export const repairDataStyles = makeStyles(theme => ({
  repairItem: {
    marginBottom: '28px'
  },
  checkIcon: {
    width: '20px',
    color: theme.colors.workOrders.tab.duedate
  },
  dotIcon: {
    fontSize: '7px',
    width: '15px',
    color: theme.colors.workOrders.tab.duedate
  },
  disabledText: {
    color: theme.colors.grey,
    padding: '0.5em 1em',
    fontSize: '13px'
  },
  field: {
    marginLeft: '5px',
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  fieldMessage: {
    marginLeft: '5px',
    marginBottom: '16px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  },
  item: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  taskList: {
    display: 'flex',
    alignItems: 'center',
    height: '20px'
  },
  photoField: {
    marginLeft: '5px',
    marginBottom: '2px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  empty: {
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '10px'
  },
  thumbContainer: {
    width: '99px',
    height: '94px',
    marginBottom: '6px',
    borderRadius: '8px'
  },
  thumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  serviceType: { display: 'flex', alignItems: 'center', marginBottom: '28px' },
  divider: { flex: 1, marginRight: '20px', marginLeft: '20px' },
  serviceTypeTitle: {
    fontWeight: '700',
    fontSize: '14px'
  },
  selectedTask: {
    display: 'flex',
    alignContent: 'center'
  }
}))

export const slideFilterStyles = makeStyles(theme => ({
  mainMenu: {
    '& .MuiPaper-root': {
      height: '350px'
    }
  },
  switch: {
    marginRight: '0px',
    marginLeft: 'auto',
    color: theme.colors.mainBlue
  },
  thumb: {
    width: '13px',
    height: '13px',
    marginTop: '3px',
    marginLeft: '3px'
  },
  select: {
    '&:focus': {
      backgroundColor: theme.colors.transparent,
      color: theme.colors.text
    }
  },
  input: {
    fontSize: '12px',
    backgroundColor: theme.colors.transparent,
    color: theme.colors.text,
    borderRadius: '8px',
    marginLeft: '0px'
  },
  notched: {
    border: 'none'
  },
  label: {
    fontSize: '12px',
    fontWeight: '400',
    // color: theme.colors.sites.completedWork,
    maxWidth: '220px',
    textAlign: 'center'
  },
  progress: {
    width: '20px',
    height: '20px',
    display: 'flex'
  },
  mainInput1: {
    ...theme.filtersClasses.mainInput1,
    '& .MuiInputBase-input': {
      cursor: 'pointer !important'
    }
  },
  mainInput2: {
    ...theme.filtersClasses.mainInput2,
    '& .MuiInputBase-input': {
      cursor: 'pointer !important'
    }
  },
  searchInput1: theme.filtersClasses.searchInput1,
  searchInput2: theme.filtersClasses.searchInput2,
  menuItem: { ...theme.filtersClasses.menuItem, minWidth: '164px', whiteSpace: 'initial', wordBreak: 'break-word' }
}))

export const sortMenuStyles = makeStyles(theme => ({
  menuItem: theme.filtersClasses.menuItem
}))

export const woDetailsStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    padding: '9px',
    boxShadow: '6px 9px 43px ' + theme.colors.workOrders.detailsCardBorderColor
  },
  field: {
    marginLeft: '5px',
    marginBottom: '5px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '900'
  },
  fieldData: {
    marginLeft: '5px',
    marginBottom: '30px',
    color: theme.colors.text,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '17px',
    letterSpacing: '1px'
  }
}))
