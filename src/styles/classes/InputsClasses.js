import { makeStyles } from '@mui/styles'

export const selectRadiosNoBorderStyles = makeStyles((theme) => ({
  font14: {
    fontSize: '12px',
    fontWeight: 700
  },
  menuItem: {
    paddingTop: '8px',
    fontSize: '12px'
  },
  selectIcon: {
    display: 'none'
  },
  radio: {
    padding: '0px',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  }
}))
