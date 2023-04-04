import { makeStyles } from '@mui/styles'

export const dashboardStyles = makeStyles(theme => ({
  globalContainer: {
    width: '100%',
    maxWidth: '100%',
    margin: '0px',
    padding: '20px'
  },
  reportPaper: {
    boxShadow: '6px 9px 43px rgba(216, 216, 216, 0.25)',
    borderRadius: '8px',
    height: '390px',
    color: theme.colors.gray
  },
  emptyPaper: {
    border: '1px dashed ' + theme.colors.textButton,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    color: theme.colors.iconBlue,
    fontSize: '16px',
    fontWeight: '500',
    fontStyle: 'italic',
    textTransform: 'none'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '500'
  },
  icon: {
    transform: 'scale(2.5)'
  },
  selectBox: {
    background: 'red'
  },
  btn: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '4em',
    paddingLeft: '4em'
  },
  iconLabel: {
    textTransform: 'capitalize',
    fontSize: '12px',
    marginTop: '5px',
    fontWeight: '400'
  },
  sendButton: {
    height: '61px'
  },
  formContainer: {
    width: '100%'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
    color: theme.dashboard.displayAsIcons
  },
  iconClicked: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '5px',
    color: theme.dashboard.iconSelected
  },
  reportHeader: {
    padding: '17px 25px'
  },
  reportTitle: {
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: '500'
  },
  reportDates: {
    fontSize: '8px',
    color: theme.colors.textButton,
    paddingTop: '5px',
    textAlign: 'right'
  },
  editReport: {
    color: theme.colors.gray,
    fontSize: '12px',
    cursor: 'pointer'
  },
  menu: {
    fontSize: '12px',
    fontWeight: '400',
    color: theme.colors.gray,
    width: '150px'
  },
  abcdisable: {
    color: 'red'
  },
  abcnotdisable: {
    color: theme.dashboard.displayAsIcons
  }
}))
