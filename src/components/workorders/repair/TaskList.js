import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormLabel, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Selector } from '../../workorders/repair/MultiSelector'
import { taskListStyles } from '../../../styles/classes/RepairClasses'

export const TaskList = props => {
  const { t } = useTranslation()
  const classes = taskListStyles()
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
