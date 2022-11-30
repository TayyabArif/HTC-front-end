import { makeStyles } from '@mui/styles'

export const workOrderStyles = makeStyles((theme) => ({
  globalFiltersContainer: {
    height: '72px',
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white'
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
    width: '287px'
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
    justifyContent: 'center'
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
