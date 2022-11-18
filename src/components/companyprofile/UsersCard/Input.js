import { React } from 'react'

// mui components
import { makeStyles, Container, FormLabel, TextField } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  userContainer: {
    borderColor: theme.colors.disabledField,
    borderRadius: '36px',
    marginBottom: '10px'
  },
  column: {
    flex: 1
  },
  title: {
    fontSize: '12px',
    color: theme.colors.grey
  },
  input: {
    '& .MuiInputBase-input': {
      borderRadius: 45,
      position: 'relative',
      border: '1px solid ' + theme.colors.profile.border_input,
      fontSize: 12,
      width: '100%',
      padding: '10px'
    }
  }
}))

export const Input = props => {
  const { title, value, setValue, type } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Container className={classes.userContainer}>
      <FormLabel className={classes.title}>{title}</FormLabel>
      <TextField
        className={classes.input}
        value={value}
        onChange={event => setValue(event.target.value)}
        type={type}
        InputProps={{
          disableUnderline: true
        }}
        placeholder={`${t('account_settings.form.enter')} ${title}`}
      />
    </Container>
  )
}
