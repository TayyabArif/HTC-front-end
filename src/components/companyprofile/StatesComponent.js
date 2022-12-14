import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GlobalSelect from '../form/Select'
import GlobalInputButtons from '../form/TextInputButtons'
import { statesComponentStyles } from '../../styles/classes/CompanySettingsClasses'

export const StatesComponent = props => {
  const { t } = useTranslation()
  const classes = statesComponentStyles()
  const { data, updateData } = props
  const [addDisabled, setAddDisabled] = useState(false)

  const handleChange = (value, field, index) => {
    const newItem = { ...data[index] }
    newItem[field] = value
    data[index] = newItem
    updateData([...data])
    setAddDisabled(validateEmptyStates(data))
  }

  const handleAddStateRegistered = () => {
    const newItem = { state: '', license: '' }
    data.push(newItem)
    updateData([...data])
    setAddDisabled(true)
  }

  const handleRemoveStateRegistered = index => {
    data.splice(index, 1)
    updateData([...data])
    setAddDisabled(validateEmptyStates(data))
  }

  function validateEmptyStates (data) {
    const emptyState = data.some(function (val) {
      return val.state === ''
    })
    return emptyState
  }
  return (
    <Box>
      {data?.map((item, index) => (
        <Box display="flex" flexDirection="row" key={index}>
          <Box flex={1} className={classes.leftComponent}>
            <GlobalSelect
              options={props.states}
              onChange={handleChange}
              label={t('company_profile.labels.state')}
              field="state"
              index={index}
              placeholder={t('company_profile.placeholder.select_required')}
              classes={{ icon: classes.iconMargin }}
              value={item?.state}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: '215px'
                  }
                }
              }}
              required={props.required}
            />
          </Box>
          <Box flex={1} className={classes.rightComponent}>
            <GlobalInputButtons
              onChange={handleChange}
              field="license"
              index={index}
              placeholder={t('company_profile.placeholder.contractor_licence')}
              value={item?.license}
              label={t('company_profile.labels.contractor_licence')}
              handlebuttonadd={handleAddStateRegistered}
              handlebuttonremove={handleRemoveStateRegistered}
              buttonenabled={addDisabled}
            />
          </Box>
        </Box>
      ))}
    </Box>
  )
}
