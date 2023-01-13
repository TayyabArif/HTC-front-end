import { React, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// mui components
import { Box } from '@mui/material'
import { cloneDeep } from 'lodash'

import GlobalInput from '../form/TextInput'
import GlobalSelect from '../form/Select'
import GlobalChip from '../form/Chip'
import GlobalPaginatingList from '../form/PaginatingList'
import { areaServiceFilterStyles } from '../../styles/classes/CompanySettingsClasses'

const filters = ['city', 'zip', 'county']

export const AreaServiceFilterComponent = props => {
  const classes = areaServiceFilterStyles()
  const { t } = useTranslation()
  const { currentSelection } = props
  const [filterSelected, setFilterSelected] = useState(new Set())
  const [serviceArea, setServiceArea] = useState({})
  const [citiesList, setCitiesList] = useState([])
  const [citiesValues, setCitiesValues] = useState([])
  const [countyValues, setCountyValues] = useState([])
  const [zipValues, setZipValues] = useState([])

  const [countiesList, setCountiesList] = useState([])
  const [zipCodesList, setZipCodesList] = useState([])

  useEffect(() => {
    loadAreaSelected()
  }, [])

  const loadAreaSelected = async () => {
    if (currentSelection) {
      setServiceArea(currentSelection)
      parseSelections(currentSelection.zip)
    }
  }

  const parseOptionsSelector = (list = [], key) => {
    const selectOptions = []
    const selectedValues = []
    if (list.length) {
      for (const item of list) {
        selectOptions.push({
          value: item[key],
          label: item[key],
          zip: item.zip
        })
        if (item.selected) selectedValues.push(item[key])
      }
    }
    return { selectOptions, selectedValues }
  }

  const splitZipCodeList = zipCodeList => {
    if (!zipCodeList?.length) return []
    const newSplitList = []
    const groupingObject = {}
    for (const item of zipCodeList) {
      const groupName = item.zip.substring(0, 3)
      if (!groupingObject[groupName]) groupingObject[groupName] = []
      groupingObject[groupName].push(item)
    }
    for (const groupKey of Object.keys(groupingObject)) {
      newSplitList.push(groupingObject[groupKey])
    }
    return newSplitList
  }

  const parseSelections = zipArray => {
    if (!zipArray?.length) return
    const sortedArray = zipArray.sort((a, b) => (a.zip < b.zip ? -1 : 1))
    const cities = sortedArray.filter(
      (v, i, a) => a.findIndex(t => t.city === v.city) === i
    )
    const counties = sortedArray.filter(
      (v, i, a) =>
        a.findIndex(t => t.county === v.county && t.county !== '') === i
    )
    const allCitiesOp = parseOptionsSelector(cities, 'city')
    setCitiesList(
      allCitiesOp.selectOptions.sort((a, b) => (a.label < b.label ? -1 : 1))
    ) // Set in state all options values per city
    setCitiesValues(allCitiesOp.selectedValues) // Set in state all pre-selected values per city

    const allZipCodes = parseOptionsSelector(sortedArray, 'zip')
    const splitList = splitZipCodeList(allZipCodes.selectOptions)
    setZipCodesList(splitList)
    setZipValues(allZipCodes.selectedValues)

    const allCountyOp = parseOptionsSelector(counties, 'county')

    // find selected counties
    const selectedCounty = [
      ...new Set(
        zipArray
          .map(zip => zip.selected && zip.county)
          .filter(county => county)
      )
    ]
    // update filter selection
    allCountyOp.selectedValues = selectedCounty
    setCountiesList(
      allCountyOp.selectOptions.sort((a, b) => (a.label < b.label ? -1 : 1))
    ) // Set in state all options values per county
    setCountyValues(allCountyOp.selectedValues) // Set in state all pre-selected values per county
  }

  const setFilterTypeOption = selection => {
    if (props.disabled) return
    const currentFilter = cloneDeep(filterSelected)
    const iterator = currentFilter[Symbol.iterator]()
    // Get current Value in set
    const currentItem = iterator.next().value
    if (currentItem && selection.has(currentItem)) {
      selection.delete(currentItem)
    }
    setFilterSelected(selection)
  }

  // Return one single item that was removed or added in the multiselect component
  const getChangedSelectItem = (oldList, newList) => {
    const removedItem = oldList.filter(item => !newList.includes(item))
    return removedItem ? removedItem[0] : ''
  }

  // Updates the current service city/area state to save the select zip code status
  const markZipAsUnselected = (key, value, removedStatus) => {
    const currentServiceArea = cloneDeep(serviceArea)
    const allZipList = cloneDeep(currentServiceArea.zip)
    const newZipSelection = allZipList.map(item => {
      if (item[key] === value) item.selected = removedStatus
      return item
    })

    let newUnselectedList = []
    if (!currentServiceArea.unselected) currentServiceArea.unselected = {}

    switch (key) {
      case 'city':
        currentServiceArea.unselected.cities
          ? (newUnselectedList = cloneDeep(
              currentServiceArea.unselected.cities
            ))
          : (newUnselectedList = [])
        if (!newUnselectedList.includes(value)) {
          newUnselectedList.push(value)
        } else {
          newUnselectedList = newUnselectedList.filter(city => city !== value)
        }
        currentServiceArea.unselected.cities = newUnselectedList
        break

      case 'zip':
        currentServiceArea.unselected.zip
          ? (newUnselectedList = cloneDeep(currentServiceArea.unselected.zip))
          : (newUnselectedList = [])
        if (!newUnselectedList.includes(value)) {
          newUnselectedList.push(value)
        } else {
          newUnselectedList = newUnselectedList.filter(zip => zip !== value)
        }
        currentServiceArea.unselected.zip = newUnselectedList
        break

      case 'county':
        currentServiceArea.unselected.county
          ? (newUnselectedList = cloneDeep(
              currentServiceArea.unselected.county
            ))
          : (newUnselectedList = [])
        if (!newUnselectedList.includes(value)) {
          newUnselectedList.push(value)
        } else {
          newUnselectedList = newUnselectedList.filter(
            county => county !== value
          )
        }
        currentServiceArea.unselected.county = newUnselectedList
        break

      default:
        break
    }

    currentServiceArea.zip = newZipSelection

    let unselectedCityList = []
    let unselectedZipList = []
    // update unselected list for zip and cities
    unselectedCityList = newZipSelection
      .filter(zip => !zip.selected)
      .map(zip => zip.city)
    unselectedZipList = newZipSelection
      .filter(zip => !zip.selected)
      .map(zip => zip.zip)
    currentServiceArea.unselected.cities = unselectedCityList
    currentServiceArea.unselected.zip = unselectedZipList

    // get list of unique selected and unselected counties
    const selectedCounty = [
      ...new Set(
        newZipSelection
          .map(zip => zip.selected && zip.county)
          .filter(county => county)
      )
    ]
    const unselectedCounty = [
      ...new Set(
        newZipSelection
          .map(zip => !zip.selected && zip.county)
          .filter(county => county)
      )
    ]
    // evaluate and update unselected list for counties
    let unselectedCountyList = []
    unselectedCountyList = unselectedCounty.filter(
      county => selectedCounty.indexOf(county) === -1
    )
    currentServiceArea.unselected.county = unselectedCountyList

    setServiceArea(currentServiceArea)

    props.onUpdateServiceArea(currentServiceArea)

    // filter update selections
    parseSelections(currentServiceArea.zip)
    // update map
    props.updateMapView(currentServiceArea, false)
  }

  const changeCitySelection = newList => {
    if (citiesValues.length > newList.length) {
      // Unselect an item
      const valueToRemove = getChangedSelectItem(citiesValues, newList)
      markZipAsUnselected('city', valueToRemove, false)
    } else {
      // Select new item
      const valueToAdd = getChangedSelectItem(newList, citiesValues)
      markZipAsUnselected('city', valueToAdd, true)
    }

    setCitiesValues(newList)
  }

  const changeCountySelection = newList => {
    if (countyValues.length > newList.length) {
      // Unselect an item
      const valueToRemove = getChangedSelectItem(countyValues, newList)
      markZipAsUnselected('county', valueToRemove, false)
    } else {
      // Select new item
      const valueToAdd = getChangedSelectItem(newList, countyValues)
      markZipAsUnselected('county', valueToAdd, true)
    }

    setCountyValues(newList)
  }

  const changeZipSelection = newList => {
    if (zipValues.length > newList.length) {
      if (newList.length === 0) {
        // prevent last item deselect
        newList = zipValues
      } else {
        // Unselect an item
        if (zipValues.length > 1) {
          const valueToRemove = getChangedSelectItem(zipValues, newList)
          markZipAsUnselected('zip', valueToRemove, false)
        }
      }
    } else {
      // Select new item
      const valueToAdd = getChangedSelectItem(newList, zipValues)
      markZipAsUnselected('zip', valueToAdd, true)
    }

    setZipValues(newList)
  }

  const getZipGroupLabel = groupList => {
    const firstItem = groupList[0]
    if (!firstItem?.zip) return '....'
    return `${firstItem?.zip.substring(0, 3)}...`
  }

  const filterFields = text => {
    let filteredData = null

    switch (true) {
      case filterSelected.has('zip'):
        filteredData = serviceArea.zip.filter(data => data.zip.includes(text))
        if (filteredData.length === 0) setZipCodesList([])
        parseSelections(filteredData)
        break
      case filterSelected.has('city'):
        filteredData = serviceArea.zip.filter(data =>
          data.city.toLowerCase().includes(text.toLowerCase())
        )
        if (filteredData.length === 0) setCitiesList([])
        parseSelections(filteredData)
        break
      case filterSelected.has('county'):
        filteredData = serviceArea.zip.filter(data =>
          data.county.toLowerCase().includes(text.toLowerCase())
        )
        if (filteredData.length === 0) setCountiesList([])
        parseSelections(filteredData)
        break
    }
  }

  return (
    <div>
      <Box display="flex" className={classes.noTopPadding}>
        <GlobalChip
          chips={filters}
          selected={filterSelected}
          setSelected={setFilterTypeOption}
          searchVisible={false}
          parent="area"
          removeItem={() => {}}
        />
      </Box>

      <Box className={[classes.noTopPadding, classes.topPadding]}>
        <GlobalInput
          onChange={filterFields}
          field="search"
          placeholder={t('company_profile.placeholder.search')}
          disabled={props.disabled}
        />
      </Box>

      <Box className={classes.noTopPadding}>
        {filterSelected.has('city') && (
          <GlobalPaginatingList
            options={citiesList}
            onChange={changeCitySelection}
            field="state"
            value={citiesValues ?? []}
            multiple={true}
          />
        )}

        {filterSelected.has('county') && (
          <GlobalPaginatingList
            options={countiesList}
            onChange={changeCountySelection}
            field="county"
            value={countyValues ?? []}
            multiple={true}
          />
        )}

        {filterSelected.has('zip') && (
          <Box className={[classes.multiselectContent, classes.multiselectZip]}>
            {zipCodesList?.length > 0
              ? (
                  zipCodesList.map((subList, index) => (
                <GlobalSelect
                  key={index}
                  options={subList}
                  onChange={changeZipSelection}
                  label={''}
                  field="zip"
                  placeholder={`${t('company_profile.placeholder.select_zip')}`}
                  uniqValue={getZipGroupLabel(subList)}
                  value={zipValues ?? []}
                  multiple={true}
                />
                  ))
                )
              : (
              <GlobalInput value="No results" disabled />
                )}
          </Box>
        )}
      </Box>
    </div>
  )
}

export default AreaServiceFilterComponent
