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
    border: '1px dashed #828282',
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
  }
}))
