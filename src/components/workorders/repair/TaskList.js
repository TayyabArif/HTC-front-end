import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormLabel, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import { Selector } from '../../workorders/repair/MultiSelector'

const useStyles = makeStyles(theme => ({
  repairItem: {
    minHeight: '20px',
    marginBottom: '20px',
    marginLeft: '5px'
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
  field: {
    marginLeft: '0px',
    marginBottom: '7px',
    color: theme.colors.text,
    fontSize: '12px',
    fontWeight: '700'
  },
  item: {
    color: theme.colors.workOrders.counts,
    fontSize: '14px',
    fontWeight: '400'
  },
  taskList: {
    display: 'flex',
    alignItems: 'center'
  },
  selectedTask: {
    display: 'flex',
    alignContent: 'center'
  },
  mandatory: {
    color: theme.colors.errorColor
  },
  fieldMessage: {
    marginBottom: '14px',
    color: theme.colors.workOrders.downloadIcon,
    fontSize: '14px',
    fontWeight: '400'
  }
}))

export const TaskList = props => {
  const { t } = useTranslation()
  const classes = useStyles()
  const {
    serviceName,
    services,
    disabled,
    updateCallback,
    mandatory,
    notAvailable
  } = props
  const [selectedTasks, setSelectedTasks] = useState(services[0].tasks || [])

  const handleChangeValues = newValue => {
    setSelectedTasks(newValue)
    updateCallback(newValue)
  }

  return (
    <Grid className={classes.repairItem} key={`component-${serviceName}`}>
      <FormLabel
        component="legend"
        className={`${classes.field} ${
          !disabled && mandatory ? classes.mandatory : null
        }`}
      >
        {t('work_orders.trips.checklist')}
      </FormLabel>
      {disabled &&
        services[0].tasks.filter(task => task.selected).length === 0 && (
          <FormLabel className={classes.fieldMessage}>
            {notAvailable
              ? t('general.labels.not_available')
              : t('work_orders.checkout_message')}
          </FormLabel>
      )}
      {disabled
        ? (
            services[0].tasks.map((obj, ind) => {
              if (obj.selected) {
                return (
              <Grid key={ind} container className={classes.taskList}>
                <Grid item md={1} className={classes.selectedTask}>
                  {
                    <FontAwesomeIcon
                      icon={['fas', 'circle-small']}
                      className={classes.dotIcon}
                    />
                  }
                </Grid>
                <Grid item md={10}>
                  <FormLabel component="legend" className={classes.item}>
                    {obj.name}
                  </FormLabel>
                </Grid>
                <Grid item md={1}>
                  {obj.selected && (
                    <FontAwesomeIcon
                      icon={['fas', 'check']}
                      className={classes.checkIcon}
                    />
                  )}
                </Grid>
              </Grid>
                )
              }
              return null
            })
          )
        : (
        <Grid container className={classes.taskList}>
          <Selector
            id={'taskList'}
            multiple
            value={
              selectedTasks?.filter(t => t.selected).length > 0
                ? selectedTasks
                  .filter(t => t.selected)
                  .map(t => t.name)
                  .join('\n')
                : ''
            }
            handleChange={handleChangeValues}
            options={services[0].tasks ? services[0].tasks : []}
          />
        </Grid>
          )}
    </Grid>
  )
}
