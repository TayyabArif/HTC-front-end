import { FiberManualRecord } from '@mui/icons-material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  workCircle: (props) => ({
    color: `${props.color} !important`,
    marginTop: '2px',
    top: 5,
    border: `1px solid ${theme.colors.workStatusBorder}`,
    borderRadius: '50%'

  })
}))

export const WorkStatusIndicator = (props) => {
  const classes = useStyles({ color: props.color })

  return (
    <FiberManualRecord className={classes.workCircle + ' ' + props.className}/>
  )
}
