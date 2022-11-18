import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// mui components
import { makeStyles, Container, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  statusContainer: {
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    }
  }
}))

function completeIcon(classes) {
  return <FontAwesomeIcon icon="fa-solid fa-check" className={classes.icon} />
}
function invisibleIcon(classes) {
  return (
    <FontAwesomeIcon
      icon="fa-solid fa-check"
      style={{ visibility: 'hidden' }}
    />
  )
}

const ProfileStepsComponent = props => {
  const { currentStatus, setCurrentTab } = props
  const classes = useStyles()

  const handleClick = (event, step, index) => {
    if (step.view) {
      setCurrentTab(index)
    }
  }

  return (
    <Container classes={{ root: classes.statusContainer }}>
      {currentStatus?.map((row, index) => (
        <Box
          key={row.label}
          classes={row.style}
          onClick={event => {
            handleClick(event, row, index)
          }}
        >
          {row.label}{' '}
          {row.complete ? completeIcon(classes) : invisibleIcon(classes)}
        </Box>
      ))}
    </Container>
  )
}
export const ProfileSteps = props => {
  const { currentStatus, setCurrentTab } = props
  return (
    <div>
      <ProfileStepsComponent
        currentStatus={currentStatus}
        setCurrentTab={setCurrentTab}
      />
    </div>
  )
}
